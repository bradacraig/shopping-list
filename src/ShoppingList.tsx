import { useEffect, useState } from 'react'
import {
  addItem,
  deleteItem,
  deleteList,
  fetchItems,
  toggleItemChecked,
} from './shoppingListService'

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  department: string
  checked: boolean
  createdAt: Date
}

const departments = [
  'Produce',
  'Deli',
  'Meat',
  'Chilled',
  'Dairy',
  'Bakery',
  'Canned',
  'Cooking & Baking',
  'Frozen',
  'Miscellaneous',
]

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([])
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [department, setDepartment] = useState(departments[0])

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems()
      setItems(items)
    }
    loadItems()
  }, [])

  const handleAddItem = async () => {
    if (itemName) {
      await addItem(itemName, quantity, department)
      setItems(await fetchItems())
      setItemName('')
      setQuantity(1)
      setDepartment(departments[0])
    }
  }

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id)
    setItems(await fetchItems())
  }

  const handleToggleChecked = async (id: string, checked: boolean) => {
    await toggleItemChecked(id, checked)
    setItems(await fetchItems())
  }

  const handleDeleteList = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete the entire list? This action cannot be undone.'
    )
    if (confirm) {
      await deleteList() // Clear the Firestore database
      setItems([]) // Clear the UI
    }
  }

  // SORT ITEMS

  const sortedItems = [...items].sort((a, b) => {
    const aIndex = departments.indexOf(a.department)
    const bIndex = departments.indexOf(b.department)
    return aIndex - bIndex
  })

  return (
    <div>
      <div className="flex flex-col">
        {/* ITEM NAME */}
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
        {/* QUANTITY */}
        {/* <div className="flex flex-col mb-4">
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
        </div> */}
        {/* DEPARTMENT */}
        <div className="flex flex-col">
          <label htmlFor="department" className="mb-1">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
        onClick={handleAddItem}
      >
        Add Item
      </button>

      <ul className="w-full max-w-md mt-4">
        {sortedItems.map((item) => {
          // console.log(item)
          return (
            <li
              key={item.id}
              className="flex items-center justify-between bg-white border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                {/* Checkbox for toggling checked */}
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleChecked(item.id, item.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <div>
                  <span
                    className={`font-medium ${
                      item.checked ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-gray-500 block text-sm">
                    {item.department}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <span>{item.quantity}</span> */}
                <button
                  className="bg-red-400 text-white py-1 px-2 rounded"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  X
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {items.length > 0 && (
        <button
          className="bg-red-500 text-white py-2 px-4 rounded my-4"
          onClick={handleDeleteList}
        >
          Delete List
        </button>
      )}
    </div>
  )
}

export default ShoppingList
