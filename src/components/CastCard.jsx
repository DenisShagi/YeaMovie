import React from 'react'

const CastCard = ({ actor }) => {
	return (
		<li>
			<img
				src={
					actor.profile_path
						? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
						: '/no-backdrop.png'
				}
				alt={actor.name}
			/>
			<span className='text-white'>{actor.name}</span>
			<span className='text-gray-400'>{actor.character}</span>
		</li>
	)
}

export default CastCard
