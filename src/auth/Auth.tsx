import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(true) // Toggle between sign-up and login modes

  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Sign-up successful!')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        alert('Login successful!')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred.')
      console.error('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      alert('Google Sign-In successful!')
    } catch (error) {
      console.error('Google Sign-In error:', error)
      setError('Failed to sign in with Google. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isSignUp ? 'Sign Up' : 'Log In'}
      </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleAuth}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* GOOGLE */}
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        Sign in with Google
      </button>

      <p className="mt-4">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 underline ml-2"
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  )
}

export default Auth
