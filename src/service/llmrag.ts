/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export type LlmragResponse = {
  type: "message" | "answer";
  content: string;
};

export const chatMessages = async (
  back_ground_message: string,
  query: string,
  user: string,
): Promise<LlmragResponse> => {
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
        original_text: back_ground_message,
      },
      query: query,
      response_mode: "blocking",
      user: user,
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      type: "answer",
      content: data.answer || data.content || JSON.stringify(data),
    };
  } catch (error) {
    return {
      type: "message",
      content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    };
  }
};
