import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import OrderList from '@/components/OrderList'
import { OrdersProvider } from '@/context/OrdersContext'

describe('OrderList',() =>{
    it('should have at least of these table head properties', () =>{
        render(
            <OrdersProvider>
                <OrderList />
            </OrdersProvider>
            )

        expect(screen.getByText("Item Name")).toBeInTheDocument()
        expect(screen.getByText("Payment Status")).toBeInTheDocument()
    })

    it('should have a table', () =>{
        render(
            <OrdersProvider>
                <OrderList />
            </OrdersProvider>
            )

        const myElem  = screen.getByRole('table') // ACT
        expect(myElem).toBeInTheDocument() // ASSERT
    })

}) 



