import { createApp } from "vue";
import "@/pinia/modules/config";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/pinia";
// import 'uno.css'
import "default-passive-events";
import "vue-global-api"; //自动引入vue插件
import { loadAllPlugins } from "@/plugins";
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
app.use(ElementPlus, { locale: zhCn });
// 加载所有插件
loadAllPlugins(app);
app.use(router);
app.use(pinia);
app.mount("#app");
