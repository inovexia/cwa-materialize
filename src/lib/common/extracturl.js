
export default async function extractUrlFromHtml(message) {

  const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
  const match = htmlContent.match(urlPattern)
  return match ? match[0] : ''
}

//export default MessageFormatter
