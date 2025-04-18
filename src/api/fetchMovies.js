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
