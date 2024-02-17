import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal Context is used outside modal");
  return context;
}

export default function Modal({ children }) {
  const [open, setOpen] = useState("");
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, name }) {
  const { open, setOpen } = useModal();
  const overlay = useRef();
  if (open !== name) return null;
  return createPortal(
    <Overlay
      ref={overlay}
      onClick={(e) => {
        if (e.target === overlay.current) setOpen("");
      }}
    >
      <StyledModal>
        <Button onClick={() => setOpen("")}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: () => setOpen("") })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

function Open({ children, opens }) {
  const { setOpen } = useModal();
  return cloneElement(children, { onClick: () => setOpen(opens) });
}

Modal.Open = Open;
Modal.Window = Window;
