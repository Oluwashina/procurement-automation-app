import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { OrdersProvider } from "@/context/OrdersContext";

export default function App({ Component, pageProps }) {
  return(
    <OrdersProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrdersProvider>
  )

}
