export function getSummaryPrompt(transcript) {
  return `Title: "${document.title
    .replace(/\n+/g, " ")
    .trim()}"\nVideo Transcript: "${transcript
    .replace(/\n+/g, " ")
    .trim()}"\nVideo Summary:`;
}
