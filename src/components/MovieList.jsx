import MovieCard from './MovieCard'
import Spinner from './Spinner'

const MovieList = ({ movies, errorMessage, loading }) => {
	return (
		<section className='all-movies'>
			{loading.search ? (
				<Spinner />
			) : errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : movies.length > 0 ? (
				<>
					<h2 className='text-center mt-[40px]'>All Movies</h2>
					<ul>
						{movies.map(movie => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</ul>
				</>
			) : null}
		</section>
	)
}

export default MovieList
