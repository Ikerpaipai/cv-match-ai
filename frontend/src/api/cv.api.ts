import type { Cv, CvAnalysis } from '../types/cv';

const API_URL = import.meta.env.VITE_API_URL;

export async function getCvs(): Promise<Cv[]> {
  const response = await fetch(`${API_URL}/cv/`);

  if (!response.ok) {
    throw new Error('Failed to fetch CVs');
  }

  return response.json();
}

export async function uploadCv(file: File): Promise<CvAnalysis> {
  const formData = new FormData();

  formData.append('file', file);

  const response = await fetch(`${API_URL}/cv/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('CV upload failed');
  }

  const data = await response.json();

  console.log('API RAW RESPONSE:', data);

  return data;
}
