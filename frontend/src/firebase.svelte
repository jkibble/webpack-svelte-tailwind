<script>
  import { onMount } from "svelte";
  import { initializeApp } from "firebase/app";
  import faker from "/lib/faker.js";
  import toast from "/stores/toasts.js";
  import {
    getFirestore,
    collection,
    addDoc,
    query,
    getDocs,
    connectFirestoreEmulator,
  } from "firebase/firestore";

  const firebaseApp = initializeApp({
    projectId: "helical-beaker-330904",
    databaseURL: "http://localhost:8080",
  });

  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);

  const addUser = async () => {
    const col = collection(db, "users");
    const data = {
      firstname: faker.firstname(),
      lastname: faker.lastname(),
      email: faker.email(),
      title: faker.title(),
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

  const q = query(collection(db, "users"));

  const documents = getDocs(collection(db, "users")).then((docs) => {
    return docs.forEach((data) => {
      console.log(data.data());
    });
  });
</script>

<button class="bg-green-400 p-5" on:click={addUser}>Add To Database</button>

{#await documents}
  <div>no docs yet</div>
{:then docs}
  <table>
    <tr>
      <td>First</td>
      <td>Last</td>
      <td>Title</td>
      <td>Email</td>
    </tr>
    {#each docs as doc}
      <tr>
        <td>{doc.data().firstname}</td>
        <td>{doc.data().lastname}</td>
        <td>{doc.data().title}</td>
        <td>{doc.data().email}</td>
      </tr>
    {/each}
  </table>
{/await}
