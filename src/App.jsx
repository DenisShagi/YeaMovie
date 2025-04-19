import { useEffect, useState } from 'react'
import { fetchPopularity, fetchTrendingMovies } from './api/fetchMovies'
import { useDebounce } from 'react-use'

import Header from './components/Header'
import MovieList from './components/MovieList'
import TrendingMovies from './components/TrendingMovies'

function App() {
	const [searchTerm, setSearchTerm] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [movies, setMovies] = useState([])
	const [trendingMovies, setTrendingMovies] = useState([])

	const [loading, setLoading] = useState({ search: false, trending: false })

	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

	useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

	useEffect(() => {
		const load = async () => {
			setLoading(prev => ({ ...prev, search: true }))
			setErrorMessage('')

			try {
				const results = await fetchPopularity(debouncedSearchTerm)
				setMovies(results)
			} catch (err) {
				console.error(err)
				setErrorMessage('Failed to download movies. Try again.')
			} finally {
				setLoading(prev => ({ ...prev, search: false }))
			}
		}
		load()
	}, [debouncedSearchTerm])

	useEffect(() => {
		const load = async () => {
			setLoading(prev => ({ ...prev, trending: true }))
			try {
				const results = await fetchTrendingMovies()
				setTrendingMovies(results)
			} catch (error) {
				console.error(`Error fetching trending movies: ${error}`)
			} finally {
				setLoading(prev => ({ ...prev, trending: true }))
			}
		}
		load()
	}, [])

	return (
		<>
			<div className='pattern' />

			<div className='wrapper'>
				<Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				<MovieList
					movies={movies}
					errorMessage={errorMessage}
					loading={loading}
				/>

				{trendingMovies.length > 0 && loading.trending && (
					<TrendingMovies trendingMovies={trendingMovies} />
				)}
			</div>
		</>
	)
}

export default App
