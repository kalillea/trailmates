import { useState } from "react";
import useNavigate from "../../hooks/useNavigate";
import { ReactComponent as SearchIcon } from "../../resources/media/search-icon.svg";
import "./Searchbar.css";

interface SearchbarProps {
  height?: string;
  width?: string;
  type: "nav" | "header";
}

const placeholder = {
  nav: "Jeg vil til ...",
  header: "Mitt neste reisemål er ...",
};

const Searchbar = ({ height, width, type }: SearchbarProps) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent) => {
    setText((e.target as HTMLInputElement).value);
  };

  const submit = () => {
    if (text === "") return;
    navigate(`/search?query=${text}`);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div
      id="search-container"
      className={type}
      style={{ width, height }}
      onKeyDown={handleKeyPress}
    >
      <input
        className={`${type}-text`}
        type="text"
        placeholder={placeholder[type]}
        value={text}
        onChange={handleChange}
      />
      <SearchIcon
        type="button"
        className={`search-icon ${type}`}
        onClick={submit}
      />
    </div>
  );
};

export default Searchbar;
