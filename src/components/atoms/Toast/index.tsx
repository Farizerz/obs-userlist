import React from "react";
import Snackbar from "@mui/material/Snackbar";
import InfoIcon from "@mui/icons-material/Info";
import { useAppDispatch, useAppSelector } from "@/store";
import { setOpen, setMessage } from "./slice";

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, message } = useAppSelector((state) => state.ToastSlice);

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(setMessage(""));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={() => handleClose()}
    >
      <div className="xs:w-[80%] sm:w-[365px] h-full shadow-[0_2px_15px_1px_rgba(0,0,0,0.1)] rounded-sm flex flex-row bg-white gap-2 p-4 items-center z-300">
        <InfoIcon color="primary" />
        <p>{message}</p>
      </div>
    </Snackbar>
  );
};

export default Toast;
