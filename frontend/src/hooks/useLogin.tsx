import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser,authToken } = useAuthContext();
  const login = async (userName: string, password: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const res = await fetch(
        `${apiUrl}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },

          body: JSON.stringify({ userName, password }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
