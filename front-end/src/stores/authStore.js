import { reactive } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const authStore = reactive({
  user: null,
  isSignedIn: false,
  auth: null,

  setUser(userData) {
    this.user = userData;
    this.isSignedIn = true;
  },

  async signIn(email, password) {
    const auth = getAuth();
    this.auth = auth;
    const signInData = await signInWithEmailAndPassword(auth, email, password);

    this.setUser(signInData.user);
  },

  async register(email, password) {
    const auth = getAuth();
    this.auth = auth;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set user directly from registration, no need to sign in again
      this.setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },

  async signOutFromFirebase() {
    await signOut(this.auth);
    this.user = null;
    this.isSignedIn = false;
  },

  getUserId() {
    return this.user?.uid || null;
  },

  getUserEmail() {
    return this.user?.email || null;
  },
});
