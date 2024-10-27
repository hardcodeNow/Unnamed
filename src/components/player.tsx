/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useRef, useState } from "react";
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
import { usePlayerStore } from "@/stores/player";
export const AudioPlayer = () => {
  const {
    url,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    setIsMuted,
    setVolume,
    setDuration,
    setIsPlaying,
    setCurrentTime,
  } = usePlayerStore();
  const audioRef = useRef(null);

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

  const handleError = () => {
    setDuration(0);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value) => {
    setCurrentTime(value[0]);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
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
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
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
