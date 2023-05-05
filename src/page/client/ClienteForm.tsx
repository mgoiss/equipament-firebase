import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";

import { Client } from "../../core/type";
import { useClientes } from "../../core/services/firebase";

type ClienteFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function ClienteForm(props: ClienteFormProps) {
  const { setOpen } = props;
  const [status, setStatus] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Client>();
  const { createClient } = useClientes();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  const onSubmit = (data: Client) => {
    createClient(data.name, status);
    reset();
    setOpen(false);
  };

  return (
    <>
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
          <FormControlLabel
            control={<Switch checked={status} onChange={handleChange} />}
            label="Status"
          />
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
    </>
  );
}

export default ClienteForm;
