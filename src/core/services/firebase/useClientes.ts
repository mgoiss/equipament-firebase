import { useState, useEffect } from "react";
import { Client } from "../../type";
import { noop } from "../../utils";
import {
  Timestamp,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { clientes } from "./firestore";

const useClientes = () => {
  const [clientesData, setClientesData] = useState<Client[]>();

  useEffect(() => {
    let unsub = noop;
    const q = query(clientes, orderBy("createdDate", "desc"));
    unsub = onSnapshot(q, (snapshot) => {
      const clientesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClientesData(clientesData);
    });
    return () => unsub();
  }, []);

  const createClient = async (name: string, status: "Ativo" | "Inativo") => {
    const time = Timestamp.now();

    const { id } = await addDoc(clientes, {
      name,
      status,
      createdDate: time,
    });

    return id;
  };

  return {
    clientesData,
    createClient,
  };
};

export default useClientes;
