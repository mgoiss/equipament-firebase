import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { app } from "./config";
import { Client } from "../../type";

const firestore = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(firestore, collectionName) as CollectionReference<T>;

export const clientes = createCollection<Client>("Clientes");
