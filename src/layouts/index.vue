<template>
  <div class="main-wrapper mobile">
    <div
      v-if="isMobile && !collapse"
      class="drawer-bg"
      @click="
        () => {
          tagStore.$patch({
            collapse: true,
          });
        }
      "
    ></div>
    <el-container style="height: 100vh">
      <el-aside style="width: auto">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header height="64px">
          <Header></Header>
        </el-header>
        <el-main>
          <Tags v-if="configStore.appConfig.showTabBar"></Tags>
          <el-scrollbar
            id="screen-display"
            v-loading="!isReload"
            class="main-content"
            :style="{
              height: configStore.appConfig.showTabBar
                ? 'calc(100vh - 120px)'
                : 'calc(100vh - 82px)',
            }"
          >
            <router-view v-slot="{ Component, route }">
              <Transition
                appear
                name="fade"
                appear-active-class="animate__animated animate__pulse"
                enter-active-class="animate__animated animate__fadeIn"
              >
                <keep-alive>
                  <component
                    :is="Component"
                    v-if="route.meta.keepAlive"
                    :key="route.name"
                  />
                </keep-alive>
              </Transition>
              <component
                :is="Component"
                v-if="!route.meta.keepAlive"
                :key="route.name"
              />
            </router-view>
            <!--            <router-view v-if="isReload" v-slot="{ Component, route }">-->
            <!--              <Transition-->
            <!--                appear-->
            <!--                name="fade"-->
            <!--                appear-active-class="animate__animated animate__pulse"-->
            <!--                enter-active-class="animate__animated animate__fadeIn"-->
            <!--              >-->
            <!--                &lt;!&ndash;进入 enter-active-class   移出 leave-active-class  初始 appear-active-class&ndash;&gt;-->
            <!--                &lt;!&ndash;                <KeepAlive :max="configStore.KeepAliveMaxLength">&ndash;&gt;-->
            <!--                &lt;!&ndash;                </KeepAlive>&ndash;&gt;-->
            <!--                <component :is="Component" :key="route.name" />-->
            <!--              </Transition>-->
            <!--            </router-view>-->
            <el-backtop target=".main-content"></el-backtop>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="AdminMain">
import SideBar from "@/layouts/components/SideBar/index.vue";
import Header from "@/layouts/components/Header/index.vue";
import Tags from "@/layouts/components/Tags/index.vue";
import { useConfigStore } from "@/pinia/modules/config";
import { useTagStore } from "@/pinia/modules/tag";
import { judgeEquipment } from "@/utils";
import { useUserStore } from "@/pinia/modules/user";
const configStore = useConfigStore();
const isReload = ref<boolean>(true);
const tagStore = useTagStore();
const collapse = computed(() => tagStore.collapse); //打开关闭sidebar
const isMobile = computed(() => judgeEquipment()); //是否是手机登录
const reload = () => {
  isReload.value = false;
  nextTick(() => {
    setTimeout(() => {
      isReload.value = true;
    }, 500);
  });
};
const userStore = useUserStore();

const roleName = userStore.roleName;
onMounted(() => {
  if (roleName === "消防安全") {
    userStore.roleName = "社区防火安全";
    setTimeout(() => {
      location.reload();
    }, 100);
  }
});
provide("reload", reload);
</script>
<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .el-aside {
    position: relative;
    overflow: hidden;
  }

  .el-header,
  .el-main {
    padding: 0;
  }

  .el-main {
    .main-content {
      box-sizing: border-box;
      margin: 8px 5px 8px 5px;
      color: #515a6e;
      // padding-bottom: 12px;
    }
  }

  .el-affix--fixed,
  .el-overlay {
    right: 8px !important;
    position: fixed;
  }
}
</style>
