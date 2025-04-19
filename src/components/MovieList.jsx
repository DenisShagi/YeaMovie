import MovieCard from './MovieCard'
import Spinner from './Spinner'

const MovieList = ({ movies, errorMessage, loading }) => {
	return (
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
	)
}

export default MovieList
