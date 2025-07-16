import { useEffect, useRef, useState } from "react"
import { FaLinkedin, FaGithub, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import decryptData from '../encryptData/decryptData'
import encryptedJson from '../json/data.json'
import ParticleBackground from '../components/waterBobleBg'

export default function Home() {
    const [isValidUser, setIsValidUser] = useState(false)
    const bubble = useRef(null)
    const navigate = useNavigate()
    const [isMuted, setIsMuted] = useState(true)

    useEffect(() => {
        bubble.current = new Audio('./waterBubbles.mp3')
        bubble.current.volume = 0.9
        bubble.current.loop = true
        bubble.current.load()
        onLoadSecurityCheck()

        return () => {
            if (bubble.current) {
                bubble.current.pause();
                bubble.current = null;
            }
        }
    }, []);

    const toggleMute = () => {
        if (!bubble.current) return;

        if (isMuted) {
            bubble.current.play();
            setIsMuted(false);
        } else {
            bubble.current.pause();
            setIsMuted(true);
        }

    }

    function onLoadSecurityCheck() {
        try {
            const value = sessionStorage.getItem('keyPass');
            const encryptValue = encryptedJson.data

            const decript = decryptData({ data: encryptValue, passphrase: value })

            if (decript.pass == value) {
                setIsValidUser(true);
            }
        } catch (err) {
            setIsValidUser(false);
        }
    }

    return (
        <>
            {isValidUser ? (
                <div>
                    <ParticleBackground />
                    <div className="text-white">
                        {/* Top navigation */}
                        <div className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4 bg-black/30 backdrop-blur-md text-white font-semibold tracking-wide md:rounded-lg md:pt-10">
                            {/* Right side */}
                            <div className="flex gap-8">
                                <p className="text-xl md:text-2xl font-bold text-blue-400 cursor-pointer hover:text-purple-300 transition" onClick={() => { navigate('/home') }}>Priyashantha</p>
                                <p className="hover:text-purple-300 transition cursor-pointer pt-1 hidden md:block">Languages</p>
                                <p className="hover:text-purple-300 transition cursor-pointer pt-1 hidden md:block">Projects</p>
                                <p className="hover:text-purple-300 transition cursor-pointer pt-1 hidden md:block">Contact</p>
                            </div>

                            {/* Left side */}
                            <div className="flex gap-6 text-2xl">
                                <a href="https://www.linkedin.com/in/priyashantha-fernando-b325122b7/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 pt-2 transition">
                                    <FaLinkedin />
                                </a>
                                <a href="https://github.com/DisasterUnknown" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 pt-2 transition">
                                    <FaGithub />
                                </a>
                                <a onClick={toggleMute} className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-purple-500/20 transition" title={isMuted ? "Unmute Sound" : "Mute Sound"}>
                                    {isMuted ? (
                                        <FaVolumeMute />
                                    ) : (
                                        <FaVolumeUp />
                                    )}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
                    <p className="text-lg">You are not authorized to view this page.</p>
                </div>
            )
            }
        </>
    )
}