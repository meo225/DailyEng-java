/**
 * Translation API client — calls Spring Boot TranslateController.
 */

import { apiClient } from "@/lib/api-client";

export interface TranslateRequest {
  text: string;
  from?: string;
  to: string;
}

export interface TranslateResponse {
  translatedText: string;
  targetLanguage: string;
  detectedLanguage?: string;
}

/**
 * Translate text using Azure Translator via the backend.
 */
export async function translateText(
  request: TranslateRequest
): Promise<TranslateResponse> {
  return apiClient.post<TranslateResponse>("/translate", request);
}
