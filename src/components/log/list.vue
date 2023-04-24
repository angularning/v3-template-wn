<template>
  <el-card class="guest-container">
    <template #header>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="管理后台更新日志" name="first">
          <el-table
            v-loading="state.loading"
            :data="state.tableData1"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="code" label="版本编码"> </el-table-column>
            <el-table-column prop="time" label="更新时间"> </el-table-column>
            <el-table-column prop="content" label="更新内容"> </el-table-column>
            <el-table-column label="更新状态" width="300">
              <template #default="scope">
                <span>
                  {{ scope.row.status }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="小程序更新日志" name="second">
          <el-table
            v-loading="state.loading"
            :data="state.tableData2"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="code" label="版本编码"> </el-table-column>
            <el-table-column prop="time" label="更新时间"> </el-table-column>
            <el-table-column prop="content" label="更新内容"> </el-table-column>
            <el-table-column label="更新状态" width="300">
              <template #default="scope">
                <span>
                  {{ scope.row.status }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="访问日志" name="third">
          <el-table
            ref="multipleTable"
            v-loading="state.loading"
            :data="state.tableData3"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="访问设备"> </el-table-column>
            <el-table-column prop="mobile" label="时间"> </el-table-column>
            <el-table-column prop="备注" label="备注">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="人口登记日志" name="fourth">
          <el-table
            ref="multipleTable"
            v-loading="state.loading"
            :data="state.tableData4"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="登记时间"> </el-table-column>
            <el-table-column prop="mobile" label="登记设备"> </el-table-column>
            <el-table-column prop="所属社区" label="登记状态">
            </el-table-column>
            <el-table-column label="登记人" width="300">
              <template #default="scope">
                <span>
                  {{ scope.row.location }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="审核日志" name="fifth">
          <el-table
            ref="multipleTable"
            v-loading="state.loading"
            :data="state.tableData5"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="审核人"> </el-table-column>
            <el-table-column prop="mobile" label="审核状态"> </el-table-column>
            <el-table-column prop="所属社区" label="审核时间">
            </el-table-column>
            <el-table-column label="备注" width="300">
              <template #default="scope">
                <span>
                  {{ scope.row.location }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
    <pagination :pagination="state" @change="changePage" />
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import type { TabsPaneContext } from "element-plus";
import { populationInfoPage } from "@/api/common";
const state = reactive({
  loading: false,
  tableData1: [
    {
      code: "v1.1.8.1",
      time: "2022-10-23 22:15:30",
      content: "1. 更新审核列表功能。2。 更新详细列表数据。3. 修改已知问题。",
      status: "成功",
    },
    {
      code: "v1.1.8.0",
      time: "2022-10-22 16:08:20",
      content: "1. 修改已知问题。2. 新增列表模块",
      status: "成功",
    },
    {
      code: "v1.1.7.1",
      time: "2022-10-23 13:14:12",
      content: "1. 修改已知问题。",
      status: "成功",
    },
    {
      code: "v1.1.7.0",
      time: "2022-10-23 08:25:52",
      content: "1. 修改已知问题。",
      status: "成功",
    },
  ], // 数据列表
  tableData2: [
    {
      code: "v1.3.1",
      time: "2022-10-23 13:14:24",
      content: "1. 修改已知问题。",
      status: "成功",
    },
    {
      code: "v1.3.0",
      time: "2022-10-21 12:12:15",
      content: "1. 修改已知问题。",
      status: "成功",
    },
  ], // 数据列表
  tableData3: [], // 数据列表
  tableData4: [], // 数据列表
  tableData5: [], // 数据列表
  total: 0, // 总条数
  page: 1, // 当前页
  pageSize: 10, // 分页大小
  search: "",
});
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.props.name;
};
onMounted(() => {
  getList();
});

// 获取用户列表
const getList = async () => {
  state.loading = true;
  const params = {
    pageIndex: state.page,
    pageSize: state.pageSize,
  };
  if (state.search) {
    params.search = state.search;
  }
  const result: any = await populationInfoPage(params);
  if (result.code === 0) {
    state.loading = false;
    state.tableData = [];
  }
};

const changePage = (val: number) => {
  state.page = val;
  getList();
};
</script>

<style scoped lang="scss">
.guest-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
.roleListDiv {
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
}
</style>
