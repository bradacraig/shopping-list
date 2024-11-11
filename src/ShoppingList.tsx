import { useEffect, useState } from "react"
import { addItem, deleteItem, fetchItems } from "./shoppingListService"

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  createdAt: Date
}

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([])
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems()
      setItems(items)
    }
    loadItems()
  }, [])

  const handleAddItem = async () => {
    if (itemName) {
      await addItem(itemName, quantity)
      setItems(await fetchItems())
      setItemName("")
      setQuantity(1)
    }
  }

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id)
    setItems(await fetchItems())
  }

  return (
    <div>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item name" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - {item.quantity} <button onClick={() => handleDeleteItem(item.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  )
}

export default ShoppingList