import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders'

test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`) // .get(BASE_URL + '/1')
  expect(response.status()).toBe(200)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  const responseOrderId0 = await request.get(`${BASE_URL}/0`)
  const responseOrderId11 = await request.get(`${BASE_URL}/11`)
  const responseOrderIdNull = await request.get(`${BASE_URL}/null`)
  const responseOrderIdTest = await request.get(`${BASE_URL}/test`)

  expect(responseOrderId0.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderId11.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderIdNull.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderIdTest.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  // Send a POST request to the server
  const response = await request.post(BASE_URL, {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('delete order with correct id should receive 204', async ({ request }) => {
  const headers = {
    Accept: '*/*',
    api_key: process.env.API_KEY ?? '1234567890123456',
  };

  const id = 1;
  const res = await request.delete(`${BASE_URL}/${id}`, { headers });
  expect(res.status()).toBe(StatusCodes.NO_CONTENT);
});

test('delete order with incorrect id should receive code 400', async ({ request }) => {
  const headers = {
    Accept: '*/*',
    api_key: process.env.API_KEY ?? '1234567890123456',
  };

  const responseOrderId0 = await request.delete(`${BASE_URL}/0`)
  const responseOrderId11 = await request.delete(`${BASE_URL}/11`)
  const responseOrderIdNull = await request.delete(`${BASE_URL}/null`)
  const responseOrderIdTest = await request.delete(`${BASE_URL}/test`)

  expect(responseOrderId0.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderId11.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderIdNull.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseOrderIdTest.status()).toBe(StatusCodes.BAD_REQUEST)
});

test('DELETE with invalid api_key length → 401', async ({ request }) => {
  const res = await request.delete(`${BASE_URL}/1`, {
    headers: { Accept: '*/*', api_key: '12345' },
  });
  expect(res.status()).toBe(StatusCodes.UNAUTHORIZED);
});

test('put order with correct id should receive 200', async ({ request }) => {
  const id = 1;

  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'John Doe',
    customerPhone: '+3725550000',
    comment: 'update via test',
  };

  const res = await request.put(`${BASE_URL}/${id}`, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      api_key: process.env.API_KEY ?? '1234567890123456',
    },
    data: requestBody,
  });
  expect(res.status()).toBe(StatusCodes.OK);
});

test('put order with incorrect id should receive 400', async ({ request }) => {

  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'John Doe',
    customerPhone: '+3725550000',
    comment: 'update via test',
  };

  const headers = {
    Accept: '*/*',
      'Content-Type': 'application/json',
      api_key: process.env.API_KEY ?? '1234567890123456',
  };

  const resId0 = await request.put(`${BASE_URL}/0`, {
    headers: headers,
    data: requestBody,
  });

  const resId11 = await request.put(`${BASE_URL}/11`, {
    headers: headers,
    data: requestBody,
  });

  const resIdNull = await request.put(`${BASE_URL}/`, {
    headers: headers,
    data: requestBody,
  });

  const resIdTest = await request.put(`${BASE_URL}/test`, {
    headers: headers,
    data: requestBody,
  });

  expect(resId0.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(resId11.status()).toBe(StatusCodes.BAD_REQUEST);
  expect(resIdNull.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
  expect(resIdTest.status()).toBe(StatusCodes.BAD_REQUEST);
});

test('put when api_key invalid should receive 401', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string'
  }
  const noKey = await request.put(`${BASE_URL}/1`, {
    headers: {
      api_key: '12345'
    },
    data: requestBody,
  });
  expect(noKey.status()).toBe(StatusCodes.UNAUTHORIZED);
});

