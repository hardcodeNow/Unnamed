import { AudioLines, Mic, Upload } from "lucide-react";
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
import { useRecorderStore } from "@/stores/recorder";

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
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const {
    isRecording,
    audioBase64,
    startRecording,
    stopRecording,
    clearRecording,
  } = useRecorderStore();

  useEffect(() => {
    if (audioBase64) {
      genByRecord.mutate({
        file: {
          name: `录音文件_${Date.now()}`,
          type: "audio/webm",
          content: audioBase64,
        },
      });
      clearRecording();
    }
  }, [audioBase64, clearRecording, genByRecord]);

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
            variant="outline"
            onClick={handleButtonClick}
          >
            <Upload />
            {loading ? "上传中..." : "传音频文件"}
          </Button>
          {isRecording ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => stopRecording()}
            >
              <AudioLines />
              录音中
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
              size="sm"
              onClick={() => startRecording()}
            >
              <Mic />
              开始记录
            </Button>
          )}
        </CardContent>
      </form>
    </Card>
  );
}
