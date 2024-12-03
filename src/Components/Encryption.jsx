import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
const EncryptDecryptExample = () => {
    useEffect(() => {
        const encryptBody = (plaintext, key) => {
            try {
                // Convert the key string into bytes
                const keyBytes = CryptoJS.enc.Base64.parse(key);
                // Ensure the key length is 256 bits (32 bytes)
                if (keyBytes.words.length !== 8) {
                    console.error('Invalid AES key length', key);
                }
                // Create a WordArray from the key bytes
                const keyWordArray = CryptoJS.lib.WordArray.create(keyBytes.words);
                // Encrypt using AES in ECB mode
                const encrypted = CryptoJS.AES.encrypt(plaintext, keyWordArray, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                });
                // Get the Base64-encoded encrypted body
                const base64EncryptedBody = encrypted.toString();
                'Encrypted:', base64EncryptedBody);
    return base64EncryptedBody;
} catch (error) {
    console.error('Encryption error:', error);
    return null;
}
        };
const decryptBody = (encryptedBody, key) => {
    try {
        // Decode the base64-encoded key
        const keyBytes = CryptoJS.enc.Base64.parse(key);
        // Ensure the key length is 256 bits (32 bytes)
        if (keyBytes.words.length !== 8) {
            console.error('Invalid AES key length', key);
            
        }
        // Create a WordArray from the key bytes
        const keyWordArray = CryptoJS.lib.WordArray.create(keyBytes.words);
        // Decrypt using AES in ECB mode
        const decrypted = CryptoJS.AES.decrypt(encryptedBody, keyWordArray, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        // Convert decrypted data to a string
        const decryptedBody = decrypted.toString(CryptoJS.enc.Utf8);
        'Decrypted:', decryptedBody);
        return decryptedBody;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};
const plaintext = 'shivam';
const aesKey = 'GsLosE/zMIWiSb77H6jE/KfDXq+ZilxULTjRzpcYVZ8=';
// Encrypting the plaintext
const encryptedData = encryptBody(plaintext, aesKey);
// Decrypting the encrypted data
decryptBody(encryptedData, aesKey);
    }, []);
return (
    <div>
        <h1>AES Encryption and Decryption</h1>
        {/* Your React components or UI elements */}
    </div>
);
};
export default EncryptDecryptExample;
