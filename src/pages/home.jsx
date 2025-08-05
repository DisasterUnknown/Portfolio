import { useEffect, useRef, useState } from "react"
import decryptData from '../encryptData/decryptData'
import encryptedJson from '../json/data.json'
import ParticleBackground from '../components/waterBobleBg'
import TopNav from '../components/topNav'
import SizeBox from '../components/sizeBox'
import ProjectBox from '../components/projectBox'

export default function Home() {
    const [isValidUser, setIsValidUser] = useState(false)

    useEffect(() => {
        onLoadSecurityCheck()
    }, []);

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
                    <TopNav />

                    <div className="pt-[72px] flex">
                        {/* Left Side */}
                        <div className="text-left xl:pt-10 flex-1 no-scrollbar px-6 py-4 space-y-6">
                            <SizeBox />
                            <p className="text-[#ff1576] text-xl font-bold font-mono mb-0">Best Deploys and Builds</p>

                            <ProjectBox
                                title="Personal Portfolio Featuring Hobbies"
                                description="This interactive web profile blends personal interests,
                                    gaming passions, and multimedia links in a sleek, engaging interface. Built with modern web
                                    technologies and hosted on GitHub Pages, it showcases how to create a personalized, functional
                                    online presence with intuitive navigation and vibrant styling. 🚀"
                            />
                            <ProjectBox
                                title="CC-Travolute"
                                description="A client-side application for the Travolute platform, providing an intuitive interface for exploring trips, making bookings, and managing travel experiences. Likely built with modern web or mobile frameworks to ensure a seamless, responsive user journey. 🌍"
                            />

                            <ProjectBox
                                title="CC-Traveloute-Server"
                                description="The backend API powering the Travolute ecosystem. Handles user authentication, booking logic, data storage, and communication between the client app and the database, ensuring secure and efficient travel management. ⚙️"
                            />

                            <ProjectBox
                                title="Traveloute-APK"
                                description="The packaged Android build of the Travolute mobile application, enabling users to access the platform on their devices with native-like performance and offline capabilities. 📱"
                            />

                            <ProjectBox
                                title="BlueArt-Laravel"
                                description="A Laravel-based art and e-commerce platform, designed to showcase and sell creative works online. Combines robust PHP backend functionality with elegant Blade templates for a visually appealing shopping experience. 🎨"
                            />

                            <ProjectBox
                                title="Portfolio"
                                description="A personal portfolio website highlighting skills, projects, and achievements. Built to demonstrate strong design principles, responsive layouts, and professional branding for career growth. 💼"
                            />

                            <ProjectBox
                                title="Grocies.github.io"
                                description="A GitHub Pages web app for managing groceries and shopping lists. Offers simple yet functional list management with interactive features for everyday convenience. 🛒"
                            />

                            <ProjectBox
                                title="Flutter-BlueArt"
                                description="A Flutter mobile application bringing the BlueArt platform to Android and iOS devices, offering a consistent experience across web and mobile environments with a shared design language. 📲"
                            />

                            <ProjectBox
                                title="Pi-Accuracy-Clock.github.io"
                                description="A web interface showcasing an ultra-precise clock implementation, possibly leveraging Raspberry Pi for accuracy tests, data display, and time synchronization experiments. ⏱️"
                            />

                            <ProjectBox
                                title="Tree-to-JSON-Parser"
                                description="A utility tool for converting hierarchical tree-structured data into JSON format, enabling developers to streamline data processing, storage, and transmission. 🌳"
                            />

                            <ProjectBox
                                title="SHA-256_Explained"
                                description="An educational repository breaking down the SHA-256 hashing algorithm with clear explanations and code demonstrations, bridging cryptography theory with practical programming. 🔐"
                            />

                            <ProjectBox
                                title="Web-Profile.github.io"
                                description="An interactive personal web profile hosted on GitHub Pages, integrating multimedia, hobbies, and dynamic elements for a vibrant online identity. 🌐"
                            />

                            <ProjectBox
                                title="Wolf-Mania.github.io"
                                description="A browser-based game themed around wolves, likely featuring engaging gameplay and pixel art, delivered entirely via GitHub Pages for easy access. 🐺"
                            />

                            <ProjectBox
                                title="Godot-2D-Game"
                                description="A 2D game project built in Godot, showcasing original gameplay mechanics, art, and scripting using GDScript within the powerful open-source engine. 🎮"
                            />

                            <ProjectBox
                                title="Ant-Colony-GoDot"
                                description="A Godot simulation/game based on ant colony behavior, using AI and pathfinding to replicate natural swarm intelligence and emergent gameplay. 🐜"
                            />

                            <ProjectBox
                                title="Event-Management-System"
                                description="A complete platform for planning and managing events, including scheduling, attendee registration, and administrative tools, possibly built with a PHP or JS backend. 📅"
                            />

                            <ProjectBox
                                title="Python-Game"
                                description="A standalone Python game, potentially using Pygame for graphics and interactivity, demonstrating programming fundamentals and creative game design. 🐍"
                            />

                        </div>

                        {/* Right Side */}
                        <div className="w-[35%] hidden md:block sticky top-[72px] max-h-[calc(100vh-72px)] no-scrollbar bg-[#18181c] px-6 py-4 overflow-y-auto">
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
                            <p>Hello</p>
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