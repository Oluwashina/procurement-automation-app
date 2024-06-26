import styles from "@/styles/Layout.module.css";
import cart_icon from '../assets/cart.svg';
import bell_icon from '../assets/bell.svg';
import user_icon from '../assets/user.svg';
import book_open from '../assets/book-open.svg';
import logo from '../assets/logo.svg';
import home_icon from '../assets/home.svg';
import order_icon from '../assets/bag-orange.svg';
import box_icon from '../assets/box.svg';
import customer_icon from '../assets/customer.svg';
import analytics_icon from '../assets/chart-up.svg';
import Image from "next/image";
import Link from "next/link";

const Layout = ({children}) => {
    return ( 
        <>
          <div className={`${styles.container}`}>
            <div className={styles.sidebar}>

              <div className={styles.logo}>
                <Image src={logo} alt="Logo Icon" quality={100} />
              </div>

              <div className={styles.sidebarMenuDiv}>

                <Link href={"/"} className={styles.sidebarMenu}>
                  <Image src={home_icon} alt="Home Icon" quality={100} />
                  <p>Home</p>
                </Link>

                <Link href={"/"}  className={styles.sidebarMenu}>
                  <Image src={box_icon} alt="box Icon" quality={100} />
                  <p>Products</p>
                </Link>

                <Link href={"/"}  className={`${styles.sidebarMenu} ${styles.active}`}>
                  <Image src={order_icon} alt="order Icon" quality={100} />
                  <p className={styles.active}>Orders</p>
                </Link>

                <Link href={"/"}  className={styles.sidebarMenu}>
                  <Image src={customer_icon} alt="customer Icon" quality={100} />
                  <p>Customers</p>
                </Link>

                <Link href={"/"}  className={styles.sidebarMenu}>
                  <Image src={analytics_icon} alt="analytics Icon" quality={100} />
                  <p>Analytics</p>
                </Link>

              </div>

            </div>
            <div className={styles.content}>
              {/* navbar */}
              <div className={styles.navbar}>
                  <div className={styles.title_div}>
                    <Image src={cart_icon} alt="Cart Icon" quality={100}/>
                    <p className={styles.title}>Orders</p>
                  </div>
                  <div className={styles.userInfoDiv}>
                      <div className={styles.setupDiv}>
                        <Image src={book_open} alt="Book Icon" quality={100} />
                        <p>Setup guide</p>
                      </div>
                      <div>
                        <Image src={bell_icon} alt="Bell Icon" quality={100} />
                      </div>
                      <div>
                        <Image src={user_icon} alt="User Icon" quality={100} />
                      </div>
                  </div>
              </div>
               <main className={styles.main}>{children}</main>
            </div>
        
          </div> 
        </>
     );
}
 
export default Layout;