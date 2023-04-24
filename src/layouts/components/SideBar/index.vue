<template>
  <div
    :style="{
      width: collapse ? (isMobile ? '0px' : '64px') : '200px',
    }"
    class="sidebar-wrapper"
  >
    <el-scrollbar>
      <div v-if="configStore.appConfig.showLogo" class="sidebar-info">
        <img
          v-if="userStore.roleName === '以房管人'"
          :src="getImage('logoYfgr', 'jpeg')"
        />
        <img v-else :src="getImage('LG', 'png')" />
        <span v-if="!collapse">{{ userStore.roleName }}</span>
      </div>

      <el-menu
        :default-active="onRoutes"
        :collapse="collapse"
        :collapse-transition="true"
        unique-opened
        router
      >
        <template v-for="item in menuItem">
          <template v-if="item?.children?.length">
            <el-sub-menu :key="item.resourceUrl" :index="item.resourceUrl">
              <template #title>
                <i :class="item.resourceIcon"></i>
                <span
                  :class="
                    item.resourceIcon
                      ? 'menu-title'
                      : 'menu-title menu-nullIcon'
                  "
                  >{{ t(item.resourceName) }}</span
                >
              </template>
              <template v-for="childItem in item.children">
                <el-menu-item-group
                  v-if="childItem?.children?.length"
                  :key="childItem.resourceUrl"
                  :index="childItem.resourceUrl"
                >
                  <template #title>
                    <i :class="childItem.resourceIcon"></i>
                    <span
                      :class="
                        childItem.resourceIcon
                          ? 'menu-title'
                          : 'menu-title menu-nullIcon'
                      "
                      >{{ t(childItem.resourceName) }}</span
                    >
                  </template>
                  <el-menu-item
                    v-for="(grandsonItem, i) in childItem.children"
                    :key="i"
                    :index="grandsonItem.resourceUrl"
                  >
                    <span class="menu-title">{{
                      t(grandsonItem.resourceName)
                    }}</span>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item
                  v-else
                  :key="childItem.resourceUrl + 'childItem'"
                  :index="childItem.resourceUrl"
                >
                  <template #title>
                    <i :class="childItem.resourceIcon"></i>
                    <span
                      v-if="t(childItem.resourceName) === '门禁对接'"
                      :class="
                        childItem.resourceIcon
                          ? 'menu-title'
                          : 'menu-title menu-nullIcon'
                      "
                      @click="toUrl"
                      >{{ t(childItem.resourceName) }}
                    </span>
                    <span
                      v-else
                      :class="
                        childItem.resourceIcon
                          ? 'menu-title'
                          : 'menu-title menu-nullIcon'
                      "
                      >{{ t(childItem.resourceName) }}
                    </span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>

          <template v-else>
            <el-menu-item :key="item.resourceUrl" :index="item.resourceUrl">
              <i :class="item.resourceIcon"></i>
              <template #title class="menu-title">{{
                t(item.resourceName)
              }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup name="AdminSidebar">
import { getImage } from "@/utils";
import { useRoute } from "vue-router";
import { adminMenu, fhaq, ywtg, yfgr } from "@/assets/js/resource";
import { useI18n } from "vue-i18n";
import { useTagStore } from "@/pinia/modules/tag";
import { ResourceItem } from "@/types/setting";
import { useConfigStore } from "@/pinia/modules/config";
import { siteName } from "@/router/middleware";
import { judgeEquipment } from "@/utils";
import { useUserStore } from "@/pinia/modules/user";
const isMobile = computed(() => judgeEquipment()); //是否是手机登录
const configStore = useConfigStore();
const { t } = useI18n();
const tagStore = useTagStore();
const route = useRoute();
const userStore = useUserStore();
const menuItem = computed<ResourceItem[]>(() =>
  userStore.roleName === "一网统管" &&
  !userStore.info.roles.includes("ROLE_admin")
    ? ywtg
    : userStore.roleName === "以房管人"
    ? yfgr
    : userStore.roleName === "社区防火安全"
    ? fhaq
    : adminMenu
);
console.log(menuItem);
const onRoutes = computed<string>(() => route.path);
const collapse = computed<boolean>(() => tagStore.collapse);
const toUrl = () => {
  window.open("http://cewen.hikyun.com/");
};
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  height: 100%;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  background-color: var(--af-sidebar-color);
  overflow: auto;

  .sidebar-info {
    box-sizing: border-box;
    padding: 16px 10px 16px 10px;
    background-color: var(--af-sidebar-color);
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      padding-left: 5px;
    }

    span {
      white-space: nowrap;
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      color: var(--af-siteName-color);
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
}
</style>
