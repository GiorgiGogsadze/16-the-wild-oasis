import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;

  z-index: 10;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
function useMenus() {
  const context = useContext(MenusContext);
  if (context === undefined)
    throw new Error("menu context is used outside menu");
  return context;
}
export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});
  const closeAll = () => setOpenId("");
  return (
    <MenusContext.Provider
      value={{ openId, setOpenId, closeAll, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

export function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { setOpenId, setPosition } = useMenus();
  function handleClick(e) {
    // e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.x,
      y: rect.y + rect.height,
    });
    setOpenId((b) => (b === id ? "" : id));
  }

  return (
    <StyledToggle onClick={handleClick} id={`toggleBtn-${id}`}>
      <HiMiniEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { openId, closeAll, position } = useMenus();
  const ref = useOutsideClick(closeAll, {
    exceptIds: [`toggleBtn-${id}`],
    // listenCapturing: false,
  });
  if (openId !== id) return null;
  return (
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>
  );
}
function Button({ children, onClick }) {
  const { closeAll } = useMenus();
  function handleClick() {
    onClick?.();
    closeAll();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{children}</StyledButton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;
