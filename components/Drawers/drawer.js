import { CSSTransition } from "react-transition-group";
import close_icon from '../../assets/Icon-left.svg';
import styles from "../../styles/Drawer.module.css";
import Image from "next/image";

const DrawerComponent = ({title, children, isOpen, onClose}) => {
    return ( 
        <>
        <CSSTransition
        in={isOpen}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div
          className={`${styles.drawer} ${isOpen ? styles.enter_done : styles.exit} `}
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.drawerContent}
          >
            <div className={styles.titleDiv}>
              <h5 className={styles.title}>{title}</h5>
              
             <Image onClick={onClose} src={close_icon} quality={100} className="" alt="close icon" />
            
            </div>

            {/* drawer body */}

            {children}
          </div>
        </div>
      </CSSTransition>
        </>
     );
}
 
export default DrawerComponent;