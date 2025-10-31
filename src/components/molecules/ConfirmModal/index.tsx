import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import BaseModal from "@/components/atoms/BaseModal";
import Button from "@/components/atoms/Button";

interface IConfirmModal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const ConfirmModal: React.FC<IConfirmModal> = ({
  open,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      className="w-[80%] sm:w-[350px] h-[200px] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none rounded-sm bg-white p-4 flex flex-col justify-between"
    >
      <section className="flex flex-row items-center justify-between gap-8">
        <h1 className="py-2">{title ?? "Are you sure?"}</h1>
        <CloseIcon className="cursor-pointer" onClick={() => onClose()} />
      </section>
      <div className="w-full grid grid-cols-2 gap-2">
        <Button
          title="Cancel"
          variant="outlined"
          color="error"
          onClick={() => onClose()}
        />
        <Button
          title="Confirm"
          variant="contained"
          color="error"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        />
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
