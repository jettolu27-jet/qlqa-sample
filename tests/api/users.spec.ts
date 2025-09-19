import { test, expect } from '@playwright/test';

test.describe('HTTPBin API (stable)', () => {
  const BASE = 'https://httpbin.org';

  test('GET /get returns 200 and has url', async ({ request }) => {
    const res = await request.get(`${BASE}/get`, { params: { page: 2 } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('url');
  });

  test('POST /post returns 200 and echoes json', async ({ request }) => {
    const payload = { name: 'Applicant', job: 'QA' };
    const res = await request.post(`${BASE}/post`, { data: payload });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('json');
    expect(body.json).toMatchObject(payload);
  });
});
