<template>
  <el-form class="searchForm">
    <el-form-item label="用户名">
      <el-input
        v-model="search.name"
        style="width: 300px"
        placeholder="请输入手机号或用户名称查询"
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
      <FileFormData accept=".xlsx" @loaded="importConfig">
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入Excel</el-button
          >
        </template>
      </FileFormData>
      <el-button type="plain" style="margin-left: 20px" @click="downloadUrl"
        >下载模板</el-button
      >
      <el-button type="primary" plain @click="patchData">同步数据</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { getSystemUserList } from "@/api/user";
import { populationImport, templateDownloadPopulation } from "@/api/community";
import { ElLoading, ElMessage } from "element-plus";

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
const downloadUrl = () => {
  templateDownloadPopulation({}).then((item) => {
    const link = document.createElement("a"); // 生成一个a标签。
    const url = window.URL.createObjectURL(
      new Blob([item], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    // link.setAttribute('download', 'excel.xlsx')
    link.href = url; // href属性指定下载链接
    link.download = "人口模版.xlsx"; // dowload属性指定文件名
    link.click();
  });
};
const loading = ref(false);
const importConfig = (file: any) => {
  loading.value = true;
  populationImport(file)
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
const patchData = () => {
  // const options = {};
  const loading = ElLoading.service({
    lock: true,
    text: "数据同步中",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
    ElMessage.success("同步完成");
  }, 3000);
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
