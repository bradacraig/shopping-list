import type { APIRoute } from 'astro'
import db from '../../db/db' 

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)

  // Insert item into the database
  const [newItemId] = await db('items').insert({
    name,
    price,
    quantity: 1,
  })

  // Return a proper Response object with JSON body
  return new Response(
    JSON.stringify({ id: newItemId, name, price, quantity: 1 }),
    {
      status: 201, // HTTP status code for "Created"
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
