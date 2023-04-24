<template>
  <div>
    <el-card class="swiper-container">
      <template #header>
        <div class="header">
          <communityForm @search="handleSearch" @add="handleAdd" />
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
              <p>社区名称: {{ props.row.name }}</p>
              <p>社区ID: {{ props.row.id }}</p>
              <p>社区联系人: {{ props.row.contactUser }}</p>
              <p>社区联系人电话: {{ props.row.contactPhone }}</p>
              <p>社区地址: {{ props.row.address }}</p>
              <p>社区状态: {{ props.row.state === 1 ? "启用" : "停用" }}</p>
              <p>社区工作时间: {{ props.row.workingHours }}</p>
              <p>社区备注: {{ props.row.describe }}</p>
              <div class="seeBtn">
                <el-button
                  type="primary"
                  size="normal"
                  @click="toPlList(props.row)"
                  >查看社区爬楼图</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column border="true" label="社区名称" width="300">
          <template #default="scope">
            <div class="nameAndBtn">
              <div style="width: 100px">{{ scope.row.name }}</div>
              <div class="nameBtn">
                <el-button plain type="primary" @click="toVillage(scope.row)"
                  >查看下属小区</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="社区ID">
          <template #default="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="社区地址" width="300">
          <template #default="scope">
            <span>
              {{ scope.row.address }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="社区备注" width="300">
          <template #default="scope">
            <span>
              {{ scope.row.describe }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <a
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 'edit')"
              >编辑</a
            >
            <a
              v-if="true"
              style="cursor: pointer; margin-right: 10px; color: red"
              @click.stop="handleSolve(scope.row, 'del')"
              >删除</a
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination :pagination="state" @change="changePage" />
    </el-card>
    <addCommunityDialog
      ref="addCommunity"
      :type="state.type"
      @reload="getCommunityList"
    />
  </div>
</template>
<script setup lang="ts">
import addCommunityDialog from "@/components/community/addCommunityDialog.vue";
import {
  communityInfoDel,
  communityInfoList,
  residentialAreaList,
} from "@/api/community";
import { usePlInfo } from "@/pinia/modules/community";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const useStore = usePlInfo();
const router = useRouter();
const multipleTable = ref(null);
const addCommunity = ref<any>(null);
const state = reactive({
  loading: false,
  search: "",
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 1000, // 分页大小
  type: "add", // 操作类型
});
onMounted(() => {
  getCommunityList();
});
// 获取轮播图列表
const getCommunityList = () => {
  state.loading = true;
  const params = {
    platform: "ywtg-applet",
    seat: "home",
    page: state.currentPage,
    pageSize: state.pageSize,
  };
  if (state.search) {
    params.search = state.search;
  }
  communityInfoList(params).then((res) => {
    state.loading = false;
    state.tableData = res.body;
    state.total = res.body.length;
  });
};
// search回调
const handleSearch = (search) => {
  state.search = search;
  getCommunityList();
};
// 添加轮播项
const handleAdd = () => {
  state.type = "add";
  addCommunity.value.open();
};
const handleSolve = (item: { id: string }, type: string) => {
  state.type = type;
  if (type === "edit") {
    addCommunity.value.open(item.id, item);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除社区, 是否继续?", "删除社区", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      communityInfoDel({ id: item.id }).then((item) => {
        if (item.code === 0) {
          ElMessage.success("删除成功");
          getCommunityList();
        }
      });
    });
  }
};
// 选择项
const handleSelectionChange = (val: string) => {
  state.multipleSelection = val;
};
// 单个删除
const handleDeleteOne = (id: string) => {};
const changePage = (val: number) => {
  state.currentPage = val;
  getCommunityList();
};
const toPlList = (res: any) => {
  useStore.community = res;
  const params = {
    communityId: res.id,
  };
  residentialAreaList(params)?.then((item) => {
    if (item.code === 0) {
      if (item.body?.records.length > 0) {
        useStore.residential = item.body.records;
        router.push({
          path: "/community/plList",
          query: {
            id: item.body?.records[0]?.id,
            c: res.id,
            // data: JSON.stringify({ ...res, communityId: res.id }),
          },
        });
      } else {
        ElMessage.warning("暂无小区");
      }
    }
  });
};
// 跳转小区
const toVillage = (item: any) => {
  useStore.community = item;
  router.push({
    path: "/community/residentialList",
    query: {
      id: item.id,
      gov: item.govId
    },
  });
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
</style>
