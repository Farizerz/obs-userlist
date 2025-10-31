import * as React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useAppDispatch, useAppSelector } from "@/store";
import Button from "@/components/atoms/Button";
import { setUsers, setUserDetail, initialDetails } from "@/pages/User/slice";
import type { ITableData } from "@/types/user";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import UserModal from "@/components/molecules/UserModal";
import { useOpenToast } from "@/hooks/useOpenToast";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof ITableData>(
  order: Order,
  orderBy: Key
) {
  return order === "desc"
    ? (a: ITableData, b: ITableData) => descendingComparator(a, b, orderBy)
    : (a: ITableData, b: ITableData) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof ITableData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "username", numeric: false, label: "Username" },
  { id: "name", numeric: false, label: "Name" },
  { id: "email", numeric: false, label: "Email" },
  { id: "phone", numeric: false, label: "Phone" },
  { id: "action", numeric: false, label: "Action" },
];

export default function EnhancedTable({
  data,
  isLoading,
}: {
  data: ITableData[];
  isLoading: boolean;
}) {
  const dispatch = useAppDispatch();
  const openToast = useOpenToast();

  const { users, userDetail } = useAppSelector((state) => state.UserSlice);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ITableData>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState({
    user: false,
    confirm: false,
  });

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof ITableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetail = (id: number) => {
    const user = users.find((item) => item.id === id);
    if (!user) return;
    dispatch(setUserDetail(user));
  };

  const handleDelete = (id: number) => {
    const user = users.filter((item) => item.id !== id);
    dispatch(setUsers(user));
    dispatch(setUserDetail(initialDetails));
    setOpenModal({ ...openModal, confirm: false });
    openToast("Data has been deleted.");
  };

  const visibleRows = React.useMemo(
    () =>
      [...data]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <ConfirmModal
        title={`Delete ${userDetail.username}?`}
        open={openModal.confirm}
        onClose={() => setOpenModal({ ...openModal, confirm: false })}
        onConfirm={() => handleDelete(userDetail.id)}
      />
      <UserModal
        open={openModal.user}
        onClose={() => setOpenModal({ ...openModal, user: false })}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow className="bg-lightgray3 text-lightgray">
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.id === "action" ? "center" : "left"}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      {headCell.id === "action" || headCell.id === "picture" ? (
                        headCell.label
                      ) : (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={(e) => handleRequestSort(e, headCell.id)}
                        >
                          <p
                            className={
                              headCell.id === "username" ? "pl-10" : ""
                            }
                          >
                            {headCell.label}
                          </p>
                        </TableSortLabel>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow hover key={index}>
                        <TableCell align="left">
                          <div className="flex flex-row gap-2 items-center">
                            <Skeleton
                              variant="rectangular"
                              width={60}
                              height={32}
                            />
                            <Skeleton variant="text" />
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="left">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="left">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton
                            variant="rectangular"
                            width={60}
                            height={32}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : visibleRows.map((row) => (
                      <TableRow hover key={row.id}>
                        <TableCell align="left" className="flex flex-row gap-2">
                          <div className="flex flex-row gap-2 items-center">
                            <img
                              src={row.picture}
                              alt={row.username}
                              className="rounded-full w-[32px] h-[32px]"
                            />
                            <p>{row.username}</p>
                          </div>
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          {row.email.toLowerCase()}
                        </TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="center">
                          <div className="flex flex-row justify-center gap-2">
                            <Button
                              startIcon={<DeleteIcon />}
                              title="Delete"
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={() => {
                                handleDetail(row.id);
                                setOpenModal({ ...openModal, confirm: true });
                              }}
                            />
                            <Button
                              title="Details"
                              variant="contained"
                              size="small"
                              onClick={() => {
                                handleDetail(row.id);
                                setOpenModal({ ...openModal, user: true });
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
