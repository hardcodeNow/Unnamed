import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Flag, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContentDetail {
  original_text: string;
  simple_original_text: string;
  timestamp: string;
}

interface Title {
  text: string;
  level: number;
  icon: string;
}

interface SubHeader {
  id: string;
  title: Title;
  content: string;
  content_detail: ContentDetail;
}

interface Section {
  id: string;
  title: Title;
  subHeaders: SubHeader[];
}

interface KeyPoint {
  title: string;
  icon: string;
  content: string;
  content_detail: ContentDetail;
}

type DataItem =
  | { type: "title"; value: string }
  | { type: "description"; value: string }
  | { type: "tag"; value: string[] }
  | { type: "content_body"; value: Section[] }
  | { type: "key_point"; value: KeyPoint[] };

interface Data {
  result: DataItem[];
}

const OutlineEditor: React.FC = () => {
  const [data, setData] = useState<Data>({
    result: [
      {
        type: "title",
        value: "这里是标题",
      },
      {
        type: "description",
        value: "这里是一个描述：项目一句话描述",
      },
      {
        type: "tag",
        value: ["标签1", "标签2", "标签3"],
      },
      {
        type: "content_body",
        value: [
          {
            id: "1",
            title: {
              text: "项目基本信息",
              level: 1,
              icon: "FileText",
            },
            subHeaders: [
              {
                id: "1-1",
                title: {
                  text: "项目名称",
                  level: 2,
                  icon: "Type",
                },
                content: "AI笔记",
                content_detail: {
                  original_text: "AI笔记",
                  simple_original_text: "AI笔记项目",
                  timestamp: "[7.8--10.32]",
                },
              },
              {
                id: "1-2",
                title: {
                  text: "团队成员及角色分工",
                  level: 2,
                  icon: "List",
                },
                content: "5个同学，一起分工",
                content_detail: {
                  original_text: "5个同学，一起分工",
                  simple_original_text: "5人团队协作",
                  timestamp: "[12.45--15.21]",
                },
              },
              {
                id: "1-3",
                title: {
                  text: "项目赛道",
                  level: 2,
                  icon: "Tag",
                },
                content: "效率工具",
                content_detail: {
                  original_text: "效率工具",
                  simple_original_text: "效率工具类项目",
                  timestamp: "[16.05--18.40]",
                },
              },
            ],
          },
          {
            id: "2",
            title: {
              text: "项目概述",
              level: 1,
              icon: "Info",
            },
            subHeaders: [
              {
                id: "2-1",
                title: {
                  text: "核心价值主张",
                  level: 2,
                  icon: "Star",
                },
                content: "能够快速总结音频，进行内部分发和异步沟通",
                content_detail: {
                  original_text:
                    "解决的问题：能够快速总结音频，进行内部分发和异步沟通\n目标用户群体：团队、学生\n差异化优势：降低了整个流程的门槛，提升了大家总结，生成一个可传递内容的效率",
                  simple_original_text:
                    "音频快速总结工具，面向团队和学生，提供高效率的内容处理",
                  timestamp: "[20.15--25.48]",
                },
              },
              {
                id: "2-2",
                title: {
                  text: "技术实现",
                  level: 2,
                  icon: "Layout",
                },
                content:
                  "采用的主要技术栈 ts、react 系统架构 全栈项目 创新点/技术亮点 精致模板，提升大家总结效率",
                content_detail: {
                  original_text:
                    "采用的主要技术栈：ts、react\n系统架构：全栈项目\n创新点/技术亮点：精致模板，提升大家总结效率",
                  simple_original_text:
                    "基于ts和react的全栈项目，特色是精致的模板系统",
                  timestamp: "[26.10--30.25]",
                },
              },
            ],
          },
        ],
      },
      {
        type: "key_point",
        value: [
          {
            title: "关键点",
            icon: "Flag",
            content: "关键点描述",
            content_detail: {
              original_text: "这是第二节的内容",
              simple_original_text: "第二节概要",
              timestamp: "[32.15--35.40]",
            },
          },
          {
            title: "关键点",
            icon: "Flag",
            content: "关键点描述",
            content_detail: {
              original_text: "这是第二节的内容",
              simple_original_text: "第二节概要",
              timestamp: "[36.20--40.15]",
            },
          },
        ],
      },
    ],
  });

  const getItemByType = <T extends DataItem["type"]>(type: T): Extract<DataItem, { type: T }> | undefined => {
    return data.result.find((item): item is Extract<DataItem, { type: T }> => item.type === type);
  };

  const handleTitleChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      result: prev.result.map((item) =>
        item.type === "title" ? { ...item, value } : item,
      ),
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      result: prev.result.map((item) =>
        item.type === "description" ? { ...item, value } : item,
      ),
    }));
  };

  const handleContentBodyChange = (
    sectionId: string,
    subHeaderId: string,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      result: prev.result.map((item) => {
        if (item.type === "content_body") {
          return {
            ...item,
            value: item.value.map((section) => {
              if (section.id === sectionId) {
                return {
                  ...section,
                  subHeaders: section.subHeaders.map((subHeader) => {
                    if (subHeader.id === subHeaderId) {
                      return { ...subHeader, content: value };
                    }
                    return subHeader;
                  }),
                };
              }
              return section;
            }),
          };
        }
        return item;
      }),
    }));
  };

  const handleKeyPointChange = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      result: prev.result.map((item) => {
        if (item.type === "key_point") {
          return {
            ...item,
            value: item.value.map((point, i) => {
              if (i === index) {
                return { ...point, content: value };
              }
              return point;
            }),
          };
        }
        return item;
      }),
    }));
  };

  const titleItem = getItemByType("title");
  const descriptionItem = getItemByType("description");
  const contentBodyItem = getItemByType("content_body");
  const keyPointItem = getItemByType("key_point");

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-0 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            标题与描述
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">标题</label>
            <Input
              value={titleItem?.value ?? ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="输入标题"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">描述</label>
            <Textarea
              value={descriptionItem?.value ?? ""}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="输入描述"
              rows={3}
            />
          </div>
          <Separator />

          {contentBodyItem?.value.map((section) => (
            <div key={section.id} className="space-y-4">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {section.title.text}
              </CardTitle>
              <div className="space-y-4 pl-4">
                {section.subHeaders.map((subHeader) => (
                  <div key={subHeader.id} className="space-y-2">
                    <label className="block text-sm font-medium">
                      {subHeader.title.text}
                    </label>
                    <Input
                      value={subHeader.content}
                      onChange={(e) =>
                        handleContentBodyChange(
                          section.id,
                          subHeader.id,
                          e.target.value,
                        )
                      }
                      placeholder={`输入${subHeader.title.text}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Separator />

          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            关键点
          </CardTitle>
          <div className="space-y-4">
            {keyPointItem?.value.map((point, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium">
                  关键点 {index + 1}
                </label>
                <Input
                  value={point.content}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                  placeholder="输入关键点"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutlineEditor;
