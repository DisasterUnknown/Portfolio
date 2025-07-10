import { useState } from 'react'
import './css/App.css'
import ParticleBackground from './components/particalBg'
import hashPassword from './components/hashing'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [shake, setShake] = useState(false)

  const correctPass = 'b51ae642874f7663f6d8ab867dbea47307b6490f02a2fc4f2401844f9354a7d7'

  const handleSubmit = async () => {
    const hashedInput = await hashPassword({text: password}) 

    if (hashedInput === correctPass) {
      sessionStorage.setItem('keyPass', hashedInput);
      setMessage("✅ Access Granted!!")
    } else {
      setMessage("❌ Access Denied!!")
      setShake(true) // trigger shake

      // Play sound
      const buzz = new Audio('./accessDenied.mp3')
      buzz.volume = 0.6
      buzz.play()

      // Remove shake class after animation ends
      setTimeout(() => {
        setShake(false)
      }, 400) // match animation duration
    }
  }

  return (
    <>
      <ParticleBackground pixleColor={shake ? 'red' : 'white'} disturbed={shake} />

      {/* Centered login card */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div className={`glass p-8 w-[320px] rounded-xl border border-white/20 shadow-lg text-white bg-black bg-opacity-60 transition-transform ${shake ? 'shake' : ''}`}>
          <h1 className="text-3xl font-bold mb-6 text-neonGreen drop-shadow-lg">Login</h1>
          <label className="block mb-2 text-lg" htmlFor="password">Enter Password:</label>
          <div className='flex'>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-black bg-opacity-50 border border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonGreen text-white"
              placeholder="••••••••"
            />
            <button type="button" className='ml-1 border border-white/30' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 bg-neonGreen hover:bg-green-500 rounded-md font-semibold drop-shadow-md transition"
          >
            Submit
          </button>
          {message && <p className='mt-4 text-center'>{message}</p>}
        </div>
      </div>
    </>
  )
}

export default App
