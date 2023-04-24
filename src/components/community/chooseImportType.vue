<template>
  <el-dialog
    v-model="visible"
    :title="'选择导入类型'"
    width="500px"
    @close="handleClose"
  >
    <div style="padding: 10px 0; display: flex">
      <FileFormData
        v-if="props.type === 'community'"
        accept=".xlsx"
        @loaded="importConfig"
      >
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入社区信息</el-button
          >
        </template>
      </FileFormData>
      <FileFormData
        v-if="props.type === 'resident'"
        accept=".xlsx"
        @loaded="importConfigRes"
      >
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入小区信息</el-button
          >
        </template>
      </FileFormData>
      <FileFormData
        v-if="props.type === 'resident'"
        accept=".xlsx"
        @loaded="importConfigLc"
      >
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入楼层信息</el-button
          >
        </template>
      </FileFormData>
      <FileFormData
        v-if="props.type === 'resident'"
        accept=".xlsx"
        @loaded="importConfigRoom"
      >
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入楼房信息</el-button
          >
        </template>
      </FileFormData>
      <FileFormData
        v-if="props.type === 'home'"
        accept=".xlsx"
        @loaded="newImportHome"
      >
        <template #trigger>
          <el-button type="primary" style="margin-left: 15px"
            >导入房屋信息</el-button
          >
        </template>
      </FileFormData>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { localGet } from "@/utils";
import {
  buildingRoomImport,
  communityInfoImport,
  residentialAreaHouseImport,
  residentialAreaImport,
  roomImport,
} from "@/api/community";
import { ElMessage } from "element-plus";
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "community",
  },
});
const emit = defineEmits(["reload"]);
const addResiId = () => {
  visible.value = false;
  emit("reload", 1);
};
const addHousingId = () => {
  visible.value = false;
  emit("reload", 2);
};
const state = reactive({
  token: localGet("token") || "",
  id: "",
});
const loading = ref(false);
const importConfig = (file: any) => {
  loading.value = true;
  communityInfoImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("reload");
        close();
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
};
const importConfigRes = (file: any) => {
  loading.value = true;
  residentialAreaImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("reload");
        close();
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
};
const importConfigLc = (file: any) => {
  loading.value = true;
  residentialAreaHouseImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("reload");
        close();
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
};
const importConfigRoom = (file: any) => {
  loading.value = true;
  buildingRoomImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("reload");
        close();
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
};

const newImportHome = (file: any) => {
  loading.value = true;
  roomImport(file)
    .then((item) => {
      if (item.code === 0) {
        ElMessage.success("上传成功");
        emit("reload");
        close();
      } else {
        ElMessage.error(item.msg);
      }
    })
    .catch((err) => {
      ElMessage.error("上传失败");
    });
};

// 获取详情
// 开启弹窗
const open = (id: string) => {
  visible.value = true;
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
const handleClose = () => {
  close();
};
defineExpose({
  open,
  close,
  visible,
  state,
});
</script>

<style scoped lang="scss">
.form {
  width: 400px;
  margin: 0 auto;
}
.tip {
  font-size: 14px;
  color: #444;
  padding-bottom: 20px;
}
</style>
