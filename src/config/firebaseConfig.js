import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  secret: process.env.SECRET,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.FIREBASE_PROJECT_ID,
  storageBucket: "food-ordering-a481b.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export default app;