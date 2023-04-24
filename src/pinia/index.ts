import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import piniaPluginPersist from "pinia-plugin-persist"; //数据持久化

const store = createPinia();
store.use(piniaPluginPersistedstate); //开启数据持久化

export default store;
