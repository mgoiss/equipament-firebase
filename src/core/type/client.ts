import { Timestamp } from "firebase/firestore";

export type Client = {
  id?: string;
  name: string;
  status: boolean;
  createdDate?: Timestamp;
};
