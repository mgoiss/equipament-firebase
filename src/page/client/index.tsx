import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Table } from "../../core/components";
import { Box, Container, Modal, Switch, Typography } from "@mui/material";
import { useClientes } from "../../core/services/firebase";
import { format } from "date-fns";
import { useState } from "react";
import ModalCreation from "../../core/components/ModalCreation/ModalCreation";
import { useForm } from "react-hook-form";
import { Client } from "../../core/type";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 2 },
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
  {
    field: "createdDate",
    headerName: "Data de Criação",
    flex: 2,
    valueGetter: ({ value }) => format(value.toDate(), "dd/MM/yyyy HH:mm:ss"),
  },
];

const PageClient = () => {
  const { clientesData } = useClientes();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValue("id", "");
    setValue("name", "");
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Client>();
  const [status, setStatus] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const onSubmit = (data: Client) => console.log(data);

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
