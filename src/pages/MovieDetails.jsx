import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchCreditsMovie, fetchDetailsMovie } from '../api/fetchMovies'
import Spinner from '../components/Spinner'
import CastList from '../components/CastList'

const MovieDetails = () => {
	const [details, setDetails] = useState([])
	const [credits, setCredits] = useState({ cast: [], crew: [] })

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const { id } = useParams()
	let navigate = useNavigate()

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			setError('')
			try {
				const [detailsDate, creditsDate] = await Promise.all([
					fetchDetailsMovie(id),
					fetchCreditsMovie(id),
				])
				setDetails(detailsDate)
				setCredits(creditsDate)
			} catch {
				setError('Something went wrong.')
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [id])

	const director = credits.crew.find(person => person.job === 'Director')
	const backdropUrl = details.backdrop_path
		? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
		: '/no-backdrop.png'
	return (
		<>
			<div
				className='absolute w-full h-[765px] bg-cover bg-center opacity-40'
				style={{ backgroundImage: `url(${backdropUrl})` }}
			/>
			<div className='wrapper'>
				<section>
					<article className='w-full max-w-[605px]'>
						<span className='text-white px-[5px] py-[3px] bg-purple-700 rounded-lg'>
							{details.status}
						</span>

						<h3 className='text-red-500 text-[70px] mt-[40px]'>
							{details.original_title}
						</h3>

						<div className='flex gap-4 items-center'>
							<span className='bg-[#54b480] px-[7px] py-[1px] rounded-lg'>
								{details.vote_average?.toFixed(1) ?? '0'}
							</span>
							<span className='text-gray-400'>
								{details.release_date?.split('-')[0] ?? '-'}
							</span>
							<span className='text-gray-400'>
								{details.genres?.map(g => g.name).join(', ') ?? '-'}
							</span>
						</div>

						<h4 className='text-white my-4'>{details.overview}</h4>

						<div className='flex gap-4 items-center mt-8'>
							<span className='text-gray-400'>Director:</span>
							<span className='text-white'>
								{director ? director.name : '-'}
							</span>
						</div>
						<div className='flex gap-4 items-center mt-2'>
							<span className='text-gray-400'>Actors:</span>
							<span className='text-white'>
								{credits.cast?.length
									? credits.cast
											.slice(0, 4)
											.map(actor => actor.name)
											.join(', ')
									: '-'}
							</span>
						</div>
					</article>
				</section>

				<span className='text-white mt-[450px]'>Actors</span>
				<CastList />
			</div>
			{/* <button className='text-white' onClick={() => navigate(-1)}>
				back
			</button> */}
		</>
	)
}

export default MovieDetails
