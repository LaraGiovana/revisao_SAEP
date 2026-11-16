// Algoritmo: AES-256-CBC
import crypto from 'crypto';
import { text } from 'stream/consumers';
const algoritthm = 'aes-256-cbc';
const secreteKey = Buffer.from(process.env.CPF_SECRET_KEY || '12345678901234567890123456789012');
const initialIv = Buffer.from(process.env.CPF_SECRET_IV || '1234567890123456');

function encrypt(text) {
    if(!text) return text;
    try {
        const cipher = crypto.createCipheriv(algoritthm, secreteKey, initialIv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted
    } catch (error) {
        console.error('Erro ao criptogrfar', error);
        return text;
    }
    
}

function decrypt(encryptedText) {
    if(!encryptedText) return encryptedText;
    try {
        const decipher = crypto.createDecipheriv(algoritthm, secreteKey, initialIv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted
    } catch (error) {
        console.error('Erro ao descriptografar', error);
        return text;
    }
    
}
export default {encrypt, decrypt};