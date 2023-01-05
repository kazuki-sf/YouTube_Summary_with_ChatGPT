export function getSummaryPrompt(transcript) {
  return `Title: "${document.title
    .replace(/\n+/g, " ")
    .trim()}"\nVideo Transcript: "${truncateTranscript(transcript)
    .replace(/\n+/g, " ")
    .trim()}"\nVideo Summary:`;
}

// (Temporal Solution) Seems like 15,000 bytes is the limit for the prompt
function truncateTranscript(str) {
  const limit = 14000; // 1000 is a buffer
  const bytes = textToBinaryString(str).length;
  if (bytes > limit) {
    const ratio = limit / bytes;
    const newStr = str.substring(0, str.length * ratio);
    return newStr;
  }
  return str;
}

function textToBinaryString(str) {
  let escstr = decodeURIComponent(encodeURIComponent(escape(str)));
  let binstr = escstr.replace(/%([0-9A-F]{2})/gi, function (match, hex) {
    let i = parseInt(hex, 16);
    return String.fromCharCode(i);
  });
  return binstr;
}
