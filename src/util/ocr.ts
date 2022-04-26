import { Message } from "discord.js";
import fetch from 'node-fetch';
import ocr from 'node-tesseract-ocr';
import Logger from "./Logger";
const c = new Logger("OCR", "blue");

const ocrOptions = {
    lang: 'eng',
    oem: 1,
    psm: 3
}

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
            if (buffer != null) {
                c.trail('Attempting OCR...');
                ocr.recognize(buffer, ocrOptions).then(text => {
                    imageOcr = text;
                }).catch((err: Error) => {
                    c.log(`Attachment OCR failed on message by ${message.member?.user.username}: ${err.message}`);
                });
            }
        }

        if (!message.member) return "";
        if (!imageOcr) return "";

        c.log(`Text detected on ${message.id} (by ${message.member?.nickname}): ${imageOcr}`);
        return imageOcr;
    } catch (error) {
        console.log(error);
        return "";
    }
}