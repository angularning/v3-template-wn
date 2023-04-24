<template>
  <el-form class="searchForm">
    <el-form-item label="用户名">
      <el-input
        v-model="search.userName"
        placeholder="请输入用户名称"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input
        v-model="search.mobile"
        placeholder="请输入手机号"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </el-form-item>
    <el-form-item class="searchBtn">
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button
        v-if="props.type === 'pc'"
        type="primary"
        plain
        @click="addUser"
        >添加用户</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { getSystemUserList } from "@/api/user";

const props = defineProps({
  type: {
    type: String,
    default: "pc",
  },
});
const search = reactive({
  userName: "",
  mobile: "",
});

const emit = defineEmits(["add", "search"]);
watch(
  () => search.userName || search.mobile,
  (val) => {
    if (!val) {
      emit("search", search);
    }
  }
);
// search
const handleSearch = async (vm: any) => {
  emit("search", search);
};
// 添加用户
const addUser = () => {
  emit("add");
  // ElMessage.success('添加用户')
};
</script>
<style lang="scss">
.searchForm {
  // margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;

  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
</style>
