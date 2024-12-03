import CryptoJS from 'crypto-js';


export const encryptBody = (plaintext, key, type) => {
    try {
        const keyBytes = CryptoJS.enc.Base64.parse(key);
        if (keyBytes.words.length !== 8) {
            console.error('Invalid AES key length', key);
            throw new Error('Invalid AES key length');
        }
        const keyWordArray = CryptoJS.lib.WordArray.create(keyBytes.words);
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(plaintext), keyWordArray, {
            mode: CryptoJS.mode.ECB
        });
        const base64EncryptedBody = encrypted.toString();
        if (type == 0) {
            return { encryptedPayload: base64EncryptedBody }
        }
        else {
            return { encryptedData: base64EncryptedBody }
        }
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }

};



export const decryptBody = (encryptedBody, aesKey) => {


    try {
        const keyBytes = CryptoJS.enc.Base64.parse(aesKey);
        if (keyBytes.words.length !== 8) {
            console.error('Invalid AES key length', aesKey);
            throw new Error('Invalid AES key length');
        }
        const key = CryptoJS.lib.WordArray.create(keyBytes.words);
        const decrypted = CryptoJS.AES.decrypt(encryptedBody, key, {
            mode: CryptoJS.mode.ECB
        });
        const decryptedBody = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedBody);
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }


};