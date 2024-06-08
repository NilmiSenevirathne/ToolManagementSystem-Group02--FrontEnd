import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DeleteUser, GetAllUsers } from "../../Service/userService";
import toast from "react-hot-toast";
import UpdateUserData from "./UpdateUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const columns = [
  { id: "userid", label: "User ID" },
  { id: "fullname", label: "Full Name" },
  { id: "imageurl", label: "Image URL" },
  { id: "nic", label: "NIC" },
  { id: "contact", label: "Contact" },
  { id: "username", label: "User Name" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions", align: "center" },
];

export default function UserManagement({ onChange }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenEdit = (id) => {
    setOpenEdit(true);
    console.log(users.filter((d) => d.userid === id)[0]);
    setSelectedUser(users.filter((d) => d.userid === id)[0]);
  };

  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setSelectedUser(users.filter((d) => d.userid === id)[0]);
  };

  const handleCloseEdit = () => {
    getAllUsers();
    setOpenEdit(false);
    onChange();
  };
  const handleCloseDelete = () => {
    getAllUsers();
    setOpenDelete(false);
  };

  const getAllUsers = async () => {
    await GetAllUsers()
      .then(({ data }) => {
        const users = data;
        setUsers(users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDeleteUser = async () => {
    await DeleteUser(selectedUser.userid)
      .then(({ data }) => {
        setOpenDelete(false);
        toast.success(data);
        getAllUsers();
        onChange();
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Paper>
      <TableContainer sx={{ height: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b> {column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length !== 0 ? (
              users
                .filter((u) => u.role !== "Admin")
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "imageurl") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                src={value}
                                alt="pp"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "25px",
                                  border: "1px solid",
                                }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "fullname") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.firstname + " " + row.lastname}
                            </TableCell>
                          );
                        }
                        if (column.id === "actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div style={{ display: "flex" }}>
                                <Button
                                  onClick={() => handleOpenEdit(row.userid)}
                                  startIcon={<EditIcon />}
                                  variant="contained"
                                  size="small"
                                  color="success"
                                  sx={{ marginRight: "1rem" }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => handleOpenDelete(row.userid)}
                                  startIcon={<DeleteIcon />}
                                  variant="contained"
                                  color="error"
                                  size="small"
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : column.id === "contact"
                              ? `+94${value}`
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={users.filter((u) => u.role !== "Admin").length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
        <DialogContent>
          <UpdateUserData user={selectedUser} onClose={handleCloseEdit} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={handleDeleteUser}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
