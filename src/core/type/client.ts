import { Timestamp } from "firebase/firestore";

export type Client = {
  id?: string;
  name: string;
  status: "Ativo" | "Inativo";
  createdDate?: Timestamp;
};
