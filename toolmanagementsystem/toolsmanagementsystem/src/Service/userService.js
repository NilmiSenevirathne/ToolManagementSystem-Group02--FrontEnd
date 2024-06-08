import http from "./httpService";

const endpoint = "/user";

export async function GetUserById(id) {
  return await http.get(endpoint + `/getUser/${id}`);
}
export async function GetAllUsers() {
  return await http.get(endpoint + "/getAllUsers");
}
export async function CreateNewUser(user) {
  return await http.post(endpoint + "/createNewUser", user);
}
export async function UpdateUser(user) {
  return await http.put(endpoint + "/updateUser", user);
}
export async function DeleteUser(id) {
  return await http.delete(endpoint + `/deleteUser/${id}`);
}
