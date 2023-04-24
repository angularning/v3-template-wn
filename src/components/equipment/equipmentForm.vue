<template>
  <el-form class="searchForm">
    <!--    <el-form-item label="">-->
    <!--      <el-input-->
    <!--        v-model="search.name"-->
    <!--        class="searchInput"-->
    <!--        placeholder="输入社区名称或者ID进行搜索"-->
    <!--        :prefix-icon="Search"-->
    <!--        @keyup.enter="handleSearch"-->
    <!--      >-->
    <!--        <template #append>-->
    <!--          <el-button type="primary" @click="handleSearch">搜索</el-button>-->
    <!--        </template>-->
    <!--      </el-input>-->
    <!--    </el-form-item>-->
    <el-form-item class="searchBtn">
      <el-button type="primary" @click="add">新增</el-button>
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
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { equipmentImport, templateDownload } from "@/api/community";

const search = reactive({
  name: "",
  phone: "",
});
const downloadUrl = () => {
  templateDownload({}).then((item) => {
    const link = document.createElement("a"); // 生成一个a标签。
    const url = window.URL.createObjectURL(
      new Blob([item], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    // link.setAttribute('download', 'excel.xlsx')
    link.href = url; // href属性指定下载链接
    link.download = "社区模版.xlsx"; // dowload属性指定文件名
    link.click();
  });
};
const emit = defineEmits(["add", "search"]);
const reload = () => {
  emit("search", search.name);
};
const loading = ref(false);
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
// 新增社区
const add = () => {
  emit("add");
  // ElMessage.success('添加用户')
};

const importConfig = (file: any) => {
  loading.value = true;
  equipmentImport(file)
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
};
</script>
<style lang="scss">
.searchForm {
  // margin-bottom: 20px;
  text-align: center;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;

  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
  .searchInput {
    width: 350px;
  }
}
</style>
