import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import OrderForm from '@/components/OrderForm'
import { OrdersProvider } from '@/context/OrdersContext';

describe("OrderForm", () => {
    it("renders a button", () => {
      render(
        <OrdersProvider>
             <OrderForm />
        </OrdersProvider>
     );
  
      const formElem = screen.getByRole("button");
  
      expect(formElem).toBeInTheDocument();
    });
  });