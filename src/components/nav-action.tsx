import * as React from "react";

import { Mic, Play, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { convertToBase64 } from "@/lib/utils";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useQueryClient } from "@tanstack/react-query";

export function NavAction() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const utils = api.useUtils();

  const genByRecord = api.post.genByRecord.useMutation({
    onSuccess: async () => {
      await utils.post.list.invalidate();
      setLoading(false);
      toast.success("文件上传成功");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(`上传失败: ${error.message}`);
    },
  });

  const handleFileChange = async (event: any) => {
    console.log("asd");
    try {
      setLoading(true);

      const files = event.target.files;
      if (!files) {
        throw new Error("未选择文件");
      }
      const file = files[0];

      if (!file) {
        throw new Error("未选择文件");
      }

      // 验证文件类型
      if (!file.type.startsWith("audio/")) {
        throw new Error("请选择音频文件");
      }

      // 验证文件大小 (这里限制为10MB)
      if (file.size > 500 * 1024 * 1024) {
        throw new Error("文件大小不能超过500MB");
      }

      const base64 = (await convertToBase64(file)) as string;

      genByRecord.mutate({
        file: {
          name: file.name,
          type: file.type,
          content: base64,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">开始记录</CardTitle>
          <CardDescription>随时随地记录、此时此刻总结</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
            id="audio-upload"
            // 确保 input 不会被 React 的事件系统忽略
            key="file-input"
          />
          <Button
            type="button"
            disabled={loading}
            size="sm"
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            onClick={handleButtonClick}
          >
            <Mic />
            {loading ? "上传中..." : "录音频"}
          </Button>
          {/* <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
          >
            <Plus />
            写文档
          </Button> */}
        </CardContent>
      </form>
    </Card>
  );
}
