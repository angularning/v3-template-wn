<template>
  <el-card class="guest-container">
    <template #header>
      <!-- <div class="header">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="handleSolve">解除禁用</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="handleForbid">禁用账户</el-button>
            </div> -->
      <populationFormSearch @search="handleSearch" @add="addUser" />
    </template>
    <el-table
      ref="multipleTable"
      v-loading="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handdle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="mobile" label="手机号">
        <template #default="scope">
          {{ encryptionNumber(configStore.appConfig.entry, scope.row.mobile) }}
        </template>
      </el-table-column>
      <el-table-column label="地址" width="300">
        <template #default="scope">
          <span>
            {{ scope.row.location }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column label="操作" width="200">
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
  <AddPopulation ref="addUserRef" :type="propType" @reload="getList" />
  <PopulationDetail ref="showDetail" :type="'edit'" @reload="getList" />
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { encryptionNumber } from "@/utils";
import { populationInfoPage } from "@/api/common";

import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const multipleTable = ref(null);
const addUserRef = ref<any>(null);
const showDetail = ref<any>(null);
const propType = ref<string>("add");
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  page: 1, // 当前页
  pageSize: 10, // 分页大小
  search: "",
  ruleForm: {
    accessType: "",
    buildingId: "",
    buildingStoreyId: "",
    buildingUnitId: "",
    communityId: "",
    // "createUser": 0,
    gender: "",
    govId: "",
    // "id": 0,
    idAddress: "",
    idCardNumber: "",
    idCardType: "",
    labels: "",
    location: "",
    mobile: "",
    name: "",
    residentialAreaId: "",
    roomId: "",
    // "updateUser": 0
  },
  idAddressList: [
    {
      id: 1,
      name: "户籍人口",
    },
    {
      id: 2,
      name: "非户籍人口",
    },
  ],
  genderList: [
    {
      id: 0,
      name: "未知",
    },
    {
      id: 1,
      name: "男",
    },
    {
      id: 2,
      name: "女",
    },
    {
      id: 3,
      name: "保密",
    },
  ],
  accessTypeList: [
    {
      id: 1,
      name: "常驻",
    },
    {
      id: 2,
      name: "租住",
    },
  ],
  idCardTypeList: [
    {
      id: 1,
      name: "身份证",
    },
    {
      id: 2,
      name: "驾驶证",
    },
    {
      id: 3,
      name: "港澳台通行证",
    },
  ],
});
onMounted(() => {
  getList();
});
const handdle = (item) => {
  getDetail(item.id);
};
const getDetail = (id: string) => {
  showDetail.value.open(id);
};
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
    state.tableData = result.body.records.map((item: any) => {
      return {
        ...item,
        data: [],
      };
    });
    state.total = result.body.total;
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
    addUserRef.value.open(item.id);
    propType.value = type;
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除人口, 是否继续?", "删除人口", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addUserRef.value.del(item.id);
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
  getList();
};
// add回调
const addUser = () => {
  addUserRef.value.open();
  propType.value = "add";
  // ElMessage.success('添加成功')
  // getGuestList()
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
