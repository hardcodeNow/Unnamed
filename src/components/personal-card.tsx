import React from "react";
import { Calendar, Cpu, DollarSign, Award, TrendingUp } from "lucide-react";
import DynamicIcon from "@/components/dynamic-icon";
import { ContentBody, Post, ProjectData } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { NotFound } from "./not-found";

type Props = {
  post: Post;
  card: ProjectData;
};

const randomColor = () => {
  const colors = ["red", "yellow", "green", "blue", "purple", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomOpacity = () => {
  const opacity = [0, 10];
  return opacity[Math.floor(Math.random() * opacity.length)];
};
const ContentBodyCmp: React.FC<{ data: ContentBody }> = ({ data }) => {
  const color1 = randomColor();
  const color2 = randomColor();

  return (
    <div
      className={`rounded-xl bg-gradient-to-tl from-${color1}-500/${randomOpacity()} to-${color2}-500/20 p-6`}
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
          <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-${color1}-100`}
              >
                <span className={`font-bold text-${color1}-600`}>
                  {index + 1}
                </span>
              </div>
              <span className={`text-sm text-${color1}-600`}>
                {sub.title.text}
              </span>
            </div>
            <p className="leading-relaxed text-gray-700">
              {sub.content as string}
            </p>
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
              <div key={index} className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <DynamicIcon
                    className={`h-5 w-5 text-${randomColor()}-500`}
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
              <ContentBodyCmp key={index} data={contentBody} />
            ))}
        </div>
      </div>
    </div>
  );
};
