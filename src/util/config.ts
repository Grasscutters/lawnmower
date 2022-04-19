import fs from 'fs';

interface ConfigI {
    token: string;
    client_id: string;
    target_guild: string;
}

/**
 * @function getConfig
 * @returns {object} The config file as an object.
 */
export default async function getConfig(): Promise<ConfigI> {
    try {
        return JSON.parse(await fs.readFileSync('./src/config.json', 'utf8'));
    } catch (error) {
        console.error(error);
        return {
            token: '',
            client_id: '',
            target_guild: '',
        }
    }
}