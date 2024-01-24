import { useNavigate } from "react-router-dom";

// Navigates to the top of a page.
export default () => {
  const navigate = useNavigate();

  return (to: string) => {
    navigate(to);
    window.scrollTo(0, 0);
  };
};
