import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    reset: () => set([]),
    add: (message) => {
      update((toasts) => [...toasts, message]);

      setTimeout(() => {
        update((toasts) => {
          toasts.shift();
          return toasts;
        });
      }, 5000);
    },
  };
};

export default createStore();
