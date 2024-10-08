import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useGetConversations = () => {
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const { authToken } = useAuthContext();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiUrl}/messages/conversations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authToken]);

  return { loading, conversations };
};

export default useGetConversations;
