import React, { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value: [number]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: [number]) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value[0];
    setVolume(value[0]);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleSkipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 10;
  };

  const handleSkipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 10;
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 rounded-b-none border-t bg-background p-4 shadow-lg">
      <audio
        ref={audioRef}
        src="https://cdn.airbozh.cn/fun-storage/record/%e5%86%85%e9%83%a8%e8%ae%a8%e8%ae%ba%e4%bc%9a10%e6%9c%8826%e6%97%a5%2011%e7%82%b904%e5%88%86.m4a..mp3?_upd=%E5%86%85%E9%83%A8%E8%AE%A8%E8%AE%BA%E4%BC%9A10%E6%9C%8826%E6%97%A5+11%E7%82%B904%E5%88%86.m4a..mp3&_upt=5329c8f01730008276"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 md:justify-start">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipBackward}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipForward}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden flex-1 items-center gap-2 md:flex">
          <span className="w-12 text-sm text-muted-foreground">
            {formatTime(currentTime)}
          </span>

          <Slider
            defaultValue={[0]}
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="flex-1"
          />

          <span className="w-12 text-sm text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          <Slider
            defaultValue={[1]}
            value={[volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="hidden w-24 md:flex"
          />
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;
