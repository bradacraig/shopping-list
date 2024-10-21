import type { APIRoute } from 'astro'
import db from '../../db/db'
import type { Item } from '../../models/itemModel'

export const get: APIRoute = async () => {
  const items: Item[] = await db('items').select('*')

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
