<template>
  <el-card class="guest-container">
    <template #header>
      <!-- <div class="header">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="handleSolve">解除禁用</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="handleForbid">禁用账户</el-button>
            </div> -->
      <FormSearch :type="'wx'" @search="handleSearch" @add="addUser" />
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
      <el-table-column prop="platform" label="平台">
        <template #default="scope">
          {{ scope.row.platformDesc }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span :style="scope.row.state == 1 ? 'color: green;' : 'color: red;'">
            {{ scope.row.state == 1 ? "正常" : "禁用" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="220">
        <template #default="scope">
          <div class="roleListDiv">
            <el-select :model-value="state.roleMap[scope.row.roleId]">
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
      <el-table-column label="设置维修员" width="220">
        <template #default="scope">
          <div class="roleListDiv">
            <el-select :model-value="scope.row.equipmentRoleName">
              <el-option
                v-for="item in state.equipmentList"
                :key="item.id"
                :label="item.equipmentCode"
                :value="item.equipmentCode"
                @click.stop="setUserEquipment(scope.row, item)"
              >
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="scope">
          <span>{{ scope.row.createTime.replace("T", " ") }}</span>
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
  <AddMiniUser ref="addMiniUserRef" :type="propType" @reload="getGuestList" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { userInfoList, userInfoUpdate } from "@/api/user";
import { useMiniRole } from "../../hooks/index";
import { encryptionNumber } from "@/utils";
import { equipmentSelectList, settingUpholdUser } from "@/api/common";

import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const multipleTable = ref(null);
const addMiniUserRef = ref<any>(null);
const propType = ref<string>("add");
const state = reactive({
  loading: false,
  search: {},
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  pageIndex: 1, // 当前页
  pageSize: 10, // 分页大小
  roleMap: {
    1: "管理员",
    2: "社区管理员",
    3: "乡管理员",
    4: "康城社区管理员",
  },
  roleList: [],
  equipmentList: [],
});
const { result } = useMiniRole();
state.roleList = result;
onMounted(() => {
  getGuestList();
  getEquipmentList();
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
  const result: any = await userInfoList(params);
  if (result.code === 0) {
    state.loading = false;
    state.tableData = result.body.records;
    state.total = result.body.total;
  }
};
// 获取设备列表
const getEquipmentList = () => {
  equipmentSelectList({})?.then((item) => {
    if (item.code === 0) {
      state.equipmentList = item.body;
    }
  });
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
    addMiniUserRef.value.open(item.id);
    propType.value = type;
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除用户, 是否继续?", "删除用户", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addMiniUserRef.value.del(item.id);
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
  state.search = search;
  getGuestList();
};
// add回调
const addUser = () => {
  addMiniUserRef.value.open();
  propType.value = "add";
  // ElMessage.success('添加成功')
  // getGuestList()
};

// 确定选择
const setUserRole = (row: any, item: any) => {
  ElMessageBox.confirm(`确认将${row.userName}设置为${item.value}吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 更新单列角色数据
      // row, item.value
      const { id, rowId, userName } = row;
      const params = {
        id,
        roleId: item.id,
        userName,
      };
      userInfoUpdate(params).then((item) => {
        if (item.code === 0) {
          getGuestList();
          ElMessage({
            type: "success",
            message: "修改成功",
          });
        } else {
          ElMessage({
            type: "warring",
            message: item.msg,
          });
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
// 设置维修员
const setUserEquipment = (row: any, item: any) => {
  ElMessageBox.confirm(
    `确认将${row.userName}设置为${item.equipmentCode}的维修员吗？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      const { id } = row;
      const params = {
        equipmentId: item.id,
        userId: id,
      };
      settingUpholdUser(params).then((item) => {
        if (item.code === 0) {
          ElMessage.success("设置成功");
          setTimeout(() => {
            getGuestList();
          }, 1000);
        } else {
          ElMessage.error(item.msg);
        }
      });
      // userInfoUpdate(params).then((item) => {
      //   if (item.code === 0) {
      //     getGuestList();
      //     ElMessage({
      //       type: "success",
      //       message: "修改成功",
      //     });
      //   } else {
      //     ElMessage({
      //       type: "warring",
      //       message: item.msg,
      //     });
      //   }
      // });
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
