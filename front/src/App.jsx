import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Main from './pages/Main.jsx' 
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* 🔒 ROTA PROTEGIDA - Só acessa com token */}
        <Route path="main" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        } />
        
        {/* Rotas públicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App



// import { Routes, Route } from 'react-router-dom'
// import Layout from './pages/Layout.jsx'
// import Home from './pages/Home.jsx'
// import Main from './pages/Main.jsx' 
// import Login from './components/login.jsx'
// import Register from './components/register.jsx'
// import ProtectedRoute from './components/ProtectedRoute.jsx'


// function App() {
//   return (
//     // <Routes>
//     //   <Route path="/" element={<Layout />}>
//     //   <Route index element={<Home />} />
//     //     <Route path="main" element={<Main />} /> {/* Adicione esta rota */}
//     //     <Route path="login" element={<Login />} />
//     //     <Route path="register" element={<Register />} />
//     //   </Route>
//     // </Routes>

// <Routes>
//   <Route path="/" element={<Layout />}>
//   <Route index element={<Home />} />
//     <Route path="main" element={<Main />} /> {/* Adicione esta rota */}
//     <Route path="login" element={<Login />} />
//     <Route path="register" element={<Register />} />
//   </Route>
  
// </Routes>



//   )
// }

// export default App