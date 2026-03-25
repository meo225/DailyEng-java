/**
 * SmartLens API client — calls Spring Boot SmartLensController.
 */

import { apiClient } from "@/lib/api-client";

export interface SmartLensLine {
  original: string;
  translated: string;
  boundingPolygon: { x: number; y: number }[];
}

export interface SmartLensResponse {
  lines: SmartLensLine[];
  fullText: string;
  translatedFullText: string;
  detectedLanguage?: string;
  targetLanguage: string;
  message?: string;
}

/**
 * Upload an image and get OCR + translated text.
 */
export async function analyzeImage(
  file: File,
  targetLanguage: string
): Promise<SmartLensResponse> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("to", targetLanguage);
  return apiClient.upload<SmartLensResponse>("/smartlens/analyze", formData);
}
