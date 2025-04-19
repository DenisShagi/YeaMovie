const TrendingMovies = ({ trendingMovies }) => {
	return (
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
	)
}

export default TrendingMovies
