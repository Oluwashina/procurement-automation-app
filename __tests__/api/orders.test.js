import handler from '../../pages/api/orders';
import path from 'path';
import { promises as fs } from 'fs';
import { createMocks } from 'node-mocks-http';
import supertest from 'supertest';

// Mock the fs module
jest.mock('fs', () => {
  return {
    ...jest.requireActual('fs'),
    promises: {
      readFile: jest.fn(),
      writeFile: jest.fn(),
    },
  };
});

describe('/api/orders', () => {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'orders.json');

  beforeEach(() => {
    // Reset the mock implementation before each test
    fs.readFile.mockReset();
    fs.writeFile.mockReset();
  });

  test('GET method returns orders', async () => {

    const mockOrders = [
      { id: 1, customerName: 'John Doe', item_name: 'Iphone11 pro max', quantity: 5, created_at: '18/08/2024', payment_status: 'paid', status: 'pending' },
      { id: 2, customerName: 'Jola Shade', item_name: 'Baileys Original 70cl', quantity: 4, created_at: '18/02/2023', payment_status: 'pending', status: 'in_transit' },
    ];

    fs.readFile.mockResolvedValue(JSON.stringify(mockOrders));

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockOrders);
  });

  test('POST method adds a new order', async () => {
    const mockOrders = [
      { id: 1, customerName: 'John Doe', item_name: 'Iphone11 pro max', quantity: 5, created_at: '18/08/2024', payment_status: 'paid', status: 'pending' },
    ];
    const newOrder = { customerName: 'Jola Shade', item_name: 'Baileys Original 70cl', quantity: 4, created_at: '18/02/2023', payment_status: 'pending', status: 'in_transit' };

    fs.readFile.mockResolvedValue(JSON.stringify(mockOrders));
    fs.writeFile.mockResolvedValue();

    const { req, res } = createMocks({
      method: 'POST',
      body: newOrder,
    });

    await handler(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({ ...newOrder, id: 2 });

    expect(fs.writeFile).toHaveBeenCalledWith(
      filePath,
      JSON.stringify([...mockOrders, { ...newOrder, id: 2 }], null, 2)
    );
  });

  test('returns 405 for unsupported methods', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.getHeader('Allow')).toEqual(['GET', 'POST']);
  });
});
