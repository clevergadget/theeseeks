import { Librarian } from './core/librarian.js';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        console.log("Starting test...");
        await Librarian.ingest('https://ai.google.dev/gemini-api/docs/quickstart', 'gemini-test', 'v1');
        console.log("Test complete.");
    } catch (e) {
        console.error("Test failed:", e);
    }
}

main();
