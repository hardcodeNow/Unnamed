import FormData from "form-data";
import { Buffer } from "buffer";
import fetch, { type Response } from "node-fetch";
import {type AsrRes, type Chunk} from "@/server/api/routers/post";

interface WhisperError extends Error {
  status?: number;
  response?: Response;
}

const API_ENDPOINT = "http://localhost:8000/api/submit";

export const whisperAsr = async (fileContent: string): Promise<AsrRes> => {
  if (!fileContent) {
    throw new Error("File content is required");
  }

  try {
    const buffer: Buffer = Buffer.from(fileContent, "base64");

    const formData: FormData = new FormData();
    formData.append("audio", buffer, {
      filename: "audio.wav",
      contentType: "audio/wav",
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
  let res = ""
  chunks.forEach((chunk) => {
    const line ="[" + (chunk.timestamp[0] ?? " ").toString() + "--" + (chunk.timestamp[1] ?? " ").toString() + "]  " + chunk.text + ";\n ";
    res += line;
  })
  return res
}
