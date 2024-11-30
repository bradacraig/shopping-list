import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  department: string
  checked: boolean
  createdAt: Date
}

const shoppingListCollection = collection(db, 'shoppingList')

export const addItem = async (
  name: string,
  quantity: number,
  department: string
) => {
  return await addDoc(shoppingListCollection, {
    name,
    quantity,
    department,
    checked: false,
    createdAt: new Date(),
  })
}

export const toggleItemChecked = async (id: string, checked: boolean) => {
  const itemRef = doc(db, 'shoppingList', id)
  await updateDoc(itemRef, { checked: !checked })
}

export const fetchItems = async (): Promise<ShoppingListItem[]> => {
  const snapshot = await getDocs(shoppingListCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    // console.log('Firestore Data:', data)

    return {
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      department: data.department,
      checked: data.checked ?? false,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
    } as ShoppingListItem
  })
}

export const deleteItem = async (id: string) => {
  return await deleteDoc(doc(db, 'shoppingList', id))
}

export const deleteList = async () => {
  const snapshot = await getDocs(collection(db, 'shoppingList'))
  console.log('Documents to delete:', snapshot.docs.length)

  const deletePromises = snapshot.docs.map((docSnapshot) => {
    console.log('Deleting document:', docSnapshot.id)
    deleteDoc(doc(db, 'shoppingList', docSnapshot.id))
  })
  await Promise.all(deletePromises)
  console.log('All documents deleted')
}
