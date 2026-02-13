import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Layout() {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div className="layout">
      <nav>
        <ul>
          {/* Mostra links diferentes baseado na autenticação */}
          {!isAuthenticated ? (
            <>
              {/* <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <Link to="/main">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

// import { Link, Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="layout">
//       <nav>
//         <ul>
//           {/* <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/register">Register</Link>
//           </li> */}
//           <li>
//             <Link to="/">Sair</Link>
//           </li>
//         </ul>
//       </nav>

//       <main>
//         <Outlet />
//       </main>
//     </div>
//   )
// }