import { useState } from "react";

export default function useToggleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return { isMenuOpen, toggleMenu };
}
