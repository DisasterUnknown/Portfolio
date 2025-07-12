import { useEffect, useState } from "react"
import decryptData from '../encryptData/decryptData'
import encryptedJson from '../json/data.json'

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
                <div className="text-white">
                    <h1>Access Granted</h1>
                    <p>Welcome to the secure area.</p>
                </div>
            ) : (
                <div className="text-white">
                    <h1>Access Denied</h1 >
                    <p>You are not authorized to view this page.</p>
                </div >
            )
            }
        </>
    )
}