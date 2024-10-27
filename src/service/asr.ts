import ffmpeg from "fluent-ffmpeg";
import FormData, { Readable } from "form-data";
import { Buffer } from "buffer";
import fetch, { type Response } from "node-fetch";
import { type AsrRes, type Chunk } from "@/server/api/routers/post";

interface WhisperError extends Error {
  status?: number;
  response?: Response;
}

const API_ENDPOINT = "http://localhost:8000/api/submit";

// 将 base64 转换为 buffer 流
const base64ToStream = (base64String: string): Readable => {
  // 移除可能存在的 base64 头部
  const base64Data = base64String.replace(/^data:audio\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  return Readable.from(buffer);
};

// webm 转 mp3 转换函数
const convertWebmToMp3 = async (base64Audio: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const inputStream = base64ToStream(base64Audio);
    const chunks: Buffer[] = [];

    const command = ffmpeg(inputStream)
      .toFormat("mp3")
      .audioBitrate("128k")
      .on("error", (err) => {
        reject(new Error(`Audio conversion failed: ${err.message}`));
      })
      .on("end", () => {
        const outputBuffer = Buffer.concat(chunks);
        resolve(outputBuffer);
      });

    // 捕获转换后的数据
    command.pipe().on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
  });
};

export const whisperAsr = async (fileContent: string): Promise<AsrRes> => {
  if (!fileContent) {
    throw new Error("File content is required");
  }

  try {
    const buffer: Buffer = await convertWebmToMp3(fileContent);

    const formData: FormData = new FormData();
    formData.append("audio", buffer, {
      filename: "audio.mp3",
      contentType: "audio/mpeg",
    });

    const response: Response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (!response.ok) {
      const error: WhisperError = new Error(
        `HTTP error! status: ${response.status}`,
      );
      error.status = response.status;
      error.response = response;
      throw error;
    }

    const data: AsrRes = (await response.json()) as AsrRes;
    if (data.status !== "success") {
      throw new Error(`API Error`);
    }

    if (!data.text) {
      throw new Error("No transcription text returned from API");
    }

    return data;
  } catch (error) {
    console.error("Whisper ASR error:", error);

    if (error instanceof Error) {
      throw new Error(
        `Failed to process audio with Whisper ASR: ${error.message}`,
      );
    }

    throw new Error("Failed to process audio with Whisper ASR: Unknown error");
  }
};

export const chunks2Text = (chunks: Chunk[]): string => {
  let res = "";
  chunks.forEach((chunk) => {
    const line =
      "[" +
      (chunk.timestamp[0] ?? " ").toString() +
      "--" +
      (chunk.timestamp[1] ?? " ").toString() +
      "]  " +
      chunk.text +
      ";\n ";
    res += line;
  });
  return res;
};
