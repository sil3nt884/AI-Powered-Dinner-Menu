import { spawn } from 'node:child_process';



export const extractIngredients = async (text: string): Promise<unknown> => {
    const python = spawn('python3', ['server/extract_ingredientsV2.py']);
    python.stdin.write(text);
    python.stdin.end();
    return new Promise((resolve, reject) => {
        let data = '';
        python.stdout.on('data', (chunk) => {
            data += String(chunk);
        });
        python.stdout.on('end', () => {
           resolve(data.split('\n'));
        });
        python.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    });
}
