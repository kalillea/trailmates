import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { retrieveFavorites } from "./utils";
import { Trip } from "../trip";

interface FavoritesProviderProps {
  children: any;
}

interface FavoritesContextValue {
  currentUserFavorites: Trip[];
  setCurrentUserFavorites: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export const FavoritesContext = React.createContext(
  {} as FavoritesContextValue,
);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [currentUserFavorites, setCurrentUserFavorites] = useState<Trip[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser === null) {
      setCurrentUserFavorites([]);
      return;
    }

    retrieveFavorites(currentUser.userUid, setCurrentUserFavorites);
  }, [currentUser]);

  const value = { currentUserFavorites, setCurrentUserFavorites };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
