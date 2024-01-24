import "./Button.css";
import { ReactComponent as HeartIcon } from "../../resources/media/heart-icon.svg";
import { ReactComponent as ImagesIcon } from "../../resources/media/images-icon.svg";
import { ReactComponent as CommentIcon } from "../../resources/media/comment-icon.svg";
import { ReactComponent as PlusOrangeIcon } from "../../components/assets/plusOrange.svg";
import { ReactComponent as PlusBlueIcon } from "../../components/assets/plusBlue.svg";
import { ReactComponent as FilledHeartIcon } from "../../resources/media/heart-filled-icon.svg";

interface ButtonProps {
  width?: string;
  height?: string;
  text: string;
  onClick?: () => void;
  fontSize?: string;
  styling:
    | "secondary-outline"
    | "accent-outline"
    | "accent-fill"
    | "secondary-fill";
  icon?:
    | "heart"
    | "comment"
    | "images"
    | "plusBlue"
    | "plusOrange"
    | "filledHeart";
  className?: string;
  style?: React.CSSProperties;
  textColor?: string;
}

const iconComponents = {
  filledHeart: <FilledHeartIcon className="trip-heart-icon" />,
  heart: <HeartIcon className="trip-heart-icon" />,
  images: <ImagesIcon />,
  comment: <CommentIcon />,
  plusOrange: <PlusOrangeIcon className="plus" />,
  plusBlue: <PlusBlueIcon className="plus" />,
};

export const Button = ({
  width,
  height,
  styling,
  text,
  onClick,
  fontSize,
  icon,
  style,
  className,
  textColor,
}: ButtonProps) => {
  return (
    <button
      className={`${className || ""} button ${styling}`}
      style={{ ...style, color: textColor, width, height, fontSize }}
      onClick={onClick}
    >
      {text}
      {icon && iconComponents[icon]}
    </button>
  );
};
