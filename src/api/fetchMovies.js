import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const defaultHeaders = {
	accept: 'application/json',
	Authorization: `Bearer ${API_KEY}`,
}

export async function fetchPopularity() {
	const endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`
	const response = await axios.get(endpoint, defaultHeaders)
	return response.data.results
}