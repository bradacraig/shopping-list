import db from '../../db/db'

export const get = async () => {
  // Fetch all items from the 'items' table
  const items = await db('items').select('*')

  // Return the items in JSON format
  return {
    body: JSON.stringify(items),
    status: 200,
  }
}
