import { createContext, useState } from "react";
import { getUserByUsername } from "../../utils/api";
import useApiRequest from "../hooks/useApiRequest";

export const currentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { data: currentUser } = useApiRequest(getUserByUsername, "weegembump");

  return (
    <>
      <currentUserContext.Provider value={{ currentUser }}>
        {children}
      </currentUserContext.Provider>
    </>
  );
};
