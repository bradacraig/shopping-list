import { UserProvider } from './auth/UserContext'
import ShoppingList from './ShoppingList'

function App() {
  return (
    <UserProvider>
      <div className="container px-2 md:px-8 lg:px-12 min-h-screen bg-blue-100 flex flex-col items-center justify-center overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

        <ShoppingList />
      </div>
    </UserProvider>
  )
}

export default App
