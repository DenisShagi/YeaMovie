import { useLocation, Link } from 'react-router-dom'

export default function ErrorPage() {
	const {pathname} = useLocation()
	return (
		<div id='error-page' className='p-8 text-center'>
			<h1 className='text-4xl font-bold mb-4'>404 — Страница не найдена</h1>
			<p className='text-red-500'>
				Путь <code>{pathname}</code> не существует.
			</p>
			<Link to='/' className='text-blue-500 hover:underline mt-4 block'>
				Вернуться на главную
			</Link>
		</div>
	)
}
