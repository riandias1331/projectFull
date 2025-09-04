import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Main from './pages/Main.jsx' 
import Login from './components/login.jsx'
import Register from './components/register.jsx'

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //   <Route index element={<Home />} />
    //     <Route path="main" element={<Main />} /> {/* Adicione esta rota */}
    //     <Route path="login" element={<Login />} />
    //     <Route path="register" element={<Register />} />
    //   </Route>
    // </Routes>

<Routes>
  <Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
    <Route path="main" element={<Main />} /> {/* Adicione esta rota */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
</Routes>
  )
}

export default App