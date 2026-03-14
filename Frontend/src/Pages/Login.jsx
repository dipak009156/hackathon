import Api from '../utils/Api'
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authslice'
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = {
    email,
    password,
    role
  }
  const sumbitHandler = async (e) => {
    e.preventDefault()

    try {
      console.log('heeloo')
      const response = await Api.post('/login', data)
      dispatch(
        login({
          user: response.data.user,
          role: response.data.user.role
        })
      )

      const userRole = response.data.user.role

      if (userRole === 'admin') {
        navigate('/admin')
      } else if (userRole === 'worker') {
        navigate('/worker')
      } else if (userRole === 'supervisor') {
        navigate('/supervisor')
      } 


    } catch (err) {
      console.log(err.response?.data || err.message);
      navigate('/')

    }
  }


  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top Bar */}
      <div className="bg-[#0b4f6c] text-white text-sm flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      {/* Header */}
      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="w-14" />

          <div>
            <h2 className="text-lg font-semibold">
              Solapur Municipal Corporation
            </h2>
            <p className="text-sm">
              Sanitation Worker Safety & Monitoring Portal
            </p>
            <p className="text-xs opacity-80">
              Government of Maharashtra
            </p>
          </div>
        </div>

      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center mt-20">

        <form onSubmit={sumbitHandler} className="bg-white p-10 rounded shadow w-[400px]">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#0b4f6c]">
            User Login
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">
              Role
            </label>

            <select
              className="w-full border px-3 py-2 rounded"
              value={role}
              onChange={(e) => { setRole(e.target.value) }}
            >
              <option value="">Select Role</option>
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#0b4f6c] text-white py-2 rounded hover:bg-[#08384e]">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;