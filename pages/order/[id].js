import OrderDetail from "@/components/OrderDetail";
import { useRouter } from "next/router";

const Order = () => {
    const router = useRouter()
    const {id} = router.query
    return ( 
        <>
            <div>
                <h1>Order Detail</h1>
                <OrderDetail id={id} />
            </div>
        </>
     );
}
 
export default Order;