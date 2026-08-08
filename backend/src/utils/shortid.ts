import crypto from 'crypto';

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHABET_LEN = ALPHABET.length;

export function generateShortCode(length = 6) {
  const bytes = crypto.randomBytes(length);
  let id = '';
  for (let i = 0; i < bytes.length; i++) {
    id += ALPHABET[bytes[i] % ALPHABET_LEN];
  }
  return id;
}

export default generateShortCode;
