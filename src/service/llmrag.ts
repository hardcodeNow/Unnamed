/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export type LlmragApiResponse = {
  event: string;
  task_id: string;
  id: string;
  message_id: string;
  conversation_id: string;
  mode: string;
  answer: string;
  metadata: Record<string, unknown>;
  created_at: number;
};

export const chatMessages = async (
  original_text: string,
): Promise<LlmragApiResponse> => {
  // 接口 url 和 key 从数据库中获取
  const url = "https://llmrag.lusun.com/v1/chat-messages";
  const key = "app-1IXqXUIzQJ6X4t0PaHh9WHI0";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        original_text: original_text,
      },
      query: "hi",
      response_mode: "blocking",
      user: "hardcode",
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as LlmragApiResponse;
};
