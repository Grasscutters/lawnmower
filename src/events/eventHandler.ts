import fs from 'fs';

type Events = {
    root: {
        name: string,
        call: (...args: any[]) => void;
    }[];
};

export default async function getEvents(): Promise<Events> {
    const files = await fs.readdirSync('./src/events');
    const events: Events = {
        root: []
    };

    await files.forEach((file: any) => {
        if (file.endsWith('.ts') && !file.endsWith('eventHandler.ts')) {
            import(`./${file}`).then(async (event) => {
                events.root.push({
                    name: file.replace('.ts', ''),
                    call: event.default
                })
            });
        }
    });

    return events;
}

export function findEvent(events: Events, target: string): Function | undefined {
    const event = events.root.find((e) => e.name === target);
    if (event) return event.call;
    console.warn(`Event ${target} not found.`);
    return undefined;
}