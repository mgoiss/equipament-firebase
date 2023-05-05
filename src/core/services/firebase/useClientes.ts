import {
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { Client } from "../../type";
import { noop } from "../../utils";

import { clientes } from "./firestore";

const useClientes = () => {
  const [clientesData, setClientesData] = useState<Client[]>([]);

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

  const createClient = async (name: string, status: boolean) => {
    const time = Timestamp.now();

    const { id } = await addDoc(clientes, {
      name,
      status,
      createdDate: time,
    });

    return id;
  };

  const updateClient = async (id: string, name?: string, status?: boolean) => {
    if (!name && status === undefined && status === null) return;
    const clienteRef = doc(clientes, id);

    await updateDoc(clienteRef, {
      ...(name && { name }),
      ...(status !== undefined && status !== null && { status }),
    });
  };

  const deleteClient = async (id: string) => {
    const clienteRef = doc(clientes, id);

    await deleteDoc(clienteRef);
  };

  return {
    clientesData,
    createClient,
    updateClient,
    deleteClient,
  };
};

export default useClientes;
