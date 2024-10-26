import React from 'react';
import {
  Calendar, Users, Target, Cpu,
  Zap, GitBranch, DollarSign, MessageCircle,
  Star, Award, TrendingUp, BookOpen
} from 'lucide-react';

export default function ProjectCard() {
  const projectData = {
    name: "AI 面试助手",
    shortDesc: "基于大语言模型的智能面试训练与评估系统",
    demoTime: "2024-03-15 14:30",
    basicInfo: {
      teamMembers: [
        {
          role: "技术负责人",
          name: "张博",
          work: "负责系统架构设计和核心算法实现"
        },
        {
          role: "产品经理",
          name: "李明",
          work: "负责产品规划和用户体验优化"
        },
        {
          role: "UI设计师",
          name: "王华",
          work: "负责界面设计和交互体验"
        }
      ],
      track: "效率工具"
    },
    valueProps: {
      problems: [
        "通过AI实时反馈机制，帮助求职者在面试前进行充分准备和技能评估",
        "利用数据分析，为HR提供标准化的面试评估报告和人才画像",
        "基于场景模拟，让面试官能够快速评估候选人的实际问题处理能力"
      ],
      advantages: [
        "独创的多维度评估体系，能够全方位分析面试者的专业能力和软实力",
        "实时语音识别和情绪分析技术，提供及时的表现反馈和改进建议",
        "深度学习模型持续优化，面试问题库不断扩充和更新"
      ]
    },
    techStack: {
      highlights: [
        "采用流式音频处理技术，实现超低延迟的实时语音交互和评估反馈",
        "基于Transformer架构的多模态分析系统，整合语音、文本和视频数据",
        "自研的面试评分算法，结合专家规则和机器学习模型动态调整评估标准"
      ]
    },
    progress: {
      completion: "85%",
      challenges: [
        "面对大规模并发访问时的系统性能优化和资源调度问题需要进一步改进",
        "在保证用户数据安全的同时，需要收集足够的训练数据来优化模型效果",
        "如何平衡AI评估的标准化与不同行业特殊需求的个性化定制要求"
      ],
      nextSteps: [
        "计划引入更多行业特定的面试模板和评估标准，提升系统的适用性",
        "优化系统架构，提升服务的可扩展性和稳定性",
        "探索商业化方案，包括企业版定制和个人会员服务"
      ]
    },
    ratings: [
      {
        aspect: "创新性",
        score: 4.5,
        comment: "在传统面试流程中引入AI辅助评估，创新性突出"
      },
      {
        aspect: "完成度",
        score: 4.2,
        comment: "核心功能完整，部分高级特性仍在开发中"
      },
      {
        aspect: "技术实现",
        score: 4.8,
        comment: "技术架构先进，性能优化到位，具备良好的扩展性"
      },
      {
        aspect: "商业潜力",
        score: 4.0,
        comment: "市场需求明确，商业模式清晰，具备规模化潜力"
      }
    ]
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-[1600px] space-y-6 rounded-xl bg-white p-8 shadow-xl">
        {/* 项目头部 */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{projectData.name}</h1>
            <p className="text-lg text-gray-600">{projectData.shortDesc}</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            <span>{projectData.demoTime}</span>
          </div>
        </div>

        {/* 双栏布局 */}
        <div className="grid grid-cols-2 gap-8">
          {/* 左栏：项目评估 */}
          <div className="space-y-6">
            {/* 核心价值 */}
            <div className="rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Target className="h-5 w-5 text-blue-600" />
                <span>解决方案评估</span>
              </div>
              <div className="space-y-4">
                {projectData.valueProps.problems.map((problem, index) => (
                  <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        <span className="font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <span className="text-sm text-blue-600">核心价值点</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 技术实现 */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Cpu className="h-5 w-5 text-blue-600" />
                <span>技术创新评估</span>
              </div>
              <div className="space-y-4">
                {projectData.techStack.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                    <Star className="mt-1 h-5 w-5 shrink-0 text-yellow-500" />
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右栏：进展和挑战 */}
          <div className="space-y-6">
            {/* 项目进展 */}
            <div className="rounded-xl bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <GitBranch className="h-5 w-5 text-blue-600" />
                <span>发展规划评估</span>
              </div>
              <div className="space-y-4">
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">项目完成度</span>
                    <span className="font-semibold text-blue-600">{projectData.progress.completion}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: projectData.progress.completion }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {projectData.progress.nextSteps.map((step, index) => (
                    <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="mb-2 text-sm font-medium text-blue-600">后续计划 {index + 1}</div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 挑战与应对 */}
            <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>挑战应对评估</span>
              </div>
              <div className="space-y-4">
                {projectData.progress.challenges.map((challenge, index) => (
                  <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                        <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <span className="text-sm text-purple-600">关键挑战</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部评分 */}
        <div className="mt-6 grid grid-cols-4 gap-6 border-t border-gray-100 pt-6">
          {projectData.ratings.map((rating, index) => (
            <div key={index} className="rounded-xl bg-gray-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                {index === 1 && <TrendingUp className="h-5 w-5 text-green-500" />}
                {index === 2 && <Cpu className="h-5 w-5 text-blue-500" />}
                {index === 3 && <DollarSign className="h-5 w-5 text-purple-500" />}
                <span className="font-medium">{rating.aspect}</span>
              </div>
              <div className="mb-2 flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">{rating.score}</span>
                <span className="text-sm text-gray-500">/ 5.0</span>
              </div>
              <p className="text-sm text-gray-600">{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
