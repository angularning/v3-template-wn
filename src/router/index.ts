import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import { useMiddleware } from "./middleware";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    meta: {
      title: "resource.login.name",
    },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    meta: {
      title: "resource.dashboard.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "analysis",
        meta: {
          title: "resource.dashboard.children.analysis",
        },
        component: () => import("@/components/dashboard/analysis.vue"),
      },
      {
        path: "analysis1",
        meta: {
          title: "resource.dashboard.children.analysisgr",
        },
        component: () => import("@/components/dashboard/analysisYfgr.vue"),
      },
      {
        path: "workbench",
        meta: {
          title: "resource.dashboard.children.workbench",
        },
        component: () => import("@/components/dashboard/workbench.vue"),
      },
    ],
  },
  {
    path: "/banner",
    meta: {
      title: "resource.banner.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "list",
        meta: {
          title: "resource.banner.children.bannerList",
        },
        component: () => import("@/components/banner/bannerList.vue"),
      },
    ],
  },
  {
    path: "/kakou",
    meta: {
      title: "resource.kakou.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "menjin",
        meta: {
          title: "resource.kakou.children.menjin",
        },
        component: () => import("@/components/kakou/menjin.vue"),
      },
      {
        path: "equipment",
        meta: {
          title: "resource.kakou.children.equipment",
        },
        component: () => import("@/components/kakou/kakouList.vue"),
      },
    ],
  },
  {
    path: "/houseSafe",
    meta: {
      title: "resource.houseSafe.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "houseSafe1",
        meta: {
          title: "resource.houseSafe.children.houseSafe1",
        },
        component: () => import("@/components/houseSafe/houseSafe1.vue"),
      },
      {
        path: "houseSafe2",
        meta: {
          title: "resource.houseSafe.children.houseSafe2",
        },
        component: () => import("@/components/houseSafe/houseSafe2.vue"),
      },
      {
        path: "houseSafe3",
        meta: {
          title: "resource.houseSafe.children.houseSafe3",
        },
        component: () => import("@/components/houseSafe/houseSafe3.vue"),
      },
    ],
  },
  {
    path: "/mini/banner",
    meta: {
      title: "欢迎使用",
    },
    children: [
      {
        path: "banner1",
        component: () => import("@/components/mini/banner/banner1.vue"),
      },
    ],
  },
  {
    path: "/system",
    meta: {
      title: "resource.system.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "adminUserList",
        meta: {
          title: "resource.system.children.adminUserList",
        },
        component: () => import("@/components/system/adminUserList.vue"),
      },
      {
        path: "miniUserList",
        meta: {
          title: "resource.system.children.miniUserList",
        },
        component: () => import("@/components/system/miniUserList.vue"),
      },
    ],
  },
  // 日志管理
  {
    path: "/log",
    meta: {
      title: "resource.log.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "list",
        meta: {
          title: "resource.log.children.list",
        },
        component: () => import("@/components/log/list.vue"),
      },
    ],
  },
  // 报表管理
  {
    path: "/dataReport",
    meta: {
      title: "resource.dataReport.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "list",
        meta: {
          title: "resource.dataReport.children.list",
        },
        component: () => import("@/components/dataReport/list.vue"),
      },
    ],
  },
  // 公告管理
  {
    path: "/notice",
    meta: {
      title: "resource.notice.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "list",
        meta: {
          title: "resource.notice.children.list",
        },
        component: () => import("@/components/notice/list.vue"),
      },
    ],
  },
  {
    path: "/community",
    meta: {
      title: "resource.community.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "communityList",
        meta: {
          title: "resource.community.children.communityList",
        },
        component: () => import("@/components/community/communityList.vue"),
      },
      {
        path: "residentialList",
        meta: {
          title: "resource.community.children.residentialList",
        },
        component: () => import("@/components/community/residentialList.vue"),
      },
      {
        path: "roomList",
        meta: {
          title: "resource.community.children.roomList",
        },
        component: () => import("@/components/community/roomList.vue"),
      },
      {
        path: "plList",
        meta: {
          title: "resource.community.children.plList",
        },
        component: () => import("@/components/community/plList.vue"),
      },
    ],
  },
  {
    path: "/equipment",
    meta: {
      title: "resource.equipment.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "equipmentManage",
        meta: {
          title: "resource.equipment.children.equipmentManage",
        },
        component: () => import("@/components/equipment/equipmentManage.vue"),
      },
      {
        path: "equipmentList",
        meta: {
          title: "resource.equipment.children.equipmentList",
        },
        component: () => import("@/components/equipment/equipmentList.vue"),
      },
    ],
  },
  {
    path: "/population",
    meta: {
      title: "resource.population.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "populationList",
        meta: {
          title: "resource.population.children.populationList",
        },
        component: () => import("@/components/population/populationList.vue"),
      },
    ],
  },
  {
    path: "/labels",
    meta: {
      title: "resource.labels.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "labelsList",
        meta: {
          title: "resource.labels.children.labelsList",
        },
        component: () => import("@/components/labels/labelsList.vue"),
      },
    ],
  },
  {
    path: "/components",
    meta: {
      title: "resource.function.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "dialogDrag",
        meta: {
          title: "resource.function.children.dialogDrag",
          requiresAuth: true,
        },
        component: () => import("@/components/dialogDrag/index.vue"),
      },
      {
        path: "watermark",
        meta: {
          title: "resource.function.children.watermark",
        },
        component: () => import("@/components/watermark/index.vue"),
      },
      {
        path: "copy",
        meta: {
          title: "resource.function.children.copy",
        },
        component: () => import("@/components/copy/index.vue"),
      },
      {
        path: "computerMonitor",
        meta: {
          title: "resource.function.children.computerMonitor",
        },
        component: () => import("@/components/computerMonitor/index.vue"),
      },
      {
        path: "qrCode",
        meta: {
          title: "resource.function.children.qrCode",
        },
        component: () => import("@/components/qrCode/index.vue"),
      },
      {
        path: "infiniteScroll",
        meta: {
          title: "resource.function.children.infiniteScroll",
        },
        component: () => import("@/components/infiniteScroll/index.vue"),
      },
    ],
  },
  {
    path: "/template",
    meta: {
      title: "resource.template.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "cardList",
        meta: {
          title: "resource.template.children.cardList",
        },
        component: () => import("@/components/template/cardList.vue"),
      },
      {
        path: "easyForm",
        meta: {
          title: "resource.template.children.easyForm",
        },
        component: () => import("@/components/template/easyForm.vue"),
      },
      {
        path: "tableOperation",
        meta: {
          title: "resource.template.children.tableOperation",
        },
        component: () => import("@/components/template/tableOperation.vue"),
      },
    ],
  },
  {
    path: "/editor",
    meta: {
      title: "resource.editor.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "textEditor",
        meta: {
          title: "resource.editor.children.textEditor",
        },
        component: () => import("@/components/editor/textEditor.vue"),
      },
      {
        path: "markdown",
        meta: {
          title: "resource.editor.children.markdown",
        },
        component: () => import("@/components/editor/markdown.vue"),
      },
    ],
  },
  {
    path: "/tips",
    meta: {
      title: "resource.result.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "successTip",
        meta: {
          title: "resource.result.children.successTip",
        },
        component: () => import("@/components/tips/successTip.vue"),
      },
      {
        path: "errorTip",
        meta: {
          title: "resource.result.children.errorTip",
        },
        component: () => import("@/components/tips/errorTip.vue"),
      },
      {
        path: "warningTip",
        meta: {
          title: "resource.result.children.warningTip",
        },
        component: () => import("@/components/tips/warningTip.vue"),
      },
    ],
  },
  {
    path: "/global",
    meta: {
      title: "resource.abnormalPage.name",
    },
    component: () => import("@/layouts/global/index.vue"),
    children: [
      {
        path: "abnormal/404",
        meta: {
          title: "resource.abnormalPage.children.404",
        },
        component: () => import("@/components/abnormal/404.vue"),
      },
      {
        path: "abnormal/403",
        meta: {
          title: "resource.abnormalPage.children.403",
        },
        component: () => import("@/components/abnormal/403.vue"),
      },
      {
        path: "abnormal/networkError",
        meta: {
          title: "resource.abnormalPage.children.networkError",
        },
        component: () => import("@/components/abnormal/networkError.vue"),
      },
      {
        path: "abnormal/build",
        meta: {
          title: "resource.abnormalPage.children.build",
        },
        component: () => import("@/components/abnormal/build.vue"),
      },
    ],
  },
  {
    path: "/setting",
    meta: {
      title: "resource.authority.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "user",
        meta: {
          title: "resource.authority.children.user",
        },
        component: () => import("@/views/setting/user.vue"),
      },
      {
        path: "role",
        meta: {
          title: "resource.authority.children.role",
        },
        component: () => import("@/views/setting/role.vue"),
      },
      {
        path: "resource",
        meta: {
          title: "resource.authority.children.resource",
        },
        component: () => import("@/views/setting/resource.vue"),
      },
    ],
  },
  {
    path: "/main",
    meta: {
      title: "resource.other.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "feedbackCenter",
        meta: {
          title: "resource.message.children.feedbackCenter",
        },
        component: () => import("@/components/message/feedbackCenter.vue"),
      },
      {
        path: "noviceGuide",
        meta: {
          title: "resource.noviceGuide.name",
        },
        component: () => import("@/components/noviceGuide/index.vue"),
      },
      {
        path: "i18n",
        meta: {
          title: "resource.i18n.name",
        },
        component: () => import("@/components/i18n/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

useMiddleware(router); //路由中间件操作

export default router;
