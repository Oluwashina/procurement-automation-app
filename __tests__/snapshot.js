import { render } from '@testing-library/react'
import Home from '../pages/index'
import { OrdersProvider } from '@/context/OrdersContext'

 
it('renders homepage unchanged', () => {
  const { container } = render(
        <OrdersProvider>
            <Home />
        </OrdersProvider>
 )
  expect(container).toMatchSnapshot()
})