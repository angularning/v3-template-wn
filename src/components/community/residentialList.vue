<template>
  <div>
    <el-card class="container">
      <template #header>
        <div class="header">
          <residentialForm @search="handleSearch" @add="handleAdd" />
        </div>
      </template>
      <el-table
        ref="multipleTable"
        v-loading="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand" border="true" label="" width="100">
          <template #default="props">
            <div class="communityDetail">
              <p>小区名称: {{ props.row.areaName }}</p>
              <p>小区ID: {{ props.row.id }}</p>
              <p>小区联系人: {{ props.row.propertyManager }}</p>
              <p>小区联系人电话: {{ props.row.managerTelephone }}</p>
              <p v-if="props.row.address">小区地址: {{ props.row.address }}</p>
              <p>小区状态: {{ props.row.state === 1 ? "启用" : "禁用" }}</p>
              <p>小区备注: {{ props.row.describe }}</p>
              <p>物业公司: {{ props.row.propertyName }}</p>
              <div class="seeBtn">
                <el-button
                  type="primary"
                  size="normal"
                  @click="toPlList(props.row)"
                  >查看小区{{
                    userStore.roleName === "以房管人" ? "房屋分布图" : "爬楼图"
                  }}</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column border="true" label="小区名称" width="300">
          <template #default="scope">
            <div class="nameAndBtn">
              <div>{{ scope.row.areaName }}</div>
              <!--              <div class="nameBtn">-->
              <!--                <el-button plain type="primary" @click="toVillage(scope.row)"-->
              <!--                  >查看下属小区</el-button-->
              <!--                >-->
              <!--              </div>-->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小区ID">
          <template #default="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="小区备注">
          <template #default="scope">
            <span>
              {{ scope.row.describe }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button
              style="cursor: pointer; margin-right: 10px; color: #fff"
              type="primary"
              @click.stop="qrCode(scope.row)"
              >生成二维码</el-button
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
    <chooseAddType ref="chooseAddRef" @reload="chooseDialog"></chooseAddType>
    <addResidentialDialog
      ref="addResidential"
      :type="state.type"
      @reload="getList"
    />
    <addHousingDialog ref="addHousing" :type="state.type" @reload="getList" />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import chooseAddType from "@/components/community/chooseAddType.vue";
import addResidentialDialog from "@/components/community/addResidentialDialog.vue";
import addHousingDialog from "@/components/community/addHousingDialog.vue";
import {
  residentialAreaList,
  generateQrCode,
  residentialAreaDel,
} from "@/api/community";
import { useRouter, useRoute } from "vue-router";
import { usePlInfo } from "@/pinia/modules/community";
import { useUserStore } from "@/pinia/modules/user";
import { ElMessageBox, ElMessage } from "element-plus";
import residentialForm from "@/components/community/residentailForm.vue";
const useStore = usePlInfo();
const router = useRouter();
const route = useRoute();
const multipleTable = ref(null);
const chooseAddRef = ref<any>(null);
const addResidential = ref<any>(null);
const addHousing = ref<any>(null);
const userStore = useUserStore();
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
  residentialAreaList(params).then((res) => {
    state.loading = false;
    state.tableData = res.body.records;
    state.total = res.body.total;
  });
};
const handleSolve = (item: { id: string }, type: string) => {
  state.type = type;
  if (type === "edit") {
    addResidential.value.open(item.id, item);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除小区, 是否继续?", "删除小区", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      residentialAreaDel({
        id: item.id,
        communityId: item.communityId,
        govId: route.query.gov,
      }).then((item) => {
        if (item.code === 0) {
          ElMessage.success("删除成功");
          getList();
        }
      });
      // addResidential.value.del(item.id, item);
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
  chooseAddRef.value.open();
  // state.type = "add";
  // addResidential.value.open(route.query.id);
};

// chooseDialog
const chooseDialog = (item: number) => {
  if (item === 1) {
    state.type = "add";
    addResidential.value.open(route.query.id);
  } else if (item === 2) {
    addHousing.value.open();
  }
};

// 选择项
const handleSelectionChange = (val: string) => {
  state.multipleSelection = val;
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
