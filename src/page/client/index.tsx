import {
  GridActionsCellItem,
  GridCellEditStopParams,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Box,
  Container,
  Switch,
  Button,
} from "@mui/material";
import { Table } from "../../core/components";
import { useClientes } from "../../core/services/firebase";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import ModalCreation from "../../core/components/ModalCreation/ModalCreation";
import { useForm } from "react-hook-form";
import { Client } from "../../core/type";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

const PageClient = () => {
  const { clientesData, createClient, updateClient, deleteClient } =
    useClientes();

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
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value === "Ativo"}
          onClick={() =>
            updateClient(
              params.row.id,
              undefined,
              params.value === "Ativo" ? "Inativo" : "Ativo"
            )
          }
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
  const handleClose = () => {
    setValue("id", "");
    setValue("name", "");
    setValue("status", "Ativo");
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Client>();
  const [status, setStatus] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const onSubmit = (data: Client) => {
    createClient(data.name, data.status);
    handleClose();
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log(newRow);
    /*if (!newRow.id) return;

    updateClient(newRow.id, newRow.name, newRow.status);*/
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
          onClickModal={() => handleOpen()}
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
        handleClose={() => handleClose()}
      >
        <Box
          sx={{
            mb: 4,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: 300 }}
            id="nomeCLiente"
            label="Nome Cliente"
            {...register("name", {
              required: "Campo obrigatório",
              minLength: {
                value: 2,
                message: "O nome deve ter no minimo 3 caracteres",
              },
            })}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
          />
          <FormControl
            sx={{ m: 1, minWidth: 100 }}
            error={errors.status ? true : false}
          >
            <InputLabel id="status-cliente-label">Status</InputLabel>
            <Select
              sx={{ width: 150 }}
              label="Status"
              labelId="status-cliente-label"
              id="status-cliente"
              value={status}
              {...register("status", {
                required: "Campo obrigatório",
              })}
              onChange={handleChange}
            >
              <MenuItem value={"Ativo"}>Ativo</MenuItem>
              <MenuItem value={"Inativo"}>Inativo</MenuItem>
            </Select>
            {errors.status && (
              <FormHelperText>{errors.status.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Button
          sx={{ width: 113, height: 36 }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Salvar
        </Button>
      </ModalCreation>
    </>
  );
};

export default PageClient;
