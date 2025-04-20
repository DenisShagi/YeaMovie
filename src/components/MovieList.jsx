import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
import Spinner from './Spinner'

const MovieList = ({ movies, errorMessage, loading }) => {
	return (
		<section className='all-movies'>
			{loading.search ? (
				<Spinner />
			) : errorMessage ? (
				<p className='text-red-500 text-center mt-8'>{errorMessage}</p>
			) : movies.length > 0 ? (
				<>
					<h2 className='text-center mt-[40px]'>All Movies</h2>
					<ul>
						{movies.map(movie => (
							<Link to={`/movies/${movie.id}`} key={movie.id}>
							<MovieCard key={movie.id} movie={movie} />
							</Link>
						))}
					</ul>
				</>
			) : null}
		</section>
	)
}

export default MovieList
