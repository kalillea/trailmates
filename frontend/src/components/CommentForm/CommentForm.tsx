import "./CommentForm.css";
import { useState, useContext, useEffect } from "react";
import profilepic from "../../components/assets/profilepic.png";
import { Button } from "../Button/Button";
import arrow from "../../components/assets/comment_form_arrow.svg";
import star from "../../components/assets/Star.svg";
import { UserContext } from "../../authentication/UserProvider";
import { getImgUrl } from "../../storage/util/methods";
import { getUserTripsCount } from "../../trips/access";
import { putComment } from "../../comments/access";

interface Props {
  onClose: () => void;
  tripId: string;
  editInfo: EditInfo;
  handleEditComment: (editInfo: EditInfo) => void;
}

export interface EditInfo {
  title: string;
  comment: string;
  rating: string;
}

const defaultProfilePicUrl =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export const CommentForm: React.FC<Props> = ({
  onClose,
  tripId,
  editInfo,
  handleEditComment,
}) => {
  const { currentUser } = useContext(UserContext);
  const [tripCount, setTripCount] = useState(0);
  const [rating, setRating] = useState(editInfo.rating);
  const [title, setTitle] = useState(editInfo.title);
  const [comment, setComment] = useState(editInfo.comment);
  const [profilePictureUrl, setProfilePicUrl] =
    useState<string>(defaultProfilePicUrl);

  useEffect(() => {
    if (!currentUser) return;
    getImgUrl(`profilepics/${currentUser.userUid}`).then(setProfilePicUrl);
    getUserTripsCount(currentUser.userUid).then(setTripCount);
  }, []);

  const handleCloseClick = () => {
    setTitle("");
    setComment("");
    setRating("");
    onClose();
  };

  const ratingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ratingString = event.target.value;

    const re = /^[0-5]?$/;
    if (ratingString === "" || re.test(ratingString)) {
      setRating(ratingString);
    }
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setTitle(input);
  };

  const commentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setComment(input);
  };

  return (
    <div className="image-carousel-overlay flex-row">
      <div className="comment-form">
        <div className="comment-form-user-info-container flex-row">
          <div className="comment-form-user-info-profile flex-column">
            <img
              className="comment-form-profile-pic"
              src={profilePictureUrl}
              alt=""
            />
            <h3>{currentUser?.name}</h3>
            <p>{tripCount} reiser</p>
          </div>
          <div className="comment-form-user-info-rating flex-column">
            <h2>Hvordan rater du denne reisen?</h2>
            <div className="comment-form-user-info-rating-value flex-row">
              <input
                placeholder="0"
                name="rating"
                className="comment-form-field"
                onChange={ratingHandler}
                value={rating}
              />
              <p>/ 5</p>
              <img
                src={star}
                alt="rating symbol"
                style={{ width: "1.6vw", height: "auto", marginLeft: "10%" }}
              />
            </div>
          </div>
        </div>
        <div className="comment-form-comment flex-column">
          <input
            type="text"
            placeholder="Overskrift"
            onChange={titleHandler}
            className="comment-form-input comment-form-field"
            value={title}
          />
          <textarea
            placeholder="Aa"
            onChange={commentHandler}
            name="comment"
            className="comment-form-field comment-form-textarea"
            value={comment}
          />
        </div>
        <div className="comment-form-actions flex-row">
          <div className="comment-form-actions-close flex-row">
            <img src={arrow} alt="back icon" />
            <a onClick={handleCloseClick}>Avbryt</a>
          </div>
          <Button
            text={"Legg ut kommentar"}
            styling={"secondary-fill"}
            height={"4vh"}
            width={"14vw"}
            fontSize={"1.3vw"}
            onClick={() => {
              currentUser &&
                putComment(tripId, currentUser?.userUid, {
                  comment,
                  rating: parseInt(rating),
                  title,
                }).then(() => handleEditComment({ title, comment, rating }));
              handleCloseClick();
            }}
          />
        </div>
      </div>
    </div>
  );
};
