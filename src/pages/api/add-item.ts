import type { APIRoute } from 'astro'
import db from '../../db/db'
import type { Item } from '../../models/itemModel' // Import the data model

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData()

  // Create an object that matches the Item interface
  const newItem: Item = {
    name: formData.get('name') as string,
    quantity: parseInt(formData.get('quantity') as string) || 1, // Default to 1 if quantity not provided
    price: formData.has('price')
      ? parseFloat(formData.get('price') as string)
      : undefined, // Optional price
  }

  // Insert item into the database
  const [newItemId] = await db('items').insert(newItem)

  // Return the new item as a response
  return new Response(JSON.stringify({ id: newItemId, ...newItem }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
