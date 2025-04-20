import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import MovieDetails from './pages/MovieDetails'
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/movies/:id' element={<MovieDetails />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
