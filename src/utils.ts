import { fileURLToPath } from 'url';
import path from 'path';

export class CLIError extends Error {
    constructor(
        message: string,
        public code?: string,
    ) {
        super(message);
        this.name = 'CLIError';
    }
}
