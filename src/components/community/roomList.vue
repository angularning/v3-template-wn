<template>
  <div>
    <el-card class="container">
      <template #header>
        <div class="header">
          <homeForm @search="handleSearch" @add="handleAdd" />
        </div>
      </template>
      <el-table
        ref="multipleTable"
        v-loading="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column border="true" label="小区名称" width="150">
          <template #default="scope">
            <div class="nameAndBtn">
              <div>{{ scope.row.residentialAreaName }}</div>
              <!--              <div class="nameBtn">-->
              <!--                <el-button plain type="primary" @click="toVillage(scope.row)"-->
              <!--                  >查看下属房屋</el-button-->
              <!--                >-->
              <!--              </div>-->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="楼号">
          <template #default="scope">
            {{ scope.row.buildingNumber }}
          </template>
        </el-table-column>
        <el-table-column label="单元">
          <template #default="scope">
            {{ scope.row.buildingUnitNumber }}
          </template>
        </el-table-column>
        <el-table-column label="楼层">
          <template #default="scope"> 无 </template>
        </el-table-column>
        <el-table-column label="房号">
          <template #default="scope">
            {{ scope.row.roomName }}
          </template>
        </el-table-column>
        <el-table-column label="房屋类型">
          <template #default="scope">
            {{ getRoomType(scope.row.roomType) }}
          </template>
        </el-table-column>
        <el-table-column label="住房人数">
          <template #default="scope"> 无</template>
        </el-table-column>
        <el-table-column label="房屋用途">
          <template #default="scope">
            {{ getPurpose(scope.row.roomPurpose) }}
          </template>
        </el-table-column>
        <template v-if="userStore.roleName === '以房管人'">
          <el-table-column label="九小场所">
            <template #default="scope"> 待填写 </template>
          </el-table-column>
          <el-table-column label="建筑质量">
            <template #default="scope"> 待填写 </template>
          </el-table-column>
          <el-table-column label="消防安全">
            <template #default="scope"> 待填写 </template>
          </el-table-column>
        </template>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <!--            <el-button-->
            <!--              style="cursor: pointer; margin-right: 10px; color: #fff"-->
            <!--              type="primary"-->
            <!--              @click.stop="qrCode(scope.row)"-->
            <!--              >生成二维码</el-button-->
            <!--            >-->
            <a
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 'detail')"
              >查看详情</a
            >
            <a
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 'edit')"
              >编辑</a
            >
            <a
              style="cursor: pointer; margin-right: 10px; color: red"
              @click.stop="handleSolve(scope.row, 'del')"
              >删除</a
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination :pagination="state" @change="changePage" />
    </el-card>
    <addHomeDialog
      ref="addHomeDialogRef"
      :type="state.type"
      @reload="getList"
    />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import addHomeDialog from "@/components/community/addHomeDialog.vue";
import {
  buildingRoomPage,
  generateQrCode,
  buildingRoomDel,
} from "@/api/community";
import { useRouter, useRoute } from "vue-router";
import { usePlInfo } from "@/pinia/modules/community";
import { ElMessageBox, ElMessage } from "element-plus";
import { useUserStore } from "@/pinia/modules/user";

import homeForm from "@/components/community/homeForm.vue";
const useStore = usePlInfo();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const multipleTable = ref(null);
const addHomeDialogRef = ref(null);
const state = reactive({
  loading: false,
  search: "",
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  pageIndex: 1, // 当前页
  pageSize: 10, // 分页大小
  type: "add", // 操作类型
});
onMounted(() => {
  getList();
});
// 翻译getPurpose
const getPurpose = (value: number) => {
  const t = {
    0: "其它",
    1: "自住",
    2: "出租住",
    3: "办公",
    4: "ktv",
    5: "网吧",
    6: "餐馆",
  };
  return t[value];
};
const getRoomType = (value: number) => {
  const t = {
    0: "一居",
    1: "二居",
    2: "三居",
  };
  return t[value];
};
// 生成二维码
const qrCode = (data: any) => {
  const params = { id: data.id, govId: route.query.id, loginId: data.id };
  generateQrCode(params)
    ?.then((item) => {
      if (item.code === 0) {
        ElMessageBox({
          title: "小区二维码",
          dangerouslyUseHTMLString: true,
          message: `<div><img src="${item.body}" alt=""></div>`,
          showCancelButton: true,
          confirmButtonText: "下载",
          cancelButtonText: "取消",
        })
          .then((action) => {
            const a = document.createElement("a");
            a.setAttribute("target", "_blank");
            a.href = item.body;
            a.click();
          })
          .catch((action) => {});
      } else {
        ElMessage.error(`生成失败`);
      }
    })
    .catch((err) => {
      ElMessage.error(
        `状态码：${err.status}, 路径：${err.path}, 错误：${err.error}`
      );
    });
};
// 获取列表
const getList = () => {
  state.loading = true;
  const params = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    communityId: route.query.id,
  };
  if (state.search) {
    params.search = state.search;
  }
  buildingRoomPage(params).then((res) => {
    state.loading = false;
    state.tableData = res.body.records;
    state.total = res.body.total;
  });
};
const handleSolve = (item: { id: string }, type: string) => {
  state.type = type;
  if (type === "edit") {
    addHomeDialogRef.value.open(item.id, item);
  } else if (type === "detail") {
    addHomeDialogRef.value.open(item.id, item);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除房屋, 是否继续?", "删除房屋", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      buildingRoomDel({ id: item.id }).then((res) => {
        if (res.code === 0) {
          ElMessage.success("删除成功");
          setTimeout(() => {
            getList();
          });
        } else {
          ElMessage.warning(res.msg);
        }
      });
      // addHomeDialog.value.del(item.id);
    });
  }
};
// search回调
const handleSearch = (search) => {
  state.search = search;
  getList();
};
// 跳转爬楼图
const toPlList = (item: any) => {
  useStore.residential = [item];
  router.push({
    path: "/community/plList",
    query: {
      id: item.id,
      c: item.communityId,
    },
  });
};
// 点击新增按钮
const handleAdd = () => {
  addHomeDialogRef.value.open();
  state.type = "add";
};

const changePage = (val: number) => {
  state.pageIndex = val;
  getList();
};
</script>
<style scoped lang="scss">
.nameAndBtn {
  display: flex;
  align-items: center;
  .nameBtn {
    margin-left: 15px;
  }
}
.communityDetail {
  background: rgba(64, 158, 255, 0.14);
  padding: 20px 0;
  padding-left: 110px;
  //margin-top: -10px;
  p {
    padding: 10px 0;
  }
}
</style>
