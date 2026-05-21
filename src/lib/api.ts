import { AnalysisResult, AnalysisInput } from '../types';

export async function analyzeInput(input: AnalysisInput): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || error.error || 'Analysis failed');
  }

  return response.json();
}

export async function simulateAction(endpoint: string, payload: any) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}
