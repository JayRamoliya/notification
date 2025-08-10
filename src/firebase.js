import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDLkFvKOm-ZOvFLmPJyQPMPdaoNsSbuNiw",
  authDomain: "notification-ac32a.firebaseapp.com",
  projectId: "notification-ac32a",
  storageBucket: "notification-ac32a.firebasestorage.app",
  messagingSenderId: "272074255856",
  appId: "1:272074255856:web:aa269e8dc2baf05ede4135",
  measurementId: "G-627FEF5Z5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request Permission and Get Token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BHBURZrWawz4B5tkSubxJLeC2oR-o4QIUCojxqkkrO5-Wlsa-l15BV4oZVWBhV-Xt8Hy8mTBncEOlJxtuI6dBMw" // from Firebase Cloud Messaging settings
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.error("An error occurred while retrieving token.", err);
  }
};

// Foreground Message Listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
