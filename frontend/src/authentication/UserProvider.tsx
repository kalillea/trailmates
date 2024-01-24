import React, { useEffect, useState } from "react";
import { getUserData, putUserData, UserData } from "./firestore";
import { auth } from "../firebase/config";

export interface User extends UserData {
  userUid: string;
  email: string;
  creationDate: string;
}

interface UserContextValue {
  currentUser: User | null;
  updateCurrentUser: (updatedUser: User) => void;
}

export const UserContext = React.createContext<UserContextValue>(
  {} as UserContextValue,
);

interface UserProviderProps {
  children: any;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (
        firebaseUser === null ||
        firebaseUser.email === null ||
        firebaseUser.metadata.creationTime === undefined
      ) {
        setCurrentUser(null);
        return;
      }

      getUserData(firebaseUser.uid).then((userData: UserData) => {
        if (firebaseUser.email === null) return;
        const creationDate = firebaseUser.metadata.creationTime;
        if (creationDate === undefined) return;
        setCurrentUser({
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
          creationDate: creationDate,
          ...userData,
        });
      });
    });
  }, []);

  const updateCurrentUser = async (updatedUser: User) => {
    await putUserData(currentUser!.userUid, updatedUser)
      .then(() => setCurrentUser(updatedUser))
      .catch((err) => alert(err));
  };

  const value = { currentUser, updateCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
