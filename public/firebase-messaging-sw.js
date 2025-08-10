/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// Your Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyDLkFvKOm-ZOvFLmPJyQPMPdaoNsSbuNiw",
  authDomain: "notification-ac32a.firebaseapp.com",
  projectId: "notification-ac32a",
  storageBucket: "notification-ac32a.firebasestorage.app",
  messagingSenderId: "272074255856",
  appId: "1:272074255856:web:aa269e8dc2baf05ede4135",
  measurementId: "G-627FEF5Z5C"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
