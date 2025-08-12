Projeto ReactJS com Vite: Páginas Home e Login (Pronto para Backend)
Vou guiá-lo passo a passo na criação de um projeto React com Vite que inclui páginas Home e Login, já preparado para conexão com backend.

Passo 1: Criar o projeto
bash
npm create vite@latest react-auth-app -- --template react
cd react-auth-app
npm install
Passo 2: Instalar dependências adicionais
bash
npm install react-router-dom axios
Passo 3: Estrutura do projeto
Vamos criar a seguinte estrutura:

text
src/
├── api/
│   └── auth.js
├── components/
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Layout.jsx
├── App.jsx
├── main.jsx
└── index.css
Passo 4: Implementar o código
1. main.jsx
jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
2. App.jsx
jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
3. pages/Layout.jsx
jsx
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  )
}
4. pages/Home.jsx
jsx
export default function Home() {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Esta é a página principal do seu aplicativo.</p>
    </div>
  )
}
5. pages/Login.jsx
jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await loginUser(formData)
      console.log('Login successful:', response)
      // Armazene o token JWT ou dados do usuário conforme necessário
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Falha no login')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
6. api/auth.js
js
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
7. index.css (estilos básicos)
css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
}

.layout {
  max-width: 1200px;
  margin: 0 auto;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a:hover {
  color: #007bff;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
Passo 5: Configurar para desenvolvimento
Adicione um proxy no vite.config.js para evitar problemas de CORS durante o desenvolvimento:

js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Seu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
Passo 6: Rodar o projeto
bash
npm run dev
Como conectar ao backend
Configure a URL da API: No arquivo api/auth.js, altere a constante API_URL para apontar para o endpoint do seu backend.

Endpoints esperados:

POST /api/auth/login - Para login

POST /api/auth/register - Para registro (se quiser adicionar)

Dados esperados:

Login: { email: string, password: string }

Registro: { name: string, email: string, password: string }

Resposta esperada:

Sucesso: { success: true, token: string, user: object }

Erro: { success: false, message: string }

Extras para implementar
Armazenamento do token: Após o login bem-sucedido, armazene o token JWT no localStorage ou em cookies.

Proteção de rotas: Crie um componente ProtectedRoute para páginas que requerem autenticação.

Contexto de autenticação: Use o React Context para gerenciar o estado de autenticação globalmente.

Formulário de registro: Similar ao de login, mas com campo adicional para "name".

Este projeto está pronto para ser conectado ao seu backend. Basta configurar a URL da API e implementar os endpoints correspondentes no servidor.