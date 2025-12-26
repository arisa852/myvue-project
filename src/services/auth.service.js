import { signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export async function userLogin(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  const token = await user.getIdToken()
  return { user, token }
}

export async function userLogout() {
  await signOut(auth)
}


export async function userRegister(email,password) {
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  const token = await user.getIdToken()
  return { user, token }
}

