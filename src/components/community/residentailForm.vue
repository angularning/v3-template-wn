<template>
  <el-form class="searchForm">
    <el-form-item label="">
      <el-input
        v-model="search.name"
        class="searchInput"
        placeholder="输入小区名称或者ID进行搜索"
        :prefix-icon="Search"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="searchBtn">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary" @click="importChoose">导入</el-button>
      <el-button type="plain" style="margin-left: 20px" @click="downloadUrl"
        >下载小区模板</el-button
      ><el-button type="plain" style="margin-left: 20px" @click="downloadUrlLc"
        >下载楼层模板</el-button
      ><el-button type="plain" style="margin-left: 20px" @click="downloadUrlFw"
        >下载楼房模板</el-button
      >
    </el-form-item>
  </el-form>
  <chooseImport ref="chooseImportType" :type="'resident'" @reload="reload" />
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import {
  residentialAreaImport,
  templateDownloadFw,
  templateDownloadLc,
  templateDownloadR1,
} from "@/api/community";
import chooseImport from "@/components/community/chooseImportType.vue";
const chooseImportType = ref("");

const search = reactive({
  name: "",
  phone: "",
});
// 导入模版呢选择
const importChoose = () => {
  chooseImportType.value.visible = true;
};
const emit = defineEmits(["add", "search"]);
const reload = () => {
  emit("search", search.name);
};
const downloadUrl = () => {
  templateDownloadR1({}).then((item) => {
    const link = document.createElement("a"); // 生成一个a标签。
    const url = window.URL.createObjectURL(
      new Blob([item], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    link.href = url; // href属性指定下载链接
    link.download = "小区模版.xlsx"; // dowload属性指定文件名
    link.click();
  });
};
const downloadUrlLc = () => {
  templateDownloadLc({}).then((item) => {
    const link = document.createElement("a"); // 生成一个a标签。
    const url = window.URL.createObjectURL(
      new Blob([item], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    link.href = url; // href属性指定下载链接
    link.download = "楼层模版.xlsx"; // dowload属性指定文件名
    link.click();
  });
};
// 下载房屋
const downloadUrlFw = () => {
  templateDownloadFw({}).then((item) => {
    const link = document.createElement("a"); // 生成一个a标签。
    const url = window.URL.createObjectURL(
      new Blob([item], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    link.href = url; // href属性指定下载链接
    link.download = "楼房模版.xlsx"; // dowload属性指定文件名
    link.click();
  });
};
const loading = ref(false);
const importConfig = (file: any) => {
  loading.value = true;
  residentialAreaImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("search");
      } else {
        ElMessage.error("上传失败");
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
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
// 新增社区
const add = () => {
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
  .searchInput {
    width: 350px;
  }
}
</style>
