import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Admin, Analyticst, Dashboard, Home, Landing } from "./pages"
import { useState } from "react"
import { ProtectedRoute } from "./components/ProtectedRoutes"

const App = () => {

  const [ user, setUser ] = useState(null)

  const login = () => {
    // ? Request done

    setUser({
      id: 1,
      name: "Alex",
      permissions: [ 'analize' ],
      roles: [ 'admin' ]
    })

  }

  const logout = () => {
    //? Request done

    setUser(null)
  }

  return (
    <BrowserRouter>

      <Navigation />

      {
        user? (
          <button onClick={logout} >Logout</button>
        ) : (
          <button onClick={login} >Login</button>
        )
      }

      <Routes>

        <Route index element={<Landing />} />

        <Route path="/landing" element={<Landing />} />
        
        <Route element={<ProtectedRoute isAllowed={!!user} />}>

          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />
        
        </Route>

        <Route path="/analytics" element={
          <ProtectedRoute isAllowed={!!user && user.permissions.includes('analize')} redirecTo="/home" >
            <Analyticst />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute isAllowed={!!user && user.roles.includes('admin')} redirecTo="/home" >
            <Admin />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

function Navigation () {
  return (
    <nav>
      <ul>
        <li><Link to="/">Landing</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  )
}

export default App