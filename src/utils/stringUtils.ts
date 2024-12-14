export function cleanAndTrimText(text: string): string {
  return text.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

export function isValidJSONString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}