import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
const modalRootRef = document.querySelector("#modal-root");




export default function Modal ({value, onClose}){


 
  useEffect(() => {

        const onCloseModalByEscape = (e) => {
      if (e.code === "Escape") {
        onClose(false);  // Закрытие модалки
      }
    };

    document.addEventListener("keydown", onCloseModalByEscape);

    return () => {
      document.removeEventListener("keydown", onCloseModalByEscape);
    };
  }, [onClose]);

    
  const onCloseModal = (e) => {
    if (e.target.nodeName !== "DIV") {
      return
    };
    onClose(false);
  };


      return (createPortal(<div
        onClick={onCloseModal}
        className={css.Overlay}>
        <img
          className={css.Modal}
          src={value.src}
          alt={value.alt} />
      </div>, modalRootRef));
  };

