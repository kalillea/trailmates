import "./PrivateProfile.css";
import { ProfileItem } from "../../components/ProfileItem/ProfileItem";
import { Button } from "../../components/Button/Button";
import { useEffect, useContext, ChangeEvent, useRef, useState } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";
import { logOut } from "../../authentication/authentication";
import { uploadFile, getImgUrl } from "../../storage/util/methods";
import { ToggleSwitch } from "../../components/ToggleSwitch/ToggleSwitch";
import useNavigate from "../../hooks/useNavigate";

export const PrivateProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [imageURL, setImageURL] = useState<string>();
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("dark-mode") === "true",
  );

  useEffect(() => {
    document.title = "Min Profil";
  }, []);

  useEffect(() => {
    getImgUrl(`profilepics/${currentUser?.userUid}`)
      .then((url) => {
        setImageURL(url);
        setHasImage(true);
      })
      .catch((error) => {
        setHasImage(false);
      });
  }, [currentUser]);

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (
      file?.type !== "image/png" &&
      file?.type !== "image/jpeg" &&
      file?.type !== "image/jpg" &&
      file?.type !== "image/jfif"
    ) {
      alert("Bildet må være av typen PNG, JPG eller JPEG");
      return;
    }
    const path = `profilepics/${currentUser?.userUid}`;

    await uploadFile(file, path);
    await getImgUrl(`profilepics/${currentUser?.userUid}`).then((url) => {
      setImageURL(url);
    });
  };

  const onUploadClicked = () => {
    inputFileRef.current?.click();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "false");
    }
  }, [isDarkMode]);

  return (
    <div className="container-privateprofile">
      {currentUser ? (
        <>
          <Button
            text="Se offentlig profil"
            styling="accent-fill"
            className="public-profile-button"
            onClick={() => navigate(`/profile/${currentUser.userUid}`)}
          />
          <div className="container-aboutme">
            <div className="private-profile-img-border">
              <p
                className={`private-profile-upload-text${
                  !hasImage ? " missing-image" : ""
                }`}
                onClick={onUploadClicked}
              >
                Last opp profilbilde
              </p>
              <div
                className="private-profile-img"
                style={{ backgroundImage: `url(${imageURL})` }}
              />
            </div>
            <div className="container-text flex-column">
              <div className="title-aboutme flex-row">
                <h2>Om meg</h2>
                <div className="title-decoration-1"></div>
              </div>
              <div className="aboutme-text">
                <ProfileItem
                  info={currentUser.aboutUser || ""}
                  title="Om meg"
                />
              </div>
            </div>
          </div>
          <div className="container-userinfo flex-column">
            <div className="title-profile flex-row">
              <h1>Min Profil</h1>
              <div className="title-decoration-2"></div>
            </div>
            <div className="container-infoboxes flex-column">
              <ProfileItem info={currentUser.name} title="Navn" />
              <ProfileItem
                info={currentUser.age?.toString() || ""}
                title="Alder"
              />
              <ProfileItem
                info={currentUser.placeOfResidence || ""}
                title="Bosted"
              />
              <ProfileItem
                info={currentUser.phoneNumber?.toString() || ""}
                title="Telefon"
              />

              <div className="infobox-cta-section flex-row">
                <Button
                  text="Endre Epost"
                  styling="secondary-fill"
                  width="25%"
                />
                <Button
                  text="Endre Passord"
                  styling="secondary-fill"
                  width="25%"
                />
                <Button
                  text="Logg ut"
                  styling="secondary-outline"
                  width="25%"
                  onClick={logOut}
                />
              </div>
              <div className="darkmode-container flex-row">
                <p>Blir du blind av å se på bakgrunnen? Prøv Darkmode!</p>
                <ToggleSwitch
                  booleanState={isDarkMode}
                  booleanStateToggler={() => setIsDarkMode(!isDarkMode)}
                />
              </div>
            </div>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={onFileUpload}
            accept="image/*"
            ref={inputFileRef}
          />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
