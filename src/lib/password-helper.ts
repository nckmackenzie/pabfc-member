import { randomBytes } from "node:crypto";

const ALPHABET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const PASSWORD_LENGTH = 8;

export function generateRandomPassword(): string {
	const result = new Array(PASSWORD_LENGTH);
	for (let i = 0; i < PASSWORD_LENGTH; i++) {
		const randomByte = randomBytes(1)[0];
		let byte = randomByte;
		while (byte >= 248) {
			byte = randomBytes(1)[0];
		}
		result[i] = ALPHABET[byte % ALPHABET.length];
	}
	return result.join("");
}
