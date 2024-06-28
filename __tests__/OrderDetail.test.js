import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import OrderDetail from '@/components/OrderDetail'

describe('OrderDetail',() =>{
    it('should have an order ID', () =>{
        render( <OrderDetail id="1" /> )

        expect(screen.getByText(/Order ID/i)).toBeInTheDocument()
    })

})