
import { CSSTransition } from "react-transition-group";
import close_icon from '../../assets/clear.svg';
import Image from "next/image";
import styles from "../../styles/Modal.module.css";

const ModalComponent = ({title, subtitle, children, isOpen, onClose}) => {
    return ( 
        <>
        <CSSTransition
        in={isOpen}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div
          className={`${styles.modal} ${isOpen ? styles.enter_done : styles.exit} `}
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalDiv}
          >
            {/* modal content */}
            <div className={styles.modalContent}>
              {/* modal header */}
              <div className={styles.modalHeader}>
                <div>
                  <h3 className={styles.title}>
                    {title}
                  </h3>
                  <p className={styles.subtitle}>
                    {subtitle}
                  </p>
                </div>

                <div className={styles.closeDiv} onClick={onClose}>
                  <Image quality={100} src={close_icon} alt="close icon" />
                </div>
              </div>

              {/* modal body */}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
        </>
     );
}
 
export default ModalComponent;