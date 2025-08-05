import { useEffect, useState } from "react";
import decryptData from '../encryptData/decryptData';
import encryptedJson from '../json/data.json';
import ParticleBackground from '../components/waterBobleBg';
import TopNav from '../components/topNav';

export default function Home() {
    const [isValidUser, setIsValidUser] = useState(false);

    useEffect(() => {
        onLoadSecurityCheck();
    }, []);

    function onLoadSecurityCheck() {
        try {
            const value = sessionStorage.getItem('keyPass');
            const encryptValue = encryptedJson.data;
            const decript = decryptData({ data: encryptValue, passphrase: value });
            if (decript.pass === value) {
                setIsValidUser(true);
            }
        } catch (err) {
            setIsValidUser(false);
        }
    }

    if (!isValidUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white text-center">
                <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
                <p className="text-lg">You are not authorized to view this page.</p>
            </div>
        );
    }

    return (
        <div className="relative text-white bg-[#0f0f11] min-h-screen overflow-hidden">
            <ParticleBackground />

            {/* Fixed Top Nav */}
            <TopNav />

            {/* Main content layout */}
            <div className="pt-[72px] flex h-[calc(100vh-72px)] overflow-hidden">
                {/* Left scrollable area */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 space-y-6">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#1a1a1d] to-[#29292d] p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold">Content Block {i + 1}</h2>
                            <p className="text-gray-300 text-sm mt-2">This is scrollable main content.</p>
                        </div>
                    ))}
                </div>

                {/* Right sticky sidebar */}
                <div className="w-[300px] hidden md:block sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto no-scrollbar bg-[#18181c] border-l border-[#2a2a2f] px-6 py-4">
                    <h3 className="text-lg font-bold text-pink-400 mb-4">Sidebar Info</h3>
                    <div className="space-y-3">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-[#242428] p-3 rounded text-sm text-gray-300">
                                Sidebar item {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
