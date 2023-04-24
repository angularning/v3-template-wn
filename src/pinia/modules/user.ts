import { defineStore } from "pinia";
import { BaseInfoState } from "@/types/setting";
interface State {
  user: Partial<BaseInfoState["baseInfoForm"]>;
}

export const useUserStore = defineStore({
  id: "userInfo", // id必填，且需要唯一
  persist: {
    key: "userInfo",
    storage: localStorage,
  },
  state: (): {
    sysRole: {};
    user: {};
    miniRole: {};
    info: {};
    roleName: string;
  } => {
    return {
      user: {}, //用户信息
      sysRole: {},
      miniRole: {},
      info: {},
      roleName: "一网统管",
    };
  },
  actions: {},
});
