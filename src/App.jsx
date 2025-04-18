import { useEffect, useState } from 'react'
import { fetchPopularity, fetchTrendingMovies } from './api/fetchMovies'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

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
				<header>
					<img src='./hero.png' alt='Hero Banner' />
					<h1>
						Find <span className='text-gradient'>Movies</span> You'll Enjoy
						Without YeaMovie
					</h1>
					<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</header>

				<section className='all-movies'>
					<h2 className='text-center mt-[40px]'>All Movies</h2>
					{loading.search ? (
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

				{trendingMovies.length > 0 && loading.trending && (
					<section className='trending'>
						<h2 className='text-center'>Trending Movies</h2>

						<ul>
							{trendingMovies.map((movie, idx) => (
								<li key={idx}>
									<p>{idx + 1}</p>
									<img
										src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										alt={movie.title}
										className='transition duration-300 hover:scale-110 cursor-pointer'
									/>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</>
	)
}

export default App
