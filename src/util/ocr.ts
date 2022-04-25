import { Message } from "discord.js";
import Tesseract from "tesseract.js";
import fetch from 'node-fetch';
import Logger from "./Logger";
const c = new Logger("OCR", "blue");

async function getBufferFromURL(url: string): Promise<Buffer | string> {
    const img = await fetch(url);
    try {
        return Buffer.from(await img.arrayBuffer());
    } catch (e) {
        return '';
    }
}

export default async function detect(message: Message): Promise<string> {
    try {
        let imageOcr: string = "";
        const buffer: Buffer = message.attachments.first()?.attachment as Buffer;

        // Handle attachments
        if (message.attachments.size > 0) {
            try {
                if (buffer != null) {
                    const recognizeResult = await Tesseract.recognize(buffer);
                    imageOcr = recognizeResult.data.text;
                }
            } catch { }
        }

        // Handle URLs
        try {
            if (message.content.includes('tenor')) return "";
            const recognizeResult = await Tesseract.recognize(await getBufferFromURL(message.content));
            imageOcr = recognizeResult.data.text;
        } catch { }

        if (!message.member) return "";
        if (!imageOcr) return "";

        c.log(`Text detected on ${message.id} (by ${message.member?.nickname}): ${imageOcr}`);
        return imageOcr;
    } catch (error) {
        console.log(error);
        return "";
    }
}