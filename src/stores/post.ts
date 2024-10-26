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
    posts: [],
    setPosts: (posts) => set((state) => void (state.posts = posts)),
    addPost: (post) => set((state) => void state.posts.push(post)),
    deletePost: (id) =>
      set(
        (state) =>
          void (state.posts = state.posts.filter((post) => post.id !== id)),
      ),
  })),
);
