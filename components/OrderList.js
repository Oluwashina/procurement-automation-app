import React,{useState, useEffect} from 'react'
import Link from "next/link";
import styles from "../styles/Order.module.css";
import vert_icon from '../assets/vert.svg';
import Image from "next/image";
import ModalComponent from './Modals/modal';
import OrderForm from './OrderForm';
import DrawerComponent from './Drawers/drawer';
import OrderDetail from './OrderDetail';
import { useOrders } from '@/context/OrdersContext';

const OrderList = () => {

    const [openDropdownId, setOpenDropdownId] = useState(null);

    const {orders, fetchOrders} = useOrders()

    const [order, setOrder] = useState({});
    const [loader, setLoader] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [isShow, setIsShow] = useState(false);
    const [isEditShow, setIsEditShow] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const showOrderinfo = () => {
        setIsOpen(!isOpen);
      };

    const showModal = () =>{
     setIsShow(!isShow)
    }

    const showEditModal = () =>{
        setIsEditShow(!isEditShow)
    }


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

      const handleViewOrder = (id) =>{
        setOrderId(id)
        showOrderinfo()
      }

      const handleDeleteOrder = (id) =>{
        setOrderId(id)
        showModal()
      }

      const handleEditOrder = (order) =>{
        setOrder(order)
        showEditModal()
      }

      const deletePurchaseOrder = async () =>{
        setLoader(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
                setLoader(false)
                setIsShow(!isShow)
                setOrderId(null)
                await fetchOrders();
            } else {
                setLoader(false)
              const data = await response.json();
              console.log(data.message);
            }
          } catch (err) {
            setLoader(false)
            console.log('Failed to delete order');
          }
      }
      
    

    return ( 
        <>  

        <DrawerComponent title="Order Details" isOpen={isOpen} onClose={showOrderinfo}>
            <div>
                <OrderDetail id={orderId} />
            </div>

        </DrawerComponent>

        <ModalComponent
        title="Edit Order"
        subtitle="Update your purchase order"
        isOpen={isEditShow}
        onClose={showEditModal}
      >
        <div>
            <OrderForm order={order} onClose={showEditModal} />
         </div>
       </ModalComponent>

        <ModalComponent
        title="Delete Order"
        subtitle=""
        isOpen={isShow}
        onClose={showModal}
      >
        <div>
            <p className={styles.deleteTitle}>Are you sure you want to delete this order?</p>

            <div className={styles.deleteDiv}>
                <button onClick={()=>setIsShow(false)} className={styles.primary_btn}>No</button>
                <button disabled={loader} onClick={deletePurchaseOrder} className={styles.secondary_btn}>Yes</button>
            </div>
            
         </div>
       </ModalComponent>

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
                                            <li onClick={() => handleViewOrder(order.id)}>View Order</li>
                                            <li onClick={() => handleEditOrder(order)}>Edit Order</li>
                                            <li onClick={() => handleDeleteOrder(order.id)}>Delete Order</li>
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