import { Box } from "@mui/material";
import styled from "styled-components";

export const BoxModal = styled(Box).attrs({
  component: "div",
  sx: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
})``;

export const BoxFormModal = styled(Box).attrs({
  component: "form",
  noValidate: true,
  autoComplete: "off",
})`
  margin-top: 40px;
`;
