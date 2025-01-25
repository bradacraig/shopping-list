import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useContext } from 'react'
import UserContext from './UserContext'

const UserStatus = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) return <p>Loading...</p>

  const handleLogout = async () => {
    await signOut(auth)
    alert('Logged out successfully!')
  }

  return (
    <div className="text-sm text-gray-600 flex items-center space-x-4">
      {user ? (
        <>
          <span className="font-bold">
            Logged in as: {user.displayName || user.email || 'Unknown User'}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white py-1 px-2 rounded"
          >
            Log Out
          </button>
        </>
      ) : (
        'Not logged in'
      )}
    </div>
  )
}

export default UserStatus
