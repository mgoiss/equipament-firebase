import { CardHeader, Box, Modal, Divider } from "@mui/material";
import { useState } from "react";
import { BoxFormModal, BoxModal } from "./ModalCreation.styles";

type Props = {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const ModalCreation = ({ title, open, handleClose, children }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxModal>
        <CardHeader title={title} />
        <Divider />
        <BoxFormModal>{children}</BoxFormModal>
      </BoxModal>
    </Modal>
  );
};

export default ModalCreation;
