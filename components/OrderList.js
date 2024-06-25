import Link from "next/link";


const OrderList = () => {

    //  // This would be fetched from an API 
    const orders = [
        { id: 1, name: 'Order 1' },
        { id: 2, name: 'Order 2' },
      ];

    return ( 
        <>
             <ul>
             {orders.map((order) => (
                <li key={order.id}>
                    <Link href={`/order/${order.id}`}>
                        {order.name}
                    </Link>
                </li>
            ))}
            </ul>
        </>
     );
}
 
export default OrderList;