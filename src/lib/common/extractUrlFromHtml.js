
export default function extractUrlFromHtml(htmlContent) {
  const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
  const match = htmlContent.match(urlPattern)
  return match ? match[0] : ''
}
