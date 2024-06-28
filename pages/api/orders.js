// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'orders.json');

  if (req.method === 'GET') {
    try {
      // Read the json file
      const fileContents = await fs.readFile(filePath, 'utf8');

      // Parse the file contents to JSON
      const orders = JSON.parse(fileContents);

      // Send the JSON response
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'On Vercel, the filesystem is read-only' });
    }
  } else if (req.method === 'POST') {
    try {
      // Read the json file
      const fileContents = await fs.readFile(filePath, 'utf8');

      // Parse the file contents to JSON
      const orders = JSON.parse(fileContents);

      // Get the new order from the request body
      const newOrder = req.body;

      // Generate a new ID for the order
      newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1;

      // Add the new order to the list
      orders.push(newOrder);

      // Write the updated orders back to the json file
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2));

      // Send the JSON response
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'On Vercel, the filesystem is read-only' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

