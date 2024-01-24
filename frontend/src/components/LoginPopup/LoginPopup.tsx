import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { logIn, signUp, AuthError } from "../../authentication/authentication";
import "./LoginPopup.css";
import { ReactComponent as CloseIcon } from "../assets/cross-icon.svg";
import { isValidEmail, isValidPassword } from "../../utils/validation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

interface InputFields {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

enum InputError {
  EMPTY_FIELDS = "Det er tomme felt.",
  INVALID_EMAIL = "Dette er ikke en gyldig e-post.",
  INVALID_PASSWORD = "Passordet må være minst 6 tegn.",
  NON_MATCHING_PASSWORDS = "Passordene er ikke like.",
}

export const LoginContext = React.createContext({
  showLoginModal: () => {},
});

export const LoginPopup = ({ children }: Props) => {
  const [inputFields, setInputFields] = useState<InputFields>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  // isLoggingIn = false, means user is signing in.
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Returns a function that updates the state of the inputFields object
   * on change of a input field.
   *
   * @param key The key of the property to update
   * @returns A function that updates the state of the inputFields object
   */
  const getOnChangeHandler = (
    key: keyof InputFields,
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      setInputFields({
        ...inputFields,
        [key]: e.target.value,
      });
    };
  };

  const clearInputFields = () => {
    setInputFields({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    clearInputFields();
    setErrorMessage("");
  }, [isLoggingIn]);

  const handleGoToRegisterClick = () => {
    setIsLoggingIn(false);
  };

  const signUpFieldError: () => InputError | undefined = () => {
    if (Object.values(inputFields).some((inputValue) => inputValue === "")) {
      return InputError.EMPTY_FIELDS;
    }
    // Only when signing up
    if (!isValidEmail(inputFields.email)) {
      return InputError.INVALID_EMAIL;
    }
    if (!isValidPassword(inputFields.password)) {
      return InputError.INVALID_PASSWORD;
    }
    if (inputFields.password !== inputFields.confirmPassword) {
      return InputError.NON_MATCHING_PASSWORDS;
    }

    return undefined;
  };

  const handleRegisterButtonClicked = async () => {
    const error = signUpFieldError();
    if (error) {
      setErrorMessage(error);
      return;
    }

    signUp(inputFields.email, inputFields.password, inputFields.name).then(
      (error?: AuthError) => {
        if (error) {
          setErrorMessage(error);
        } else {
          clearInputFields();
          setErrorMessage("");
          setIsVisible(false);
          window.location.reload();
        }
      },
    );
  };

  const handleLoginButtonClicked = async () => {
    if (inputFields.email === "" || inputFields.password === "") {
      setErrorMessage(InputError.EMPTY_FIELDS);
      return;
    }

    logIn(inputFields.email, inputFields.password).then((error?: AuthError) => {
      if (error) {
        setErrorMessage(error);
      } else {
        clearInputFields();
        setErrorMessage("");
        setIsVisible(false);
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
  }, [isVisible]);

  const handleClickOnCross = () => {
    setIsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (isLoggingIn) {
        handleLoginButtonClicked();
      } else {
        handleRegisterButtonClicked();
      }
    }

    if (e.key === "Escape") {
      handleClickOnCross();
    }
  };

  const showLoginModal = () => {
    setIsVisible(true);
  };

  return (
    <LoginContext.Provider value={{ showLoginModal }}>
      <div
        className="popup-container"
        style={{ display: isVisible ? "flex" : "none" }}
      >
        <div className="login-container">
          <div className="left-container">
            <h1>TrailMates</h1>
            <p>
              Velkommen til TrailMates, den ultimate destinasjonen for
              backpackere som ønsker å utforske verden på en autentisk og
              uforglemmelig måte! Vi er glade for å ha deg her, og vi er her for
              å hjelpe deg med å få mest mulig ut av backpacking-opplevelsene
              dine.
              <br />
              <br />
              Vi vet at backpacking kan være en utfordrende og spennende
              opplevelse, og det er derfor vi er her for å hjelpe deg med alt du
              trenger for å lykkes. Fra å velge den beste tiden på året for å
              besøke forskjellige steder, til å finne de mest pittoreske
              campingplassene, så har vi deg dekket.
              <br />
              <br />
              Takk for at du velger TrailMates som din guide til
              backpacking-verdenen. Vi er her for å hjelpe deg med å få mest
              mulig ut av opplevelsen og utforske verden på en unik og autentisk
              måte. Lykke til med din neste eventyrlystne reise!
            </p>
          </div>
          <div className="right-container">
            <CloseIcon className="close-button" onClick={handleClickOnCross} />
            {isLoggingIn ? (
              <>
                <h1>Velkommen Tilbake!</h1>
                <InputField
                  labelText="EMAIL"
                  onChange={getOnChangeHandler("email")}
                  value={inputFields.email}
                  type="text"
                />
                <InputField
                  labelText="PASSORD"
                  onChange={getOnChangeHandler("password")}
                  value={inputFields.password}
                  type="password"
                  onKeyDown={handleKeyDown}
                />
                <div className="button-container">
                  <p className="error">{errorMessage}</p>
                  <Button
                    text="LOGG INN"
                    styling="accent-fill"
                    onClick={handleLoginButtonClicked}
                    className="login-button"
                  />
                  <p>
                    Har du ikke bruker?{" "}
                    <u onClick={handleGoToRegisterClick}>Registrer deg!</u>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 id="login-header-text">Hei på deg!</h1>
                <InputField
                  labelText="NAVN"
                  onChange={getOnChangeHandler("name")}
                  value={inputFields.name}
                  type="text"
                />
                <InputField
                  labelText="EMAIL"
                  onChange={getOnChangeHandler("email")}
                  value={inputFields.email}
                  type="email"
                />
                <InputField
                  labelText="PASSORD"
                  onChange={getOnChangeHandler("password")}
                  value={inputFields.password}
                  type="password"
                />
                <InputField
                  labelText="BEKREFT PASSORD"
                  onChange={getOnChangeHandler("confirmPassword")}
                  value={inputFields.confirmPassword}
                  type="password"
                  onKeyDown={handleKeyDown}
                />
                <div className="button-container">
                  <p className="error">{errorMessage}</p>
                  <Button
                    text="REGISTRER DEG"
                    styling="accent-fill"
                    onClick={handleRegisterButtonClicked}
                    className="register-button"
                  />
                  <p className="already-user">
                    Har du allerede en bruker?{" "}
                    <u onClick={() => setIsLoggingIn(true)}>Logg inn her!</u>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {children}
    </LoginContext.Provider>
  );
};
