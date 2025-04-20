import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const defaultHeaders = {
	accept: 'application/json',
	Authorization: `Bearer ${API_KEY}`,
}

export async function fetchPopularity(query = '') {
	const endpoint = query
		? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${BASE_URL}/discover/movie?sort_by=popularity.desc`
	const response = await axios.get(endpoint, { headers: defaultHeaders })
	return response.data.results
}


export async function fetchTrendingMovies() {
	const endpoint = `${BASE_URL}/trending/movie/week`
	const response = await axios.get(endpoint, {headers: defaultHeaders})
	return response.data.results
}

export async function fetchDetailsMovie(id) {
	const endpoint = `${BASE_URL}/movie/${id}`
	const response = await axios.get(endpoint, {headers: defaultHeaders})
	return response.data
}

export async function fetchCreditsMovie(id) {
	const endpoint = `${BASE_URL}/movie/${id}/credits`
	const response = await axios.get(endpoint, { headers: defaultHeaders })
	return response.data
}