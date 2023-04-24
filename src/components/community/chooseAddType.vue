<template>
  <el-dialog
    v-model="visible"
    :title="'选择新增类型'"
    width="400px"
    @close="close"
  >
    <div style="padding: 10px 0">
      <button class="addBtnBox" @click="addResiId">添加小区信息</button
      ><button class="addBtnBox" @click="addHousingId">添加楼层信息</button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { localGet } from "@/utils";
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "add",
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
// 获取详情
// 开启弹窗
const open = (id: string) => {
  visible.value = true;
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
defineExpose({
  open,
  close,
  visible,
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
