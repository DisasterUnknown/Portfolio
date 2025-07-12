import CryptoJS from 'crypto-js';

export default function encryptData({data, passphrase}) {
    const ciphertext = CryptoJS.AES.encrypt(data, passphrase).toString();
    return ciphertext;
}