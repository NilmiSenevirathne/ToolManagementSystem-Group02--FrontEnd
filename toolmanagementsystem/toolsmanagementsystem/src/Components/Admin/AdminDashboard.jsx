import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSideBar";
import { Chart } from "primereact/chart";
import UserManagement from "./UserManagement";
import { GetAllUsers } from "../../Service/userService";
import AddNewUser from "./AddNewUser";

export default function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState({ name: "", value: "" });
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    await GetAllUsers()
      .then(({ data: users }) => {
        let managerCount = 0;
        let siteSupervisorCount = 0;
        let storeSupervisorCount = 0;
        [...users].forEach((user) => {
          if (user.role === "Manager") {
            managerCount++;
          }
          if (user.role === "SiteSupervisor") {
            siteSupervisorCount++;
          }
          if (user.role === "StockSupervisor") {
            storeSupervisorCount++;
          }
        });
        const data = {
          labels: ["Managers", "Site Supervisor", "Stock Supervisor"],
          datasets: [
            {
              label: "Employee Count",
              data: [managerCount, siteSupervisorCount, storeSupervisorCount],
              backgroundColor: [
                "rgb(153, 102, 255, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(153, 102, 255)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
              ],
              borderWidth: 1,
            },
          ],
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      })
      .catch((err) => console.log(err));
  };

  const getSelectedItem = (value, name) => {
    setSelectedItem({ name: name, value: value });
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar getSelectedItem={getSelectedItem} />
      <div style={{ marginLeft: "30vh", padding: "2rem", width: "100%" }}>
        <h1>{selectedItem.name}</h1>

        {selectedItem.value === "1" ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <div style={{ width: "80%" }}>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
          </div>
        ) : selectedItem.value === "2" ? (
          <div style={{ marginTop: "4rem" }}>
            <UserManagement onChange = {getAllUsers} />
          </div>
        ) : (
          selectedItem.value === "3" && (
            <div>
              <AddNewUser />
            </div>
          )
        )}
      </div>
    </div>
  );
}
