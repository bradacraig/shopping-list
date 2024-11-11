import { useEffect, useState } from 'react'
import { addItem, deleteItem, fetchItems } from './shoppingListService'

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  createdAt: Date
}

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([])
  const [itemName, setItemName] = useState('')
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
      setItemName('')
      setQuantity(1)
    }
  }

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id)
    setItems(await fetchItems())
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col mb-4">
          <label htmlFor="itemName" className="mb-1">
            Name
          </label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item name"
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="quantity" className="mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            className="border border-gray-300 rounded px-2 py-1 w-20"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleAddItem}
      >
        Add Item
      </button>

      <ul className="w-full max-w-md mt-4">
        {items.map((item) => (
          <li key={item.id}
          className='flex items-center justify-between bg-white border border-gray-200'>
            <div>
              <span className='font-medium ml-2'>{item.name}</span>
            </div>
            <div className='flex items-center space-x-4'>
              <span>{item.quantity}</span>
              <button
                className="bg-red-400 text-white py-1 px-2 rounded"
                onClick={() => handleDeleteItem(item.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShoppingList
