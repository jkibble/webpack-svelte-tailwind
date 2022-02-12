<script>
  import { initializeApp } from "firebase/app";
  import { firstname, lastname, email, title } from "/lib/lorem.js";
  import toast from "/stores/toasts.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    connectFirestoreEmulator,
  } from "firebase/firestore";

  const firebaseApp = initializeApp({
    // apiKey: "AIzaSyAyQDVVRpHVFTfNCqpjccY02WIcG70wAhY",
    // authDomain: "helical-beaker-330904.firebaseapp.com",
    projectId: "helical-beaker-330904",
    // storageBucket: "helical-beaker-330904.appspot.com",
    // messagingSenderId: "566587270353",
    // appId: "1:566587270353:web:b6fe4ab1f58f045a8e11f0",
    // measurementId: "G-EXV042XVN4",
    databaseURL: "http://localhost:8080",
  });

  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);

  const addUser = async () => {
    const col = collection(db, "users");
    const data = {
      email: email(),
      firstname: firstname(),
      lastname: lastname(),
      title: title(),
    };

    await addDoc(col, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      title: data.title,
    });

    toast.add(
      `User <span class="text-blue-400">${data.firstname} ${data.lastname}</span> <span class="text-lime-400">${data.email}</span> has been added`
    );
  };
</script>

<button class="bg-green-400 p-5" on:click={addUser}>Add To Database</button>
