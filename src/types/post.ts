import {type Card} from "@/types/card";

export type Post = {
  id: number;
  name: string;
  outline: string;
  createdAt: Date;
  updatedAt: Date | null;
  card?: Card[];
};

// 内容详情接口
export interface ContentDetail {
  original_text: string;
  simple_original_text: string;
  timestamp: string;
}

// 标题接口
export interface Title {
  text: string;
  level: number;
}

// 子标题接口
export interface SubHeader {
  id: string;
  title: Title;
  content: string | Record<string, string>;
  content_detail: ContentDetail;
}

// 主要内容块接口
export interface ContentBody {
  id: string;
  title: Title;
  subHeaders: SubHeader[];
}

// 关键点接口
export interface KeyPoint {
  title: string;
  content: string;
  content_detail: ContentDetail;
}

// 各种类型的结果项接口
export interface DescriptionResult {
  type: 'description';
  value: string;
}

export interface TagResult {
  type: 'tag';
  value: string[];
}

export interface ContentBodyResult {
  type: 'content_body';
  value: ContentBody[];
}

export interface KeyPointResult {
  type: 'key_point';
  value: KeyPoint[];
}

// 组合所有可能的结果类型
export type ResultItem = DescriptionResult | TagResult | ContentBodyResult | KeyPointResult;

// 最终的数据结构接口
export interface ProjectData {
  result: ResultItem[];
}
