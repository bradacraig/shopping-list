import db from "../../db/db"
import type { Item } from "../../models/itemModel"
import type { RouteContext } from "../../models/routeContext"

export async function put(context: RouteContext):Promise<Response> {
  const {id} = context.params
  const formData = await context.request.formData()

  const updatedItem: Item = {
    name: formData.get('name') as string,
    quantity: parseInt(formData.get('quantity') as string),
    price: formData.has('price') ? parseFloat(formData.get('price') as string) : undefined
  }

  await db('items').where({id}).update(updatedItem)

  return new Response(JSON.stringify(updatedItem), {status: 200})
}