import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'

interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  department: string
  checked: boolean
  createdAt: Date
  userId: string
}

const shoppingListCollection = collection(db, 'shoppingList')

export const addItem = async (
  name: string,
  quantity: number,
  department: string
) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')

  console.log('Adding item with userId:', userId) // Debug log
  console.log({
    name,
    quantity,
    department,
    checked: false,
    createdAt: Timestamp.now(),
    userId, // This must match Firestore rules
  })

  return await addDoc(shoppingListCollection, {
    name,
    quantity,
    department,
    checked: false,
    createdAt: Timestamp.now(),
    userId, // This must match Firestore rules
  })
}

export const fetchItems = async (): Promise<ShoppingListItem[]> => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')

  const userItemsQuery = query(
    shoppingListCollection,
    where('userId', '==', userId) // Filter items by userId
  )

  const snapshot = await getDocs(userItemsQuery)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name,
      quantity: data.quantity ?? 1,
      department: data.department ?? 'Miscellaneous',
      checked: data.checked ?? false,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(),
      userId: data.userId,
    } as ShoppingListItem
  })
}

export const toggleItemChecked = async (id: string, checked: boolean) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')

  const itemRef = doc(db, 'shoppingList', id)
  await updateDoc(itemRef, { checked: !checked })
}

export const deleteItem = async (id: string) => {
 const userId = auth.currentUser?.uid;
 if (!userId) throw new Error('User not authenticated');

 const docRef = doc(shoppingListCollection, id);
 await deleteDoc(docRef);
};

export const deleteList = async () => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')

  const userItemsQuery = query(
    shoppingListCollection,
    where('userId', '==', userId) // Match userId for Firestore rules
  )

  const snapshot = await getDocs(userItemsQuery)
  console.log('Documents to delete:', snapshot.docs.length)

  const deletePromises = snapshot.docs.map((docSnapshot) => {
    console.log('Deleting document:', docSnapshot.id)
    deleteDoc(doc(db, 'shoppingList', docSnapshot.id))
  })
  await Promise.all(deletePromises)
  console.log('All documents deleted')
}
