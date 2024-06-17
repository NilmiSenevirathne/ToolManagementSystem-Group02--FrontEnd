import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { CreateNewUser } from "../../Service/userService";
import toast from "react-hot-toast";
import { UploadImage } from "../../Service/imageService";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddNewUser() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    nic: "",
    contact: "",
    role: "",
    password: "",
    conPassword: "",
    imageurl: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      setSelectedPhoto(file);
      setPhotoUrl(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async (url) => {
    userData.username = userData.email;
    userData.imageurl = url;
    await CreateNewUser(userData)
      .then(({ data }) => {
        setOpen(false);
        toast.success(data);
        setTimeout(() => {
            window.location = "/admindashboard";
        }, 500);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.conPassword) {
      toast.error("Passwords are not matching");
    } else {
      setOpen(true);
      const formData = new FormData();
      if(selectedPhoto === null){
        handleSave(null);
      }else{
        formData.append("file", selectedPhoto);

      await UploadImage(formData)
        .then(({ data }) => {
          handleSave(data.url);
        })
        .catch((err) => toast.error(err.response.data));
      }
    }
  };

  return (
    <div>
      <Card sx={{ padding: "2rem", marginX: "5rem" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", margin: "2rem" }}>
            <div
              style={{
                backgroundColor: "#E9EAEC",
                width: "20vh",
                height: "20vh",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "20vh",
                border: "1px solid #C7C9CE",
                cursor: "pointer",
                marginRight: "2rem",
                borderRadius: "10vh",
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
                id="photoInput"
              />
              {selectedPhoto ? (
                <img
                  src={photoUrl}
                  alt="Uploaded"
                  style={{
                    minWidth: "100%",
                    minHeight: "20vh",
                    maxHeight: "20vh",
                    borderRadius: "10vh",
                    border: "1px solid ",
                  }}
                ></img>
              ) : (
                <label
                  htmlFor="photoInput"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CameraEnhanceIcon size={20} />
                  <span style={{ marginLeft: "10px" }}>Add Photo</span>
                </label>
              )}
              {photoUrl !== null && (
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  style={{ marginTop: "-70%" }}
                  onClick={() => {
                    setPhotoUrl(null);
                    setSelectedPhoto(null);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
          <br />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-label">User Role</InputLabel>
            <Select
              labelId="role-label"
              value={userData.role}
              onChange={handleOnChange}
              name="role"
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="SiteSupervisor">Site Supervisor</MenuItem>
              <MenuItem value="StockSupervisor">Stock Supervisor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            name="firstname"
            value={userData.firstname}
            fullWidth
            label="First Name"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="lastname"
            value={userData.lastname}
            fullWidth
            label="Last Name"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="email"
            type="email"
            value={userData.email}
            fullWidth
            label="Email"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="nic"
            value={userData.nic}
            fullWidth
            label="NIC Number"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="contact"
            value={userData.contact}
            fullWidth
            type="number"
            placeholder="eg: 771234567"
            label="Phone Number"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="password"
            value={userData.password}
            fullWidth
            label="Password"
            type="password"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            name="conPassword"
            value={userData.conPassword}
            fullWidth
            label="Confirm Password"
            type="password"
            onChange={handleOnChange}
            margin="normal"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <Button
              type="reset"
              variant="contained"
              color="error"
              sx={{ marginRight: "2rem" }}
              onClick={() => {
                setUserData({
                  firstname: "",
                  lastname: "",
                  email: "",
                  nic: "",
                  contact: "",
                  role: "",
                });
              }}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </div>
        </form>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
