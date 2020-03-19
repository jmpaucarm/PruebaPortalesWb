import { useState, useEffect } from "react";
import { getAllUsers } from "../communication/user";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingUsers, setLoadingUsers] = useState(true);
  useEffect(() => {
      
  const fetchData = async () => {
      try {
        const coreResponse = await getAllUsers();
        if (coreResponse.state) {
          let i = 0;
          var transformUsers = coreResponse.data.map(function(usr) {
            return { ...usr, id: i++ };
          });

          setUsers(transformUsers);
        } else setUsers([]);
        setLoadingUsers(false);
      } catch (error) {
        setError(error);
        setLoadingUsers(false);
      }
    };
    fetchData();
  }, []);//si pasamos un array vacio solo solo sera renderizadao una sola vez similar al component didmount es decir no se actualizara en cada
  return { users, setUsers, isLoadingUsers, error };
};

export default useUsers;
