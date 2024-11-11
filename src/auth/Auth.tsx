import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(true) // Toggle between sign-up and login modes

  const handleAuth = async () => {
    setError(null) // Clear any previous error

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Sign-up successful!')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        alert('Login successful!')
      }
    } catch (error) {
      setError(
        isSignUp
          ? 'Failed to sign up. Please try again.'
          : 'Failed to log in. Please check your email and password.'
      )
      console.error('Authentication error:', error)
    }
  }

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Log In'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  )
}

export default Auth
