import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const fetchDataUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
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
            const data = await response.json();
            setCities(
                users.map((user) => (user.id === id ? { ...user, ...data } : user))
            );
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
            setUsers((prevUsers) => [...prevUsers, newUser]); // Assuming you have a state `cities` that tracks your cities
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, []);

    return (
        <UserContext.Provider value={{ users, updateUser, deleteUser, addUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
