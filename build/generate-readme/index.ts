import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const templateFile = readFileSync(`${__dirname}/README.md`, 'utf8');
const outputFile = `${__dirname}/../../README.md`;

(() => {
    // Run the command and get the output
    try {
        const output = execSync('NO_COLOR=1 pnpm play --help', {
            cwd: process.cwd(),
            encoding: 'utf-8',
        });

        // Replace it in our readme template
        const commandOutput = output.split('\n').slice(2, -2).join('\n');

        const readme = templateFile.replace('{{CRAYON_OUTPUT}}', commandOutput);

        // Write the file
        writeFileSync(outputFile, readme);
    } catch (e) {
        console.log(e);
    }
})();
