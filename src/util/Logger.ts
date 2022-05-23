import 'colorts/lib/string';

export default class Logger {
    constructor(public name: string, public color: string = 'green') {
        this.name = name;
        this.color = color;
    }

    private getDate(): string {
        return new Date().toLocaleTimeString();
    }

    private raw(...args: string[]) {
        // @ts-ignore - Element implicitly has an 'any' type because index expression is not of type 'number'
        console.log(`[${this.getDate().white.bold}] <${this.name[this.color].bold}>`, ...args);
    }

    public log(...args: string[]) {
        this.raw(...args);
    }

    public trail(...args: string[]) {
        console.log(`\t↳ ${args.join(' ').gray}`);
    }

    public error(e: Error) {
        console.log(`[${this.getDate().white.bold}] ${`ERROR<${this.name}>`.bgRed.bold}`, e.message);
        if (e.stack) this.trail(e.stack);
    }

    public warn(...args: string[]) {
        console.log(`[${this.getDate().white.bold}] ${'WARN'.bgYellow.bold}`, ...args);
    }

    public debug(...args: any) {
        console.log(`[${this.getDate().white.bold}] ${`DEBUG<${this.name}>`.bgBlue.bold}`, ...args);
    }
}