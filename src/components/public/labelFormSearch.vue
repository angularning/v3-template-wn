<template>
  <el-form class="searchForm">
    <el-form-item label="用户名">
      <el-input
        v-model="search.name"
        style="width: 300px"
        placeholder="请输入标签名称查询"
        @keyup.enter.native="handleSearch"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="searchBtn">
      <!--      <el-button type="primary" @click="handleSearch">查询</el-button>-->
      <el-button type="primary" @click="addUser">新增</el-button>
      <!--      <FileFormData accept=".xlsx" @loaded="importConfig">-->
      <!--        <template #trigger>-->
      <!--          <el-button type="primary" style="margin-left: 15px"-->
      <!--            >导入Excel</el-button-->
      <!--          >-->
      <!--        </template>-->
      <!--      </FileFormData>-->
      <!--      <el-button type="primary" plain @click="addUser">导入</el-button>-->
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { communityInfoImport } from "@/api/community";
import { ElMessage } from "element-plus";

const props = defineProps({
  type: {
    type: String,
    default: "pc",
  },
});
const search = reactive({
  name: "",
  phone: "",
});
const emit = defineEmits(["add", "search"]);
const loading = ref(false);
const importConfig = (file: any) => {
  loading.value = true;
  communityInfoImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("search");
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
  // try {
  // const { data, error_code, msg }: any = await taskApi.uploadBatchTask(
  //   params
  // );
  // loading.value = false;
  // if (error_code !== 0) {
  //   return ElMessage.error(`上传文件出错: ${msg}`);
  // }
  // taskStatus.value = "isUpload";
  // task_ids.value.push(data.id);
  // ElMessage.success(msg);
  // } catch (_) {
  //   loading.value = false;
  // }
};

watch(
  () => search.name,
  (val) => {
    if (!val) {
      emit("search", search.name);
    }
  }
);
// search
const handleSearch = async (vm: any) => {
  emit("search", search.name);
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
