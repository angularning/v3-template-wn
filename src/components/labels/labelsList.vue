<template>
  <el-card class="guest-container">
    <template #header>
      <!-- <div class="header">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="handleSolve">解除禁用</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="handleForbid">禁用账户</el-button>
            </div> -->
      <labelFormSearch @search="handleSearch" @add="addUser" />
    </template>
    <el-table
      ref="multipleTable"
      v-loading="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="labelName" label="标签名字"> </el-table-column>
      <el-table-column prop="id" label="标签ID"> </el-table-column>
      <el-table-column prop="describe" label="标签描述" width="260">
      </el-table-column>
      <el-table-column prop="createTime" label="标签颜色">
        <template #default="scope">
          <a
            :style="{
              width: '100px',
              height: '30px',
              display: 'inline-block',
              background: scope.row.colorRGBCode,
            }"
          >
          </a>
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
            style="cursor: pointer; margin-right: 10px; color: red"
            @click.stop="handleSolve(scope.row, 'del')"
            >删除</a
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination :pagination="state" @change="changePage" />
  </el-card>
  <AddLabel ref="addLabelRef" :type="propType" @reload="getList" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { labelsInfoPage } from "@/api/common";
import { translateDate } from "@/utils";
const multipleTable = ref(null);
const addLabelRef = ref<any>(null);
const propType = ref<string>("add");
const state = reactive({
  loading: false,
  labelName: "",
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  page: 1, // 当前页
  pageSize: 10, // 分页大小
});
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
  if (state.labelName) {
    params.labelName = state.labelName;
  }
  const result: any = await labelsInfoPage(params);
  if (result.code === 0) {
    state.loading = false;
    state.tableData = result.body.records;
    state.total = result.body.length;
  }
};
// 选择项
const handleSelectionChange = (val: any) => {
  state.multipleSelection = val;
};
const changePage = (val: number) => {
  state.page = val;
  getList();
};
const handleSolve = (item: { id: string }, type: string) => {
  if (type === "edit") {
    addLabelRef.value.open(item);
    propType.value = type;
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除标签, 是否继续?", "删除标签", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addLabelRef.value.del(item);
    });
  }
  if (!state.multipleSelection.length) {
    // ElMessage.error("请选择项");
  }
};
const handleForbid = () => {
  if (!state.multipleSelection.length) {
    // ElMessage.error("请选择项");
  }
};

// search回调
const handleSearch = (search) => {
  state.labelName = search;
  getList();
};
// add回调
const addUser = () => {
  addLabelRef.value.open();
  propType.value = "add";
  // ElMessage.success('添加成功')
  // getGuestList()
};

// 确定选择
const setUserRole = (row: any, item: any) => {
  ElMessageBox.confirm(`确认将${row.nickName}设置为${item.value}吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 更新单列角色数据
      // patchUserStatus(row, item.value);
      setTimeout(() => {
        getList();
      }, 10);
      ElMessage({
        type: "success",
        message: "修改成功",
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "Delete canceled",
      // });
    });
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
