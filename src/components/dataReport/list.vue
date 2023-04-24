<template>
  <el-card class="guest-container">
    <el-form label-width="120">
      <el-form-item label="社区报表：" class="formItem">
        <div class="normalWidth">
          <el-date-picker
            v-model="state.value1"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
        <el-button type="primary" @click="downloadData(1)">下载数据</el-button>
      </el-form-item>
      <el-form-item label="人口报表：" class="formItem">
        <div class="normalWidth">
          <el-date-picker
            v-model="state.value2"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
        <el-button type="primary" @click="downloadData(2)">下载数据</el-button>
      </el-form-item>
      <el-form-item label="爬楼图报表：" class="formItem">
        <div class="normalWidth">
          <el-date-picker
            v-model="state.value3"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
        <el-button type="primary" @click="downloadData(3)">下载数据</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, TabsPaneContext } from "element-plus";
import { populationInfoPage } from "@/api/common";

const activeName = ref("first");
const multipleTable = ref(null);
const addUserRef = ref<any>(null);
const showDetail = ref<any>(null);
const propType = ref<string>("add");
const state = reactive({
  loading: false,
  value1: "",
  value2: "",
  value3: "",
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  page: 1, // 当前页
  pageSize: 10, // 分页大小
  search: "",
});
const downloadData = (type: number) => {
  ElMessage.success("下载成功");
};
onMounted(() => {
  getList();
});
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
    state.tableData = [];
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
.formItem {
  display: flex;
  align-items: center;
  padding: 20px;
}
.normalWidth {
  width: 500px;
}
</style>
