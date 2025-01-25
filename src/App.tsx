import { useUser } from './auth/UserContext'
import ShoppingList from './ShoppingList'
import Auth from './auth/Auth'
import UserStatus from './auth/UserStatus'

function App() {
  const {user, loading} = useUser()
  
  if(loading) {
    return <div className='text-center mt-8'>Loading...</div>
  }

  return (
    <div className="container px-2 md:px-8 lg:px-12 min-h-screen bg-blue-100 flex flex-col items-center justify-center overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <UserStatus />
      {user ? <ShoppingList /> : <Auth />}
    </div>
  )
}

export default App
