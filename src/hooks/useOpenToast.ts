import { useAppDispatch } from "@/store";
import { setOpen, setMessage } from "@/components/atoms/Toast/slice";

export const useOpenToast = () => {
  const dispatch = useAppDispatch();

  return (message: string) => {
    dispatch(setMessage(message));
    dispatch(setOpen(true));
  };
};
