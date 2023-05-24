import { Message } from "discord.js";
import fetch from "node-fetch";
import ocr from "node-tesseract-ocr";
import Logger from "./Logger";
const c = new Logger("OCR", "blue");

const ocrOptions = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

export default async function detect(message: Message): Promise<string> {
  const buffer: Buffer = message.attachments.first()?.attachment as Buffer;
  if (
    message.attachments.first()?.contentType != null &&
    !message.attachments.first()?.contentType?.startsWith("image/")
  )
    return "";

  return new Promise(async (resolve, reject) => {
    // Handle attachments
    if (message.attachments.size > 0) {
      if (!buffer) resolve("");
      await ocr
        .recognize(buffer, ocrOptions)
        .then((text) => {
          resolve(text);
        })
        .catch((err: Error) => {
          c.error(err);
          reject(err);
        });
    }
    resolve("");
  });
}
