import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const userContext = createContext();

export const UserProvider = ({ children }) => {

const [users, setUsers] = useState([])
const [countUsers, setcountUsers] = useState(0)
const [loading, setLoading] = useState(false)
const [refresh, setRefresh] = useState(false)

  async function getAllUser() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getUsers`,{
        headers:{
          token:localStorage.getItem("token")
        }
      });

      if(data.success){
        setLoading(false)
        setUsers(data.data);
        setcountUsers(data.count)
        console.log("countUsers",countUsers)
        console.log("users",users)

      }
     
     
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    getAllUser()
  }, [refresh]);

  return (
    <userContext.Provider value={{getAllUser,users,setRefresh,countUsers,loading}}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
