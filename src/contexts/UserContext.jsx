import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState({});
  const [userLoginEmail, setUserLoginEmail] = useState();

  const fetchDataUser = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      console.log(data);
      const userData = data.filter((user) => {
        return user.email === email;
      });

      setUserLogin(userData);
      setUserLoginEmail(userLogin.email);
      navigate("/");
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const updateUser = async (id, updatedUserData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
      Navigate("/"); // Redirect user after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to create new user");
      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (userLogin && userLogin.email === userLoginEmail) {
      console.log("Login successful");
    } else {
      console.error("Login failed:");
    }
  }, [userLogin]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        setUserLogin,
        users,
        updateUser,
        deleteUser,
        addUser,
        fetchDataUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
