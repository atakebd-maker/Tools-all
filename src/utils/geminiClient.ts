export interface GeminiRequestOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
}

export interface GeminiResponse {
  result: string;
}

export async function callGeminiApi(options: GeminiRequestOptions): Promise<string> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || `Server responded with status ${response.status}`;
    throw new Error(errorMsg);
  }

  if (typeof data.result !== 'string') {
    throw new Error('Invalid response structure received from AI server.');
  }

  return data.result;
}

export async function checkGeminiStatus(): Promise<{ status: string; hasApiKey: boolean; model: string }> {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // ignore
  }
  return { status: 'offline', hasApiKey: false, model: 'gemini-3.8-flash' };
}
