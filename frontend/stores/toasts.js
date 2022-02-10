import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, set, update, get } = writable([]);
  console.log("loaded toasts");

  return {
    subscribe,
    reset: () => set([]),
    add: (message) => update((toasts) => [...toasts, message]),
  };
};

// export default createStore();

export const toasts = writable([]);
