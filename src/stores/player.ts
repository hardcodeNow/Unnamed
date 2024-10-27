import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  url: string;
  actionTime: number;
};

type PlayerActions = {
  setUrl: (url: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
  setActionTime: (time: number) => void;
};

export const usePlayerStore = create<PlayerState & PlayerActions>()(
  immer((set) => ({
    // 初始状态
    url: "",
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    actionTime: 0,

    // Actions

    setActionTime: (time) => {
      set((state) => {
        state.actionTime = time;
      });
    },

    setUrl: (url) => {
      set((state) => {
        state.url = url;
      });
    },

    setIsPlaying: (isPlaying) =>
      set((state) => {
        state.isPlaying = isPlaying;
      }),

    setCurrentTime: (time) =>
      set((state) => {
        state.currentTime = time;
      }),

    setDuration: (duration) =>
      set((state) => {
        state.duration = duration;
      }),

    setVolume: (volume) =>
      set((state) => {
        state.volume = volume;
      }),

    setIsMuted: (isMuted) =>
      set((state) => {
        state.isMuted = isMuted;
      }),
  })),
);
