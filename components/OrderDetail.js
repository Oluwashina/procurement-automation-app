


const OrderDetail = ({id}) => {

    // This would be fetched from an API in a real application
    const order = { id, name: `Order ${id}`, details: 'Order details here' };

    return ( 
        <>
        <div>
            <h2>{order.name}</h2>
            <p>{order.details}</p>
        </div>
        </>
     );
}
 
export default OrderDetail;