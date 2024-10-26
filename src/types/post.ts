import {type Card} from "@/types/card";

export type Post = {
  id: number;
  name: string;
  outline: string;
  createdAt: Date;
  updatedAt: Date | null;
  card?: Card[];
};
