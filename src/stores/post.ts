import { type Post } from "@/types/post";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type PostState = {
  posts: Post[];
};

type PostActions = {
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  deletePost: (id: number) => void;
};

export const usePostStore = create<PostState & PostActions>()(
  immer((set) => ({
    posts: [
      {
        id: 1,
        name: "黑客松项目组一",
        outline: "",
        card: undefined,
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        id: 2,
        name: "投资人 - 张三对话",
        outline: "",
        card: undefined,
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        id: 3,
        name: "张博面试介绍",
        outline: "",
        card: undefined,
        createdAt: new Date(),
        updatedAt: null,
      },
    ],
    setPosts: (posts) => set((state) => void (state.posts = posts)),
    addPost: (post) => set((state) => void state.posts.push(post)),
    deletePost: (id) =>
      set(
        (state) =>
          void (state.posts = state.posts.filter((post) => post.id !== id)),
      ),
  })),
);
