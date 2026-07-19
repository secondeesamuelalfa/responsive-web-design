const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");


function convertInline(text) {
  text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*(.+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+)__/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+)\*/g, "<em>$1</em>");
  text = text.replace(/_(.+)_/g, "<em>$1</em>");
  return text;
}


function convertLine(line) {

  const headingMatch = line.match(/^\s*(#{1,3})\s+(.*)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const content = convertInline(headingMatch[2]);
    return `<h${level}>${content}</h${level}>`;
  }


  const quoteMatch = line.match(/^\s*>\s+(.*)$/);
  if (quoteMatch) {
    const content = convertInline(quoteMatch[1]);
    return `<blockquote>${content}</blockquote>`;
  }


  return convertInline(line);
}


function convertMarkdown() {
  return markdownInput.value
    .split("\n")
    .map(convertLine)
    .join("");
}


markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html;
  preview.innerHTML = html;
});