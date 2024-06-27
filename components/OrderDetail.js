

import React,{useState, useEffect} from 'react'
import styles from "../styles/Order.module.css";
import item1 from '../assets/item1.svg';
import Image from 'next/image';

const OrderDetail = ({id}) => {

    const [order, setOrder] = useState(null);

    const formatNumber = (numberToFormat) =>{
        let res = Number(numberToFormat).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return res;
      }

    useEffect(() => {
        if (id) {
          // Fetch the order by ID from the API
          const fetchOrder = async () => {
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`);
              if (response.ok) {
                const data = await response.json();
                console.log(data)
                setOrder(data);
              } else {
                const data = await response.json();
                console.log(data.message);
              }
            } catch (err) {
              console.log('Failed to fetch order');
            }
          };
    
          fetchOrder();
        }
      }, [id]);

    return ( 
        <>
          <div className={styles.detailDiv}>
            <div>
                <h6 className={styles.track_title}>Track no: #{Date.now()}</h6>
            </div>

            <div className={styles.orderInfoDiv}> 
                <div>
                    <h6 className={styles.orderInfoId}>Order ID: #{order? order.id: 'N?A'}</h6>
                    <p className={styles.orderInfoDate}>Date ordered: {order? order.created_at : 'N/A'}</p>
                </div>
                <div>
                    <h6 className={styles.orderInfoAmt}>₦{order ? (formatNumber(order.price)): 'N/A'}</h6>
                </div>
            </div>
            
            <div className={styles.orderHrLine}></div>

            <div className={styles.orderInfo}>
                <h6 className={styles.track_title}>Customer Name</h6>
                <p className={styles.orderInfoDate}>{order ? order.customerName: 'N/A'}</p>
            </div>

            <div className={styles.orderInfo}>
                <h6 className={styles.track_title}>Phone number</h6>
                <p className={styles.orderInfoDate}>(+234) 809 205 4532</p>
            </div>

            <div className={styles.orderInfo}>
                <h6 className={styles.track_title}>Shipping address </h6>
                <p className={styles.orderInfoDate}>124, Oyediran Estate, Lagos, Nigeria, 5432</p>
            </div>

            <div className={styles.orderHrLine}></div>

            <div className={styles.itemDiv}>
                <h6 className={styles.itemQty}>{order ? order.quantity : 'N/A'} Item(s)</h6>


                <div className={styles.productDiv}>
                    <div className={styles.productInfoDiv}>
                        <div>
                            <Image src={item1} quality={100} />
                        </div>
                        <div>
                            <p className={styles.productName}>{order? order.item_name: 'N/A'}</p>
                            <p className={`${order && order.payment_status === 'paid' ? styles.productUnit : styles.productUnitPending}`}>{order ? order.payment_status : 'pending'}</p>
                        </div>
                    </div>
                    <div>
                         <h6 className={styles.orderInfoAmt}>₦{order ? (formatNumber(order.price * order.quantity)) : 'N/A'}</h6>
                    </div>
                </div>

            </div>

            <div className={styles.orderHrLine}></div>

            <div>
                <h6 className={styles.order_trackingtitle}>Order Tracking</h6>
            </div>

            <div className={styles.timelineWrapper}>
            <ol className={styles.timeline}>                  
                <li>
                    <div className={styles.active}></div>
                    <h3>Your order has been received</h3>
                    <time>03:00 pm</time>
                   
                </li>
                <li class="mb-10 ms-4">
                    <div></div>
                    <h3>Order accepted by vendor</h3>
                    <time>03:20pm</time>
                </li>
                </ol>
            </div>

            <div className={styles.cta_div}>
                <button className={styles.btn_delivered}>
                    Mark as delivered
                </button>
            </div>
            
          </div>
        </>
     );
}
 
export default OrderDetail;