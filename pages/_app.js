import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { OrdersProvider } from "@/context/OrdersContext";
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  return(
    <OrdersProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </OrdersProvider>
  )

}
