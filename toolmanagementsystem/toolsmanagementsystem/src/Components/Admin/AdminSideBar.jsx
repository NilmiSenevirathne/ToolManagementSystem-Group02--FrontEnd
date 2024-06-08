import React, { useEffect, useState } from "react";
import { FaTh, FaCartPlus, FaBriefcase } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import userPic from "../../images/user1.jpg";
import "./AdminSideBar.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AdminSidebar = ({ getSelectedItem }) => {
  const [selectedItem, setSelectedItem] = useState({
    value: "1",
    name: "Admin Dashboard",
  });
  const role = "Admin";

  useEffect(() => {
    getSelectedItem(selectedItem.value, selectedItem.name)
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    getSelectedItem(item.value, item.name);
  };

  const menuItem = [
    {
      value: "1",
      name: "Admin Dashboard",
      icon: <FaTh />,
    },
    {
      value: "2",
      name: "Manage Users",
      icon: <PeopleAltIcon />,
    },
    {
      value: "3",
      name: "Create New User",
      icon: <PersonAddIcon />,
    },
    {
      value: "4",
      name: "Logout",
      icon: <RiLogoutCircleRLine />,
    },
  ];

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-companyLogo">
          <h4 className="admin-logo">Dilum BMK Engineers (Pvt) Ltd</h4>

          <div className="admin-details">
            <img className="admin-user" src={userPic} alt="userPic" />
            <h5 className="admin-name">Mr.Dilum Samaranayake</h5>
            <h5 className="admin-role">
              <b>{role}</b>
            </h5>
          </div>
        </div>
        <br />
        <br />
        <div>
          {menuItem.map((item, index) => (
            <div
              className="admin-side-item"
              style={
                item.value === "4"
                  ? { display: "flex", paddingLeft: "4vh", marginTop: "70%" }
                  : { display: "flex", paddingLeft: "4vh" }
              }
              onClick={() => {
                if (item.value === "4"){
                  window.location = "/"
                }else{
                  handleSelectItem(item);
                }
              }}
            >
              <div
                key={index}
                className="admin-link"
                activeClassName="admin-active"
              >
                <div className="admin-icon">{item.icon}</div>
                <div className="admin-text">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
