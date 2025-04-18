import { useEffect, useState } from 'react'
import { fetchPopularity } from './api/fetchMovies'
import Search from './components/Search'
import Spinner from './components/Spinner'

function App() {
	const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
     
	useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const results = await fetchPopularity()
        setMovies(results)
      }
      catch(  err){
        console.error(err)
        setErrorMessage('Failed to download movies. Try again.')
      }
      finally{
        setIsLoading(false)
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
          <h2>All Movies</h2>
          {isLoading ? <Spinner /> : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
            <ul>
              {movies.map((movie) => (
                <p className='text-white' key={movie.id}>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
			</div>
		</>
	)
}

export default App
