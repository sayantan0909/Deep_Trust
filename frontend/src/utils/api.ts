import { AnalysisResult } from '../types';

const BASE = import.meta.env.VITE_API_URL as string;

async function post(endpoint: string, body: any, isFile: boolean = false): Promise<AnalysisResult> {
  const res = await fetch(`${BASE}/analyze/${endpoint}`, {
    method: "POST",
    body: isFile ? body as FormData : JSON.stringify(body),
    headers: isFile ? {} : { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<AnalysisResult>;
}

export const analyzeText = (text: string): Promise<AnalysisResult> => post("text", { text });

const sendFile = (endpoint: string) => (file: File): Promise<AnalysisResult> => {
  const form = new FormData();
  form.append("file", file);
  return post(endpoint, form, true);
};

export const analyzeImage = sendFile("image");
export const analyzeAudio = sendFile("audio");
export const analyzeVideo = sendFile("video");
