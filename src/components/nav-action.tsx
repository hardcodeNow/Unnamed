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

export function NavAction() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">开始记录</CardTitle>
          <CardDescription>随时随地记录、随时随地总结</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Button
            // className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
            variant="outline"
          >
            <Mic />
            录音频
          </Button>
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
          >
            <Plus />
            写文档
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
