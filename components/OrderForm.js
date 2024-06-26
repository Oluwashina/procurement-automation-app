
import React,{useState} from 'react'
import styles from "../styles/Order.module.css";

const OrderForm = ({onClose}) => {

    const [itemName, setItemName] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)
    const [loader, setLoader] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // check for empty fields in item name, customer name and quantity
        if(!itemName || !customerName || !quantity || !price) {
            alert("Please fill in all fields");
            return;
        }

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
            const response = await fetch('/api/orders', {
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
              alert('Order created successfully!');
            } else {
              setLoader(false);
              alert('Failed to create order.');
            }
          } catch (error) {
            setLoader(false);
            alert('Failed to create order.');
          }
        
      };

    return ( 
        <>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputDiv}>
                <label>Item Name</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>

            <div className={styles.inputDiv}>
                <label>Customer Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}  />
            </div>

            <div className={styles.inputDiv}>
                <label>Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} />
            </div>

            <div className={styles.inputDiv}>
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={1} />
            </div>
           
            <button disabled={loader} type="submit">Create Order</button>
         </form>
        </>
     );
}
 
export default OrderForm;