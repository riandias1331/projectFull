import axios from 'axios'

const API_URL = 'http://localhost:5000/api' // Altere para a URL do seu backend

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials)
    return response.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    throw error
  }
}