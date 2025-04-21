import { useRef, useState } from 'react'
import CastCard from './CastCard'

const CastList = ({ credits }) => {
	const listRef = useRef(null)
	const [hovered, setHovered] = useState(false)

	const scroll = direction => {
		if (listRef.current) {
			const firstItem = listRef.current.querySelector('li')
			if (firstItem) {
				const style = window.getComputedStyle(firstItem)
				const marginRight = parseFloat(style.marginRight) || 0
				const scrollAmount = firstItem.clientWidth + marginRight
				listRef.current.scrollBy({
					left: direction === 'left' ? -scrollAmount : scrollAmount,
					behavior: 'smooth',
				})
			}
		}
	}
	return (
		<section
			className='actors relative'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{hovered && (
				<>
					<button onClick={() => scroll('left')} className='absolute left-0 '>
						‹
					</button>
					<button onClick={() => scroll('right')} className='absolute right-0 '>
						›
					</button>
				</>
			)}
			<ul
				ref={listRef}
				className='flex space-x-5 overflow-x-auto hide-scrollbar py-4 px-8'
			>
				{credits.map(actor => (
					<CastCard actor={actor} key={actor.id} />
				))}
			</ul>
		</section>
	)
}

export default CastList