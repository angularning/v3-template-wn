<template>
  <el-upload
    ref="Uploader"
    action="upload"
    :name="uploadId"
    :file-list="fileList"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="handleChange"
    :http-request="httpRequest"
    :limit="limit"
    :accept="accept"
  >
    <slot name="trigger" />
  </el-upload>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { UploadInstance } from "element-plus";
const props = defineProps({
  accept: {
    type: String,
    default: () => "",
  },
  limit: {
    type: Number,
    default: () => 1,
  },
  name: {
    // 后端定义的上传字段
    type: String,
    default: "file",
  },
});
const uploadId = Math.random().toString(36).substr(2).toLocaleUpperCase();
const Uploader = ref<UploadInstance>();

const handleChange = (file: any, fileList: any) => {
  // const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
  // const isTYPE = props.accept.includes(extension);
  // if (!isTYPE) {
  //   return ElMessage.error(`文件必须为 ${props.accept} 类型`);
  // }
  // 限制上传文件的大小
  const isLt = file.size / 1024 / 1024 <= 5;
  if (!isLt) {
    return ElMessage.error("上传文件大小不得大于5MB!");
  }
  // 触发上传文件列表的方法
  Uploader.value!.submit();
};
const emit = defineEmits(["loaded"]);
const fileList = ref([]);
const fm = new FormData();
const httpRequest = (file: any) => {
  fm.append("file", file.file);
  emit("loaded", file.file);
  setTimeout(() => {
    fm.delete(props.name);
    fileList.value = [];
  });
};
</script>
