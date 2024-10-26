import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Code, Rocket, Star, Heart, Trophy, Brain } from "lucide-react";

const PersonalCard = () => {
  return (
    <Card className="w-full max-w-md rounded-xl bg-white shadow-2xl">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">张博</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-1 h-4 w-4" />
              <span>北京</span>
            </div>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
            <span className="text-2xl font-bold text-white">张</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            全栈开发
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            AI应用开发
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
            开源贡献者
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="mb-2 flex items-center">
            <Rocket className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              近期关键投入
            </h2>
          </div>
          <p className="text-gray-700">
            专注于AI应用软件开发，构建创新解决方案
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">履历亮点</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              开源项目积极贡献者
            </li>
            <li className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              全栈技术领域专家
            </li>
            <li className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              AI应用开发实践经验
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 flex items-center">
            <Brain className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">擅长领域</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <h3 className="font-medium text-blue-900">服务端开发</h3>
              <p className="mt-1 text-sm text-gray-600">后端架构设计与优化</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <h3 className="font-medium text-green-900">应用层开发</h3>
              <p className="mt-1 text-sm text-gray-600">用户界面与交互实现</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-3">
              <h3 className="font-medium text-purple-900">AI 应用</h3>
              <p className="mt-1 text-sm text-gray-600">智能应用设计与开发</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-3">
              <h3 className="font-medium text-orange-900">开源项目</h3>
              <p className="mt-1 text-sm text-gray-600">社区贡献与维护</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center">
            <Heart className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">兴趣爱好</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              🔍 产品逻辑分析
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              💻 技术探索
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              🌟 开源贡献
            </span>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-between">
            <p className="italic text-gray-600">
              &quot;用技术创造价值，以创新推动进步&quot;
            </p>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
              <Code className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalCard;
