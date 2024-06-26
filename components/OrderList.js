import React,{useState, useEffect} from 'react'
import Link from "next/link";
import styles from "../styles/Order.module.css";
import vert_icon from '../assets/vert.svg';
import Image from "next/image";

const OrderList = () => {

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    const toggleDropdown = (id) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
    };

    const getStatusBg = (val) => {
        let result;
        switch (val) {
          case "pending":
            result = styles.badge_pending
            break;
          case "in_transit":
            result = styles.badge_transit;
            break;
          case "delivered":
            result = styles.badge;
            break;
          default:
            result = "badge_pending";
            break;
        }
        return result;
      };

      const getStatusTest = (val) => {
        let result;
        switch (val) {
          case "pending":
            result = 'Pending'
            break;
          case "in_transit":
            result = 'In Transit';
            break;
          case "delivered":
            result = 'Delivered';
            break;
          default:
            result = "Pending";
            break;
        }
        return result;
      };

    useEffect(() => {
    const fetchOrders = async () => {
        try {
        const response = await fetch('/api/orders');
        if (response.ok) {
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } else {
            console.log('Failed to fetch orders.');
            setLoading(false);
        }
        } catch (error) {
        console.log('Failed to fetch orders.');
        setLoading(false);
        }
    };

    fetchOrders();
    }, []);

    return ( 
        <>  
        <div className={styles.orderTable}>
            <table className={styles.table}>
              <thead>
                    <tr>
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                    Order ID/ Customer
                    </th>
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                       Item Name
                    </th>
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                       Item Qty
                    </th>
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                        Date Added
                    </th>
                    
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                        Payment Status
                    </th>
                    <th
                        scope="col"
                        className={styles.tablehead}
                    >
                        Delivery Status
                    </th> 
                     <th
                        scope="col"
                        className={styles.tablehead}
                    >
                       Actions
                    </th>
                    </tr>
                </thead>
                <tbody className={styles.tablebody}>
                    
                    {
                        orders.map((order) => (
                            <tr>
                                <td>
                                   <div>
                                        <p className={styles.orderId}>#{order.id}</p>
                                        <h6 className={styles.customerName}>{order.customerName}</h6>
                                   </div>
                                </td>
                                <td>
                                  {order.item_name}
                                </td>
                                
                                <td>
                                 {order.quantity} Item(s)
                                </td>
                                <td>
                                  {order.created_at}
                                </td>
                                <td className={`${order.payment_status === 'paid' ? styles.badgePaid: styles.badgePending }`}>
                                    {order.payment_status}
                                </td>
                                <td>
                                    <div 
                                     className={getStatusBg(
                                        order?.status
                                      )}
                                            >
                                         {getStatusTest(order.status)}
                                    </div>
                                </td>
                                <td>
                                    <div onClick={() => toggleDropdown(order.id)} className={styles.actionsDiv}>
                                        <Image src={vert_icon} alt="Vertical Icon" quality={100} />
                                      
                                        {openDropdownId === order.id &&  
                                        <ul className={styles.moreDiv}>
                                            <li>Edit Order</li>
                                            <li>Delete Order</li>
                                        </ul>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </>
     );
}
 
export default OrderList;