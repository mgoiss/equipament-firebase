import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Client } from "../../core/type";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useState } from "react";

const PageClient = () => {
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="nomeCLiente"
        label="Nome Cliente"
        {...register("nome", {
          required: "Campo obrigatório",
          minLength: {
            value: 2,
            message: "O nome deve ter no minimo 3 caracteres",
          },
        })}
        error={errors.nome ? true : false}
        helperText={errors.nome ? errors.nome.message : ""}
      />
      <FormControl
        sx={{ m: 1, minWidth: 100 }}
        error={errors.status ? true : false}
      >
        <InputLabel id="status-cliente-label">Status</InputLabel>
        <Select
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

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Salvar
      </Button>
    </Box>
  );
};

export default PageClient;
