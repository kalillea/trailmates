import { useContext, useState } from "react";
import { UserContext } from "../../authentication/UserProvider";
import "./ProfileItem.css";

interface Props {
  info: string;
  title: "Navn" | "Alder" | "Bosted" | "Telefon" | "Om meg";
}

const userAttributeEquivalent = {
  Navn: "name",
  Alder: "age",
  Bosted: "placeOfResidence",
  Telefon: "phoneNumber",
  "Om meg": "aboutUser",
};

// TODO: Add validation?
export const ProfileItem = ({ info, title }: Props) => {
  const [value, setValue] = useState(info);
  const [savedValue, setSavedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = e.target.value;

    if (title === "Telefon") {
      const isValidPhoneNumber = /^\d{0,8}$/.test(inputValue);
      if (inputValue === "" || isValidPhoneNumber) {
        setValue(inputValue);
      }
    } else if (title === "Alder") {
      const isValidAge = /^\d{0,3}$/.test(inputValue);
      if (inputValue === "" || isValidAge) {
        setValue(inputValue);
      }
    } else {
      setValue(inputValue);
    }
  };

  /** Handler method that toggles the editing state
   * and updates the db and current user if the field has changed. */
  const handleClick = () => {
    if (isEditing && value !== savedValue) {
      setSavedValue(value);
      const updatedUser = {
        ...currentUser!,
        [userAttributeEquivalent[title]]:
          title === "Alder" || title === "Telefon" ? parseInt(value) : value,
      };
      updateCurrentUser(updatedUser);
    }
    setIsEditing(!isEditing);
  };

  /** A trick for resizing the textarea to its content. */
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      handleClick();
    }
    if (e.key === "Escape") {
      setValue(savedValue);
      setIsEditing(!isEditing);
    }
  };

  return (
    <>
      {title === "Om meg" ? (
        <>
          {isEditing ? (
            <textarea
              rows={7}
              placeholder={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="aboutme-textarea"
              onInput={handleInput}
            >
              {value}
            </textarea>
          ) : (
            <p onDoubleClick={handleClick}>{value}</p>
          )}
          <a
            className="edit-button"
            style={{ fontSize: "1.2vw", display: "block" }}
            onClick={handleClick}
          >
            {isEditing ? "Lagre" : "Endre bio"}
          </a>
        </>
      ) : (
        <div className="container-inforow flex-column">
          <h3>{title}</h3>
          <div className="user-context flex-row">
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder={title}
                  onChange={handleChange}
                  value={value}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <a className="edit-button" onClick={handleClick}>
                  Lagre
                </a>
              </>
            ) : (
              <>
                <p onDoubleClick={handleClick}>
                  {value + (title === "Alder" && value !== "" ? " år" : "")}
                </p>
                <a className="edit-button" onClick={handleClick}>
                  Rediger
                </a>
              </>
            )}
          </div>
          <div className="seperator"></div>
        </div>
      )}
    </>
  );
};
