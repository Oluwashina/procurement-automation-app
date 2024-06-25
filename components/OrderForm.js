


const OrderForm = ({id}) => {

    // Fetch order details if id is provided for editing
    const order = id ? { id, name: `Order ${id}`, details: 'Order details here' } : {};

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (create or update)
      };

    return ( 
        <>
         <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" defaultValue={order.name} />
            </div>
            <div>
                <label>Details</label>
                <textarea defaultValue={order.details}></textarea>
            </div>
            <button type="submit">{id ? 'Update' : 'Create'} Order</button>
         </form>
        </>
     );
}
 
export default OrderForm;