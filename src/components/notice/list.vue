<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" @click="addUser">新增</el-button>
      </div>
    </template>
    <el-table
      ref="multipleTable"
      v-loading="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handdle"
    >
      <!--      设备id  设备状态  所属社区  地址-->
      <el-table-column prop="name" label="公告名称"> </el-table-column>
      <el-table-column prop="mobile" label="公告内容" width="300">
      </el-table-column>
      <el-table-column prop="发布时间" label="发布时间"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px; color: dodgerblue"
            @click.stop="handleSolve(scope.row, 'edit')"
            >编辑</a
          >
          <a
            style="cursor: pointer; margin-right: 10px; color: dodgerblue"
            @click.stop="handleSolve(scope.row, 'publish')"
            >发布</a
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
  <addNotice ref="addNoticeRef" :type="propType" @reload="getList"></addNotice>
  <!--  <AddPopulation ref="addUserRef" :type="propType" @reload="getList" />-->
  <!--  <PopulationDetail ref="showDetail" :type="'edit'" @reload="getList" />-->
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { populationInfoPage } from "@/api/common";
import { getNoticeList } from "@/api/community";
// import addNotice from "./addNotice";
const multipleTable = ref(null);
const addNoticeRef = ref<any>(null);
const propType = ref<string>("add");
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  page: 1, // 当前页
  pageSize: 10, // 分页大小
  search: "",
  ruleForm: {},
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
  // showDetail.value.open(id);
};
// 获取用户列表
const getList = async () => {
  state.loading = true;
  const result: any = await getNoticeList();
  console.log(result);
  // if (result.code === 0) {
  //   state.loading = false;
  //   state.tableData = [];
  // }
};

const changePage = (val: number) => {
  state.page = val;
  getList();
};
const handleSolve = (item: { id: string }, type: string) => {
  propType.value = type;
  if (type === "edit") {
    addNoticeRef.value.open(item.id);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除公告, 是否继续?", "删除公告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addNoticeRef.value.del(item.id);
    });
  } else if (type === "publist") {
    ElMessage.success("发布成功");
  }
};
// search回调
const handleSearch = (search) => {
  state.search = search;
  getList();
};
// add回调
const addUser = () => {
  addNoticeRef.value.open();
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
