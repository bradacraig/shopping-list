import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  createdAt: Date
}

const shoppingListCollection = collection(db, "shoppingList")

export const addItem = async (name: string, quantity: number) => {
  return await addDoc(shoppingListCollection, {
    name, 
    quantity, 
    createdAt: new Date(),
  })
}

export const fetchItems = async (): Promise<ShoppingListItem[]> => {
  const snapshot = await getDocs(shoppingListCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
    } as ShoppingListItem
  })
}

export const deleteItem = async (id: string) => {
  return await deleteDoc(doc(db, "shoppingList", id))
}