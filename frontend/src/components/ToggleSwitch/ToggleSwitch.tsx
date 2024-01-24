import "./ToggleSwitch.css";
import sun from "../../components/assets/sun.svg";
import moon from "../../components/assets/moon.svg";

interface Props {
  booleanState: boolean;
  booleanStateToggler: () => void;
  labelText?: string;
}

export const ToggleSwitch = ({
  booleanState,
  booleanStateToggler,
  labelText,
}: Props) => {
  return (
    <div className="toggle-switch">
      <label
        className="switch"
        htmlFor="checkbox"
        onClick={booleanStateToggler}
      >
        <label className="toggle-switch-label">{labelText}</label>
        <input
          type="checkbox"
          className="checkbox"
          checked={booleanState}
          onClick={booleanStateToggler}
          readOnly
        />

        <span className="slider"></span>
      </label>
    </div>
  );
};
