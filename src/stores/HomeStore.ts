import { defineStore } from "pinia";

export const useHomeStore = defineStore("table", {
  state: () => ({
    searchValue: undefined as String | undefined,


  }),

  actions: {},

  getters: {},
});
