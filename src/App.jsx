// src/App.js
import React, { useEffect, useState } from "react";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

function App() {
  const [token, setToken] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);

  useEffect(() => {
    // browser notification permission
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // getToken માટે public VAPID key દિલી પડે છે
        getToken(messaging, { vapidKey: import.meta.env.REACT_APP_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM token:", currentToken);
              setToken(currentToken);
              // send token to your server (optional)
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.log("Error getting token:", err);
          });
      } else {
        console.log("Notification permission not granted.");
      }
    });

    // foreground messages (when app is open)
    const unsubscribe = onMessage(messaging, (payload) => {
      const title = payload.notification?.title || "New message";
      const body = payload.notification?.body || JSON.stringify(payload);
      setLastMsg({ title, body });
      new Notification(title, { body });
    });

    return () => unsubscribe();
  }, []);

  const sendTest = async () => {
    if (!token) return alert("Token not ready");
    const res = await fetch('https://notification-backend-1is2.onrender.com/send-random', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const j = await res.json();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-pink-50 p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-center font-poppins p-6">

        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          🎉 FCM Random Notification Demo 🎯
        </h2>

        <p className="bg-white/70 px-4 py-2 rounded-xl inline-block text-sm text-gray-700 shadow-sm mb-5 break-all">
          <strong>Token:</strong> {token ? token.slice(0, 60) + "..." : "⏳ Not ready yet"}
        </p>

        <button
          onClick={sendTest}
          disabled={!token}
          style={{cursor:"pointer"}}
          className={`px-6 py-3 rounded-full font-semibold text-white text-base shadow-md transition-all duration-200 ${token
              ? "bg-gradient-to-r from-pink-400 to-orange-300 hover:scale-105 hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          🚀 Send Random Notification
        </button>

        {lastMsg && (
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 shadow-md animate-fadeIn">
            <h4 className="text-pink-600 mb-2">📬 Last Message (Foreground)</h4>
            <b className="block text-lg">{lastMsg.title}</b>
            <p className="text-gray-600">{lastMsg.body}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
