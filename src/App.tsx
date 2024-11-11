
import './App.css'
import Auth from './auth/Auth'
import { UserProvider } from './auth/UserContext'
import ShoppingList from './ShoppingList'

function App() {


  return (
    <UserProvider>
      <div>
        <h1>Shopping List</h1>
        <Auth />
        <ShoppingList />
      </div>
    </UserProvider>

  )
}

export default App
