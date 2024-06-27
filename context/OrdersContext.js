import React,{createContext, useState, useCallback, useEffect, useContext} from 'react'


const OrdersContext = createContext()

export const useOrders = () =>{
    return useContext(OrdersContext)
}

export const OrdersProvider = ({children}) =>{

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
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
      }, []);
    
      useEffect(() => {
        fetchOrders();
      }, [fetchOrders]);

    return(
        <OrdersContext.Provider value={{orders, loading, fetchOrders}}>
            {children}
        </OrdersContext.Provider>
    )
}