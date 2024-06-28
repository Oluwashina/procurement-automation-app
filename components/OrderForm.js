
import React,{useState} from 'react'
import styles from "../styles/Order.module.css";
import { useOrders } from '@/context/OrdersContext';
import toast from 'react-hot-toast';

const OrderForm = ({order,onClose}) => {

   
    const [itemName, setItemName] = useState(order? order.item_name: "")
    const [customerName, setCustomerName] = useState(order ? order.customerName: "")
    const [quantity, setQuantity] = useState(order ? order.quantity : 1)
    const [price, setPrice] = useState(order? order.price : 0)
    const [loader, setLoader] = useState(false)
    const { fetchOrders } = useOrders()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // check for empty fields in item name, customer name and quantity
        if(!itemName || !customerName || !quantity || !price) {
            alert("Please fill in all fields");
            return;
        }
        // check if order exist
        if(order){

            setLoader(true)
            const updatedOrder = {
                item_name: itemName,
                customerName,
                quantity: parseInt(quantity),
                price: parseFloat(price),
            };
            console.log(updatedOrder)
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${order.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedOrder),
            });
    
            if (response.ok) {
                setLoader(false);
                onClose();
                await fetchOrders()
                toast.success(`Order updated successfully!`);
            } else {
                setLoader(false);
                toast.error(`On Vercel, the filesystem is read-only!`);
              const data = await response.json();
              console.log(data.message);
            }
          } catch (err) {
            setLoader(false);
            toast.error(`On Vercel, the filesystem is read-only!`);
          }

        }
        else{

            setLoader(true)
            const newOrder = {
                item_name: itemName,
                customerName,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                created_at: new Date().toLocaleDateString(),
                payment_status: 'pending',
                status: 'pending',
            };
            console.log(newOrder)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newOrder),
                });
          
                if (response.ok) {
                  setCustomerName('');
                  setItemName('');
                  setQuantity(1);
                  setPrice(0);
                  setLoader(false);
                  onClose();
                  await fetchOrders();
                  toast.success(`Order created successfully!`);
                } else {
                  setLoader(false);
                  toast.error(`On Vercel, the filesystem is read-only!`);
                }
              } catch (error) {
                setLoader(false);
                toast.error(`On Vercel, the filesystem is read-only!`);
              }
        }


       
        
      };

    return ( 
        <>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputDiv}>
                <label htmlFor='itemName'>Item Name</label>
                <input id="itemName" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>

            <div className={styles.inputDiv}>
                <label htmlFor='customerName'>Customer Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}  />
            </div>

            <div className={styles.inputDiv}>
                <label htmlFor='quantity'>Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} />
            </div>

            <div className={styles.inputDiv}>
                <label htmlFor='price'>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={1} />
            </div>
           
            <button disabled={loader} type="submit">{order ? 'Update Order' : 'Create Order'}</button>
         </form>
        </>
     );
}
 
export default OrderForm;