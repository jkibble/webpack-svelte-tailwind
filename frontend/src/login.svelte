<script>
  import toast from "/stores/toasts.js";
  import Modal from "../components/modal.svelte";
  import { initializeApp } from "firebase/app";
  import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    connectAuthEmulator,
  } from "firebase/auth";

  const firebaseApp = initializeApp({
    projectId: "helical-beaker-330904",
    databaseURL: "http://localhost:8080",
    apiKey: "something goes here",
    authDomain: "localhost",
  });

  window.app = firebaseApp;

  let email = "";
  let password = "";

  const createUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      toast.add("can not create user");
    }
  };

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user);
    } catch (e) {
      toast.add("Login failed");
    }
  };

  const auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:9099");
</script>

<Modal />
<div class="flex">
  <input type="text" bind:value={email} placeholder="Email" />
  <input type="text" bind:value={password} placeholder="Password" />
  <button class="rounded-md bg-green-500 p-3" on:click={createUser}
    >Create User</button
  >
  <button class="rounded-md bg-green-500 p-3" on:click={signIn}>Sign In</button>
</div>
