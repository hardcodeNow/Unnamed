// audioStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// types.ts
export interface AudioState {
  isRecording: boolean;
  audioBase64: string | null;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
}

export interface AudioActions {
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
  setMediaRecorder: (recorder: MediaRecorder) => void;
  addAudioChunk: (chunk: Blob) => void;
  setAudioBase64: (base64: string) => void;
  setIsRecording: (isRecording: boolean) => void;
}

const initialState: AudioState = {
  isRecording: false,
  audioBase64: null,
  mediaRecorder: null,
  audioChunks: [],
};

const useAudioStore = create<AudioState & AudioActions>()(
  immer((set) => ({
    ...initialState,

    setMediaRecorder: (recorder: MediaRecorder) =>
      set((state) => {
        state.mediaRecorder = recorder;
      }),

    setIsRecording: (isRecording: boolean) =>
      set((state) => {
        state.isRecording = isRecording;
      }),

    addAudioChunk: (chunk: Blob) =>
      set((state) => {
        state.audioChunks.push(chunk);
      }),

    setAudioBase64: (base64: string) =>
      set((state) => {
        state.audioBase64 = base64;
      }),

    startRecording: async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          if (e.data.size > 0) {
            useAudioStore.getState().addAudioChunk(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const { audioChunks } = useAudioStore.getState();
          const blob = new Blob(audioChunks, { type: "audio/wav" });
          const reader = new FileReader();

          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            useAudioStore.getState().setAudioBase64(base64data);
          };
        };

        mediaRecorder.start();
        set((state) => {
          state.mediaRecorder = mediaRecorder;
          state.isRecording = true;
          state.audioChunks = [];
        });
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    },

    stopRecording: () =>
      set((state) => {
        if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
          state.mediaRecorder.stop();
          state.mediaRecorder.stream
            .getTracks()
            .forEach((track) => track.stop());
          state.isRecording = false;
        }
      }),

    clearRecording: () =>
      set((state) => {
        state.audioBase64 = null;
        state.audioChunks = [];
      }),
  })),
);

export default useAudioStore;
