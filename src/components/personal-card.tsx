import React from "react";
import { Calendar } from "lucide-react";
import DynamicIcon from "@/components/dynamic-icon";
import { type ContentBody, type Post, type ProjectData } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { NotFound } from "./not-found";
import { usePlayerStore } from "@/stores/player";

type Props = {
  post: Post;
  card: ProjectData;
};

const colors = ["red", "yellow", "green", "blue", "purple", "pink"];

const randomColor = (index: number) => {
  const color = colors[index % colors.length];
  return color;
};

// const randomOpacity = () => {
//   const opacity = [0, 10];
//   return opacity[Math.floor(Math.random() * opacity.length)];
// };

function parseRangeString(str: string) {
  // 如果输入为空，返回默认值
  if (!str) return [0, 0];

  // 移除所有空格
  str = str.trim();

  // 提取所有数字（包含小数点）
  const numbers = str.match(/\d+\.\d+|\d+/g) ?? [];

  // 取前两个数字，如果不存在则补0
  const start = parseFloat(numbers[0] ?? "0");
  const end = parseFloat(numbers[1] ?? numbers[0] ?? "0");

  return [start, end];
}

const ContentBodyCmp: React.FC<{ data: ContentBody; colorIndex: number }> = ({
  data,
  colorIndex,
}) => {
  const { setCurrentTime } = usePlayerStore();

  const handleSetPlayerTime = (unhandleTimestamp: string) => {
    // [1.00--20.00]
    const times = parseRangeString(unhandleTimestamp);
    setCurrentTime(times[0] ?? 0);
  };

  return (
    <div
      className={`rounded-xl bg-gradient-to-tl from-${randomColor(colorIndex)}-500/0 to-${randomColor(colorIndex)}-500/10 p-6`}
    >
      <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <DynamicIcon
          iconName={data.title.icon}
          size={20}
          color={"rgb(37 99 235)"}
        />
        <span>{data.title.text}</span>
      </div>
      <div className="space-y-4">
        {data.subHeaders.map((sub, index) => (
          <div
            key={index}
            className="cursor-pointer select-none rounded-lg bg-white p-4 shadow-sm"
            onClick={() => handleSetPlayerTime(sub.content_detail.timestamp)}
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-${randomColor(colorIndex)}-100`}
              >
                <span
                  className={`font-bold text-${randomColor(colorIndex)}-600`}
                >
                  {index + 1}
                </span>
              </div>
              <span className={`text-sm text-${randomColor(colorIndex)}-600`}>
                {sub.title.text}
                <span className="text-muted-foreground">
                  （{parseRangeString(sub.content_detail.timestamp)[0]} 秒）
                </span>
              </span>
            </div>
            <p className="leading-relaxed text-gray-700">{sub.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<Props> = ({ post, card }) => {
  if (!card.result || card.result.length === 0) {
    return <NotFound errorMsg="卡片出错啦，重新生成一下" />;
  }

  return (
    <div className="flex h-full w-full">
      <div className="w-full max-w-[1600px] space-y-6 rounded-xl bg-white p-8">
        {/* 项目头部 */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {card.result.find((item) => item.type === "title")?.value}
            </h1>
            <p className="text-base text-gray-600">
              {card.result.find((item) => item.type === "description")?.value}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-b border-gray-100 py-6 pt-0 md:grid-cols-3 lg:grid-cols-4">
          {card.result
            .find((item) => item.type === "key_point")
            ?.value.map((keyPoint, index) => (
              <div
                key={index}
                className="select-none rounded-xl bg-gray-50 p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <DynamicIcon
                    className={`h-5 w-5 text-${randomColor(index)}-500`}
                    iconName={keyPoint.icon}
                  />
                  <span className="font-medium">{keyPoint.title}</span>
                </div>
                <p className="text-sm text-gray-600">{keyPoint.content}</p>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {card.result
            .find((item) => item.type === "content_body")
            ?.value.map((contentBody, index) => (
              <ContentBodyCmp
                key={index}
                data={contentBody}
                colorIndex={index + 1}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
