import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

interface IModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const BaseModal: React.FC<IModal> = ({
  open,
  onClose,
  children,
  className,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div className={className}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
