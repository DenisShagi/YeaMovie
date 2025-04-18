import { useEffect, useState } from 'react'
import { fetchPopularity } from './api/fetchMovies'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

function App() {
	const [searchTerm, setSearchTerm] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

	useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
	useEffect(() => {
		const load = async () => {
			setIsLoading(true)
			setErrorMessage('')

			try {
				const results = await fetchPopularity(debouncedSearchTerm)
				setMovies(results)
			} catch (err) {
				console.error(err)
				setErrorMessage('Failed to download movies. Try again.')
			} finally {
				setIsLoading(false)
			}
		}
		load()
	}, [debouncedSearchTerm])

	return (
		<>
			<div className='pattern' />

			<div className='wrapper'>
				<header>
					<img src='./hero.png' alt='Hero Banner' />
					<h1>
						Find <span className='text-gradient'>Movies</span> You'll Enjoy
						Without YeaMovie
					</h1>
					<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</header>

				<section className='all-movies'>
					<h2 className='mt-[40px]'>All Movies</h2>
					{isLoading ? (
						<Spinner />
					) : errorMessage ? (
						<p className='text-red-500'>{errorMessage}</p>
					) : (
						<ul>
							{movies.map(movie => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</ul>
					)}
				</section>
			</div>
		</>
	)
}

export default App
