import {
  GridActionsCellItem,
  GridColDef,
  GridRowModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { Container, Switch } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { Table } from "../../core/components";
import { useClientes } from "../../core/services/firebase";
import ModalCreation from "../../core/components/ModalCreation/ModalCreation";

import ClienteForm from "./ClienteForm";

const PageClient = () => {
  const { clientesData, updateClient, deleteClient } = useClientes();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 2 },
    {
      field: "name",
      headerName: "Nome",
      flex: 4,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value, row }) => (
        <Switch
          checked={value}
          onClick={() => updateClient(row.id, undefined, !value)}
        />
      ),
    },
    {
      field: "createdDate",
      headerName: "Data de Criação",
      flex: 2,
      valueGetter: ({ value }) => format(value.toDate(), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => handleDelete(params.id.toString())}
          label="Delete"
        />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const processRowUpdate = (newRow: GridRowModel) => {
    if (!newRow || !newRow.id) return;
    updateClient(newRow.id, newRow.name);
    return newRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.log({ children: error.message, severity: "error" });
  };

  const handleDelete = async (id: string) => {
    deleteClient(id);
  };

  return (
    <>
      <Container maxWidth="lg" className="baseContainer">
        <Table
          title="Cliente"
          columns={columns}
          rows={clientesData ?? []}
          getRowId={(params) => params.id}
          textButton="Adicionar"
          onClickModal={handleOpen}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Container>
      <ModalCreation
        title="Cadastro de Cliente"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <ClienteForm setOpen={setOpen} />
      </ModalCreation>
    </>
  );
};

export default PageClient;
