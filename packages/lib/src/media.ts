/**
 * Resolves a relative media / upload URL against the API server base URL.
 */
export function resolveMediaUrl(
  url: string | null | undefined,
  defaultBaseUrl = "http://localhost:4000",
): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const baseUrl =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) || defaultBaseUrl;
  return `${baseUrl.replace(/\/+$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
}
