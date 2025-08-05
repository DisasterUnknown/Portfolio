import { FaLinkedin, FaGithub, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function TopNav() {
    const navigate = useNavigate()
    const [isMuted, setIsMuted] = useState(true)
    const bubble = useRef(null)

    useEffect(() => {
        bubble.current = new Audio('./waterBubbles.mp3')
        bubble.current.volume = 0.9
        bubble.current.loop = true
        bubble.current.load()

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

    return (
        <>
            <div className="fixed left-1/2 transform -translate-x-1/2 flex w-[100%] xl:w-[85%] justify-between items-center px-4 py-2 md:px-20 md:py-4 bg-black/30 backdrop-blur-md text-white font-semibold tracking-wide md:rounded-lg md:pt-10 z-50">
                {/* Right side */}
                <div className="flex gap-8">
                    <p className="text-xl md:text-2xl font-bold text-blue-400 cursor-pointer hover:text-purple-300 transition" onClick={() => { navigate('/home') }}>Portfolio</p>
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
        </>
    )
}