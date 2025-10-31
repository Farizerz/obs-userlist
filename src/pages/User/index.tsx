import React, { useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import TextField from "@/components/atoms/TextField";
import Button from "@/components/atoms/Button";
import NotFound from "@/components/atoms/NotFound";
import UserModal from "@/components/molecules/UserModal";
import Table from "@/components/organisms/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUsers, setUserDetail, initialDetails, setTotal } from "./slice";
import { useGetUserQuery } from "@/services/User";
import { useDebounce } from "@/hooks/useDebounce";
import type { ITableData } from "@/types/user";
import { API } from "@/utils/constants/url";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users, total } = useAppSelector((state) => state.UserSlice);
  const { data, isError } = useGetUserQuery();
  const [filtered, setFiltered] = useState<ITableData[]>([]);
  const [query, setQuery] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    if (data) {
      dispatch(setTotal(data.length));
      dispatch(setUsers(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const formatted = users.map(
        ({ id, name, username, email, phone, picture }) => ({
          id: Number(id),
          name,
          username,
          email,
          phone,
          picture,
          action: Number(id),
        })
      );
      setFiltered(formatted);
    }
  }, [users]);

  useEffect(() => {
    if (!users || users.length === 0) return;

    const searched = users
      .filter(
        ({ name, username }) =>
          name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          username.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .map(({ id, name, username, email, phone, picture }) => ({
        id: Number(id),
        name,
        username,
        email,
        phone,
        picture,
        action: Number(id),
      }));

    setFiltered(searched);
  }, [debouncedSearch, users]);

  const handleOpenAdd = () => {
    dispatch(
      setUserDetail({
        ...initialDetails,
        picture: `${API.IMAGES}/id/${total + 1}/256/256`,
      })
    );
    setOpenModal(true);
  };

  return (
    <Container className="py-[24px]">
      {isError ? (
        <NotFound />
      ) : (
        <div className="flex flex-col gap-4">
          <UserModal open={openModal} onClose={() => setOpenModal(false)} />
          <div className="w-full xs:grid xs:grid-cols-2 sm:flex sm:justify-end gap-4 ">
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              placeholder="Search name or username"
              size="small"
            />
            <Button
              title="Add User"
              variant="contained"
              onClick={handleOpenAdd}
              size="small"
            />
          </div>

          <Table
            data={filtered}
            isLoading={
              !isError &&
              users.length > 0 &&
              filtered.length === 0 &&
              !debouncedSearch
            }
          />
        </div>
      )}
    </Container>
  );
};

export default Users;
