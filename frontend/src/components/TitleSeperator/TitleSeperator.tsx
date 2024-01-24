import "./TitleSeperator.css";

interface ButtonProps {
  width: string;
  height?: string;
  color: "primary" | "secondary" | "accent";
}

export const TitleSeperator = ({ width, height, color }: ButtonProps) => {
  return (
    <div
      className={`title-seperator ${color}`}
      style={{ height: height, width: width }}
    />
  );
};
