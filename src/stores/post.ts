import { type Post } from "@/types/post";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type PostState = {
  posts: Post[];
};

type PostActions = {
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
};

export const usePostStore = create<PostState & PostActions>()(
  immer((set) => ({
    posts: [
      {
        id: "1",
        title: "黑客松项目组一",
        description: "",
      },
      {
        id: "2",
        title: "投资人 - 张三对话",
        description: "",
      },
      {
        id: "3",
        title: "张博面试介绍",
        description: "",
      },
    ],
    addPost: (post) => set((state) => void state.posts.push(post)),
    deletePost: (id) =>
      set(
        (state) =>
          void (state.posts = state.posts.filter((post) => post.id !== id)),
      ),
  })),
);
