// pages/api/orders/[id].js

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { id } = req.query;
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'orders.json');

  if (req.method === 'GET') {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const orders = JSON.parse(fileContents);
      const order = orders.find(order => order.id === parseInt(id, 10));

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const orders = JSON.parse(fileContents);
      const orderIndex = orders.findIndex(order => order.id === parseInt(id, 10));

      if (orderIndex !== -1) {
        const updatedOrder = { ...orders[orderIndex], ...req.body };
        orders[orderIndex] = updatedOrder;
        await fs.writeFile(filePath, JSON.stringify(orders, null, 2));
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const orders = JSON.parse(fileContents);
      const newOrders = orders.filter(order => order.id !== parseInt(id, 10));

      if (orders.length !== newOrders.length) {
        await fs.writeFile(filePath, JSON.stringify(newOrders, null, 2));
        res.status(200).json({ message: 'Order deleted' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
