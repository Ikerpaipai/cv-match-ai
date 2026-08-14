import type { JobMatch } from '../types/job';

const API_URL = 'http://localhost:3000';

export async function getJobMatches(cvId: string): Promise<JobMatch[]> {
  const response = await fetch(`${API_URL}/matching/${cvId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch job matches');
  }

  return response.json();
}

export async function importMatches(candidateId: string, limit = 5): Promise<JobMatch[]> {
  const response = await fetch(`${API_URL}/matching/${candidateId}/import?limit=${limit}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to import matches');
  }

  return response.json();
}
