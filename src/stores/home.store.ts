import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    searchValue: undefined as String | undefined,


  }),

  actions: {},

  getters: {},
});
