import { describe, it, expect, vi, beforeEach } from 'vitest'
import { get } from '../items'
import db from '../../../db/db'

describe('GET /api/items', () => {

  it.skip('should return all items from the database', async () => {


    const mockContext = {
      params: {},
      request: {},
      locals: {},
      headers: new Headers(),
    }

    const response = await get(mockContext as any)

    const result = await response.json()
    

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'apples',
          price: 1.99,
          quantity: 1,
        }),
        expect.objectContaining({
          id: 2,
          name: 'bananas',
          price: 2.99,
          quantity: 2,
        }),
        expect.objectContaining({
          id: 3,
          name: 'milk',
          price: 3.99,
          quantity: 1,
        }),
      ])
    )
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })
})
