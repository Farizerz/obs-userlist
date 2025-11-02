import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store";
import Button from "@/components/atoms/Button";
import TextField from "@/components/atoms/TextField";
import BaseModal from "@/components/atoms/BaseModal";
import {
  initialDetails,
  setTotal,
  setUserDetail,
  setUsers,
} from "@/pages/User/slice";
import type { IUser } from "@/types/user";
import { useOpenToast } from "@/hooks/useOpenToast";
import { userSchema } from "@/validation/userSchema";

interface IUserModal {
  open: boolean;
  onClose: () => void;
}

const UserModal: React.FC<IUserModal> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { total, users, userDetail } = useAppSelector(
    (state) => state.UserSlice
  );
  const openToast = useOpenToast();

  const [formData, setFormData] = useState<IUser>(initialDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(userDetail);
  }, [userDetail]);

  const handleClose = () => {
    onClose();
    dispatch(setUserDetail(initialDetails));
    setErrors({});
  };

  const handleValidate = () => {
    const result = userSchema.safeParse(formData);
    if (!result.success) {
      const flatErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        if (value && value.length > 0) flatErrors[key] = value[0];
      }
      setErrors(flatErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleAdd = () => {
    if (!handleValidate()) return;
    const newUser = { ...formData, id: total + 1 };
    dispatch(setUsers([...users, newUser]));
    dispatch(setTotal(total + 1));
    handleClose();
    openToast(`${formData.username} has been added.`);
  };

  const handleEdit = () => {
    if (!handleValidate()) return;
    const updatedUsers = users.map((user) =>
      user.id === formData.id ? formData : user
    );
    dispatch(setUsers(updatedUsers));
    handleClose();
    openToast(`${formData.username} has been updated.`);
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      className="xs:w-[90%] sm:w-[90%] lg:w-[70%] h-[90%] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none rounded-sm bg-white p-4 flex flex-col gap-2"
    >
      <section className="flex flex-row items-center justify-between">
        <h1 className="py-2">{formData.id ? "User Details" : "Add User"}</h1>
        <CloseIcon className="cursor-pointer" onClick={handleClose} />
      </section>

      <section className="w-full flex xs:flex-col sm:flex-row gap-2">
        <div className="flex flex-row items-center justify-center sm:hidden">
          {formData.picture && (
            <img
              src={formData.picture}
              className="w-[128px] h-[128px] rounded-md m-4"
            />
          )}
        </div>
        <div className="xs:w-full sm:w-full flex flex-col gap-2">
          <TextField
            label="Name"
            value={formData.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Username"
            value={formData.username}
            error={!!errors.username}
            helperText={errors.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email.toLowerCase()}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.toLowerCase(),
              })
            }
          />
          <TextField
            label="Phone"
            value={formData.phone}
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <TextField
            label="Website"
            value={formData.website}
            error={!!errors.website}
            helperText={errors.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row items-center justify-center xs:hidden sm:block mr-[30px]">
          {formData.picture && (
            <img
              src={formData.picture}
              className="w-[256px] h-[256px] rounded-md m-4"
            />
          )}
        </div>
      </section>

      <section className="border-1 rounded-sm border-gray p-4 flex flex-col gap-2">
        <p className="text-darkgray text-[15px]">Address</p>
        <div className="flex flex-col gap-2 pl-2">
          <TextField
            label="Street"
            variant="standard"
            error={!!errors.address}
            helperText={errors.address}
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  street: e.target.value,
                },
              })
            }
          />
          <TextField
            label="Suite"
            variant="standard"
            value={formData.address.suite}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  suite: e.target.value,
                },
              })
            }
          />
          <TextField
            label="City"
            error={!!errors.address}
            helperText={!!errors.address && "City is required"}
            variant="standard"
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              })
            }
          />
          <TextField
            label="Zipcode"
            error={!!errors.address}
            helperText={!!errors.address && "Zipcode is required"}
            variant="standard"
            value={formData.address.zipcode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  zipcode: e.target.value,
                },
              })
            }
          />
          <div className="w-full grid grid-cols-2 gap-2">
            <TextField
              label="Latitude"
              variant="standard"
              value={formData.address.geo.lat}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: {
                      ...formData.address.geo,
                      lat: e.target.value,
                    },
                  },
                })
              }
            />
            <TextField
              label="Longitude"
              variant="standard"
              value={formData.address.geo.lng}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: {
                      ...formData.address.geo,
                      lng: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </section>

      <section className="border-1 rounded-sm border-gray p-4 flex flex-col gap-2">
        <p className="text-darkgray text-[15px]">Company</p>
        <div className="flex flex-col gap-2 pl-2">
          <TextField
            label="Company Name"
            error={!!errors.company}
            helperText={errors.company}
            variant="standard"
            value={formData.company.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: {
                  ...formData.company,
                  name: e.target.value,
                },
              })
            }
          />
          <TextField
            label="Catchphrase"
            variant="standard"
            value={formData.company.catchPhrase}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: {
                  ...formData.company,
                  catchPhrase: e.target.value,
                },
              })
            }
          />
          <TextField
            label="BS"
            variant="standard"
            value={formData.company.bs}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: {
                  ...formData.company,
                  bs: e.target.value,
                },
              })
            }
          />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2">
        <Button
          title="Cancel"
          variant="outlined"
          color="error"
          onClick={handleClose}
        />
        <Button
          title="Submit"
          variant="contained"
          onClick={() => (formData.id ? handleEdit() : handleAdd())}
        />
      </section>
    </BaseModal>
  );
};

export default UserModal;
