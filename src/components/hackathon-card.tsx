import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ChevronDown } from "lucide-react";

const HackathonCard = () => {
  const project = {
    title: "Seekers Alliance",
    track: "教育娱乐",
    value:
      "Seekers Alliance是一款多人对战卡牌游戏。玩家可以收集卡牌、组建牌组并与其他玩家对战。团队将抽卡概率公开在链上，并使用随机数生成器提高透明度。",
    tags: ["游戏", "区块链"],
  };

  return (
    <div className="flex min-h-[200px] items-center justify-center p-6">
      <Card className="w-full max-w-2xl rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-2xl">
        <CardContent className="px-8 pb-8 pt-10">
          <div className="flex flex-col">
            {/* 项目名称、赛道和详情按钮 */}
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="font-['Noto_Sans_SC'] text-2xl font-semibold tracking-tight text-slate-800">
                  {project.title}
                </h2>
                <div className="flex items-center gap-1.5 font-['Noto_Sans_SC'] text-sm text-slate-500">
                  <Award className="h-4 w-4 text-indigo-500" />
                  <span>{project.track}</span>
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-['Noto_Sans_SC'] text-sm text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                aria-label="查看详情"
              >
                详情
                <ChevronDown className="h-4 w-4 text-indigo-500" />
              </button>
            </div>

            {/* 核心价值 */}
            <p className="mb-6 font-['Noto_Sans_SC'] text-base leading-relaxed text-slate-600">
              {project.value}
            </p>

            {/* 技术标签 */}
            <div className="flex gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-['Noto_Sans_SC'] text-sm font-medium text-slate-600 shadow-sm transition-shadow duration-200 hover:shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HackathonCard;
