/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export type LlmragResponse = {
  type: "message" | "answer";
  content: string;
};

export const chatMessages = async function* (
  back_ground_message: string,
  query: string,
  user: string,
): AsyncGenerator<LlmragResponse> {
  // 接口 url 和 key 从数据库中获取
  const url = "https://llmrag.lusun.com/v1/chat-messages"
  const key = "app-1IXqXUIzQJ6X4t0PaHh9WHI0"

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        back_ground_message: back_ground_message,
      },
      query: query,
      response_mode: "streaming",
      user: user,
    }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ""; // 用于存储未完成的行

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk; // 将新数据追加到缓冲区

      // 处理换行符分割的完整行
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // 保留最后未完成的行

      for (const line of lines) {
        if (line.trim() === "") {
          continue;
        }

        const data = line.replace(/^data: /, "");
        try {
          const parsed = JSON.parse(data);
          if (parsed.event === "message" && parsed.answer) {
            // console.log("parsed.answer", parsed.answer);
            yield { type: "message", content: parsed.answer as string };
          }
          if (
            parsed.event === "workflow_finished" &&
            parsed.data.outputs.answer
          ) {
            yield {
              type: "answer",
              content: parsed.data.outputs.answer as string,
            };
          }
        } catch {
          continue;
        }
      }
    }

    // 如果缓冲区中仍有未处理的完整数据，处理它
    if (buffer.trim() !== "") {
      const data = buffer.replace(/^data: /, "");
      try {
        const parsed = JSON.parse(data);
        if (parsed.event === "message" && parsed.answer) {
          yield { type: "message", content: parsed.answer as string };
        }
        if (
          parsed.event === "workflow_finished" &&
          parsed.data.outputs.answer
        ) {
          yield {
            type: "answer",
            content: parsed.data.outputs.answer as string,
          };
        }
      } catch (error) {
        console.error(error as Error);
        throw error;
      }
    }
  } catch (error) {
    console.error(error as Error);
    throw error;
  }
};
