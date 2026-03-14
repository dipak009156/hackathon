import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Protected";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from './store/slices/authslice'
import Api from './utils/Api'
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Admin from './Pages/Admin'
import Worker from './Pages/Worker'
import Supervisor from "./Pages/Supervisor";

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await Api.get('/check-token')
        dispatch(
          login({
            user: response.data.user,
            role: response.data.user.role
          })
        )
      } catch {
        console.log('not logged in.')
      } finally {
        setLoading(false)
      }
    }
    

    checkAuth()
  }, [])

  if(loading){
    return <div>Loading....</div>
  }

  return (

    <Routes>

      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/supervisor"
        element={
          <ProtectedRoute>
            <Supervisor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/worker"
        element={
          <ProtectedRoute>
            <Worker />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}

export default App;