import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import { putUserData } from "./firestore";
import { auth } from "../firebase/config";

export enum AuthError {
  EMAIL_IN_USE = "En bruker med denne e-posten eksisterer allerede.",
  INVALID_EMAIL_OR_PASSWORD = "Feil e-post eller passord.",
  SHORT_PASSWORD = "Passordet må være minst 6 tegn.",
  OTHER = "Noe gikk galt.",
}

const toAuthError = (error: FirebaseError) =>
  ({
    "auth/email-already-in-use": AuthError.EMAIL_IN_USE,
    "auth/invalid-email": AuthError.INVALID_EMAIL_OR_PASSWORD,
    "auth/weak-password": AuthError.SHORT_PASSWORD,
    "auth/user-not-found": AuthError.INVALID_EMAIL_OR_PASSWORD,
    "auth/wrong-password": AuthError.INVALID_EMAIL_OR_PASSWORD,
  }[error.code] || AuthError.OTHER);

export const signUp = async (
  email: string,
  password: string,
  name: string,
  userType = "User",
): Promise<AuthError | undefined> => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userUid = userCredentials.user.uid;
    try {
      const res = await putUserData(userUid, {
        name: name,
        userType: userType,
      });
      if (res.status === 500) {
        return AuthError.OTHER;
      }
      console.log(`Signed up with email: ${email}`);
      return undefined;
    } catch (error) {
      // Undo creation of Firebase Auth user.
      await auth.currentUser?.delete();
      return AuthError.OTHER;
    }
  } catch (error) {
    console.log(error);
    return toAuthError(error as FirebaseError);
  }
};

export const logIn: (
  email: string,
  password: string,
) => Promise<AuthError | undefined> = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Logged in with email: ${email}`);
    return undefined;
  } catch (error) {
    console.log(error);
    return toAuthError(error as FirebaseError);
  }
};

export const logOut = () => {
  console.log("Logging out");
  signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
  console.log("Password email sent.");
};

export const setEmail = async (newEmail: string) => {
  if (auth.currentUser === null) return;
  await updateEmail(auth.currentUser, newEmail);
  console.log("Email updated.");
};
