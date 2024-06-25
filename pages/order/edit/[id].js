import OrderForm from "@/components/OrderForm";
import { useRouter } from 'next/router';

const EditOrder = () => {

    const router = useRouter();
    const { id } = router.query;

    return ( 
        <>
            <div>
                <h1>Edit Order</h1>
                <OrderForm id={id} />
            </div>
        </>
     );
}
 
export default EditOrder;