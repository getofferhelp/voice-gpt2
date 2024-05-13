const defaultApiUrl = 'https://api.moonshot.cn'
const proxyApiUrl = 'https://api.moonshot.cn'
const apiUrl = proxyApiUrl ?? defaultApiUrl
const apiKey = process.env.MOONSHOT_API_KEY

interface Message {
  role: string
  content: string
}

export const requestOpenAI = async (messages: Array<Message>) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: !!apiKey ? `Bearer ${process.env.MOONSHOT_API_KEY}` : null,
    },
    body: JSON.stringify({
      model: 'moonshot-v1-32k',
      messages: messages,
    }),
  }

  try {
    const response = await fetch(
      `${apiUrl}/v1/chat/completions`,
      requestOptions
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
