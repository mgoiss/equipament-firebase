import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Table } from "../../core/components";
import { Container, Switch } from "@mui/material";
import { Status } from "../../core/type";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Nome",
    flex: 4,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Switch checked={params.value == "Ativo"} />
    ),
  },
];

const rows = [
  { id: 1, name: "Matheus", status: "Ativo" },
  { id: 2, name: "Felipe Otario", status: "Inativo" },
  { id: 3, name: "Matheus", status: "Ativo" },
  { id: 4, name: "Felipe Otario", status: "Inativo" },
  { id: 5, name: "Matheus", status: "Ativo" },
  { id: 6, name: "Felipe Otario", status: "Inativo" },
  { id: 7, name: "Matheus", status: "Ativo" },
  { id: 8, name: "Felipe Otario", status: "Inativo" },
  { id: 9, name: "Matheus", status: "Ativo" },
  { id: 10, name: "Felipe Otario", status: "Inativo" },
  { id: 11, name: "Matheus", status: "Ativo" },
  { id: 12, name: "Felipe Otario", status: "Inativo" },
];

const PageClient = () => {
  return (
    <Container maxWidth="lg">
      <Table title="Cliente" columns={columns} rows={rows} />
    </Container>
  );
};

export default PageClient;
