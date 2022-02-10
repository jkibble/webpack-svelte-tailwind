import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    reset: () => set([]),
    addItem: (item) => update((items) => [...items, item]),
  };
};

export default createStore();
