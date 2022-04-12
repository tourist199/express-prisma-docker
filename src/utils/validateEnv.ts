import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        DB_NAME: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
    });
}

export default validateEnv;
