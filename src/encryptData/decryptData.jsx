import CryptoJS from 'crypto-js';

export default function decryptData({data, passphrase}) {
    const bytes = CryptoJS.AES.decrypt(data, passphrase)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData)
}