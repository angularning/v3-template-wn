<template>
  <el-dialog v-model="visible" :title="'维修记录'" width="400px" @close="close">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in activities"
        :key="index"
        :color="item.color"
      >
        <div>
          <div class="normalDiv historyDate">
            <span>{{
              item.updateTime && item.updateTime.replace("T", " ")
            }}</span>
          </div>
          <div class="normalDiv">
            <span>维护类型：</span>
            <span>{{ mapsUp[item.upholdType] }}</span>
          </div>
          <div class="normalDiv">
            <span>维护记录：</span>
            <span>{{ item.handleExplain }}</span>
          </div>
          <div class="normalDiv">
            <div style="display: flex; flex-flow: row wrap">
              <div
                v-for="(it, j) in item.fileUrlList"
                :key="j"
                style="margin-right: 5px"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="it"
                  :preview-src-list="[it]"
                  :initial-index="4"
                  fit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script lang="ts" setup>
import { localGet } from "@/utils";
import { upholdRecordList } from "@/api/common";
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});
const mapsUp = {
  1: "维修",
  0: "日常巡检",
};
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const emit = defineEmits(["reload"]);
const activities = ref([]);
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
const open = (data: any) => {
  visible.value = true;
  if (data) {
    // 请求详情
    const params = {
      pageSize: 100,
      equipmentId: data.id,
      pageIndex: 1,
    };
    upholdRecordList(params).then((item) => {
      if (item.code === 0) {
        activities.value = item.body.records;
      }
    });
  }
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
