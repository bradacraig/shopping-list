import { describe, it, expect, vi } from 'vitest'
import db from '../../../db/db'
import type { RouteContext } from '../../../models/routeContext'
import { put } from '../update-item'

// Mock the database module globally
vi.mock('../../../db/db', () => {
  const whereMock = vi.fn().mockReturnValue({
    update: vi.fn().mockResolvedValue(1), // Simulate successful update
  })

  const dbMock = vi.fn().mockReturnValue({
    where: whereMock,
  })

  return { default: dbMock }
})

describe('PUT /api/items', () => {
  it('should update an item in the database', async () => {
    const mockContext: RouteContext = {
      params: { id: '1' },
      request: {
        formData: vi.fn().mockResolvedValue(
          new Map([
            ['name', 'Updated Item'],
            ['quantity', '3'],
            ['price', '7.99'],
          ])
        ),
      } as any,
    }

    const response = await put(mockContext)

    // Assertions
    expect(response.status).toBe(200)
    const result = await response.json()
    expect(result).toEqual({
      name: 'Updated Item',
      quantity: 3,
      price: 7.99,
    })

    // Ensure the database was called with the correct values
    expect(db).toHaveBeenCalledWith('items')
    expect(db().where).toHaveBeenCalledWith({ id: '1' })
    expect(db().where().update).toHaveBeenCalledWith({
      name: 'Updated Item',
      quantity: 3,
      price: 7.99,
    })
  })
})
