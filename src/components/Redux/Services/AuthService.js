import axios from "../../../setup/axios";
export const Login= async (loginData) => {
    try {
      const response = await axios.post("/api/v1/auth/login", loginData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
