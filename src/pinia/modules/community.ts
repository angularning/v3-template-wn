import { defineStore } from "pinia";
export const usePlInfo = defineStore({
  id: "plInfo", // id必填，且需要唯一
  persist: {
    key: "plInfo",
    storage: localStorage,
  },
  state: (): any => {
    return {
      community: {},
      residential: {},
    };
  },
  actions: {},
});
