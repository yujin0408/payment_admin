const BASE_URL = "https://recruit.paysbypays.com/api/v1";

export async function fetcher<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    return null as T;
  }
}
