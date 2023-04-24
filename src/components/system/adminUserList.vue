<template>
  <el-card class="guest-container">
    <template #header>
      <!-- <div class="header">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="handleSolve">解除禁用</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="handleForbid">禁用账户</el-button>
            </div> -->
      <FormSearch @search="handleSearch" @add="addUser" />
    </template>
    <el-table
      ref="multipleTable"
      v-loading="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column prop="mobile" label="手机号">
        <template #default="scope">
          {{ encryptionNumber(configStore.appConfig.entry, scope.row.mobile) }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span
            :style="scope.row.state === 1 ? 'color: green;' : 'color: red;'"
          >
            {{ scope.row.state === 1 ? "正常" : "禁用" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="300">
        <template #default="scope">
          <div class="roleListDiv">
            <el-select :model-value="scope.row.roleName">
              <el-option
                v-for="item in state.roleList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
                @click.stop="setUserRole(scope.row, item)"
              >
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
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
  <AddUser ref="addUserRef" :type="propType" @reload="getGuestList" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { encryptionNumber } from "@/utils";
import { sysRoleSelectList, sysUserPage, sysUserUpdate } from "@/api/user";
import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
import { useSysRole } from "../../hooks/index";
const multipleTable = ref(null);
const addUserRef = ref<any>(null);
const propType = ref<string>("add");

const state = reactive({
  search: {},
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  pageIndex: 1, // 当前页
  pageSize: 10, // 分页大小
  roleList: [
    {
      id: 1,
      label: "管理员",
      value: "管理员",
    },
    {
      id: 2,
      label: "社区管理员",
      value: "社区管理员",
    },
    {
      id: 3,
      label: "乡管理员",
      value: "乡管理员",
    },
    {
      id: 4,
      label: "康城社区管理员",
      value: "康城社区管理员",
    },
  ],
});
const { result } = useSysRole();
state.roleList = result;
onMounted(() => {
  getGuestList();
});

// 获取用户列表
const getGuestList = async () => {
  state.loading = true;
  const params = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
  };
  if (state.search.userName) {
    params.userName = state.search.userName;
  }
  if (state.search.mobile) {
    params.mobile = state.search.mobile;
  }
  const result: any = await sysUserPage(params);
  if (result.code === 0) {
    state.loading = false;
    state.tableData = result.body.records;
    state.total = result.body.total;
  }
};
// 选择项
const handleSelectionChange = (val: any) => {
  state.multipleSelection = val;
};
const changePage = (val: number) => {
  state.pageIndex = val;
  getGuestList();
};
const handleSolve = (item: { id: string }, type: string) => {
  if (type === "edit") {
    addUserRef.value.open(item.id);
    propType.value = type;
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除用户, 是否继续?", "删除用户", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addUserRef.value.del(item.id);
    });
  }
};
const handleForbid = () => {
  if (!state.multipleSelection.length) {
    // ElMessage.error("请选择项");
  }
};

// search回调
const handleSearch = (search) => {
  state.search = search;
  getGuestList();
};
// add回调
const addUser = () => {
  addUserRef.value.open();
  propType.value = "add";
  // ElMessage.success('添加成功')
  // getGuestList()
};

// 确定选择
const setUserRole = (row: any, item: any) => {
  console.log("row", row);
  console.log("item", item);
  ElMessageBox.confirm(`确认将${row.account}设置为${item.value}吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 更新单列角色数据
      const params = {
        id: row.id,
        roleId: item.id,
        roleName: item.value,
      };
      sysUserUpdate(params).then((item) => {
        if (item.code === 0) {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
          setTimeout(() => {
            getGuestList();
          }, 1000);
        }
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
