import fs from 'fs';

type Events = { root: [{ [key: string]: Function }] };
type Event = { [key: string]: Function };

export default async function getEvents(): Promise<Events> {
    const files = await fs.readdirSync('./src/events');
    const events: Events = {
        root: [{
            _unusedevent: () => { }
        }]
    };

    files.forEach((file: any) => {
        if (file.endsWith('.ts') && !file.endsWith('eventHandler.ts')) {
            import(`./${file}`).then(async (event) => {
                events.root.push({
                    [file.replace('.ts', '')]: event.default
                });
            });
        }
    });

    return events;
}

export function findEvent(events: Events, target: string): Function | undefined {
    const event: Event | undefined = events.root.find((event: Event) => Object.keys(event)[0] === target);
    if (event) return event[target];
}