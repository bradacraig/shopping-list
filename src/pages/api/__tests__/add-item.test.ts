import { describe, it, expect, vi } from 'vitest'
import { post } from '../add-item'

import db from '../../../db/db'

describe('POST /api/add-item', () => {
  it('should return a valid response with item data', async () => {
    const mockFormData = vi.fn().mockImplementation(() => {
      return {
        get: (key: string) => {
          if (key === 'name') return 'Test Item'
          if (key === 'price') return '12.99'
          return null
        },
        has: (key: string) => {
          return key === 'price'
        }
      }
    })

    const mockRequest = { formData: mockFormData }

    const mockContext = { request: mockRequest } as any

    const mockInsert = vi.spyOn(db('items'), 'insert').mockResolvedValue([1])

    const response = await post(mockContext)

    const result = await response.json()

    expect(result).toEqual({
      name: 'Test Item',
      price: 12.99,
      quantity: 1,
      id: expect.any(Number),
    })
  })
})
