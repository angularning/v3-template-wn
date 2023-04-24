<template>
  <el-dialog
    v-model="visible"
    :title="'爬楼详情'"
    width="600px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="120px"
      class="form"
    >
      <el-form-item label="小区名字：" prop="name">
        <span>{{ state.data.areaName }}</span>
      </el-form-item>
      <el-form-item label="详细地址：" prop="address">
        <span>{{ state.data.address }}</span>
      </el-form-item>
      <el-form-item label="户内人数：" prop="person">
        <span>{{ state.data.populationNumber }}</span>
      </el-form-item>
      <el-form-item label="居住人员信息：" prop="concat">
        <div>
          <el-collapse accordion>
            <el-collapse-item
              v-for="(item, i) in state.data.populationList"
              :key="i"
              :name="i"
            >
              <template #title>
                <div class="houseTitleItem">
                  <span>{{ item.name }}</span
                  ><span>{{ item.gender === 1 ? "男" : "女" }}</span
                  ><span>{{ item.mobile }}</span>
                </div>
              </template>
              <div class="personItem">
                <div>
                  <span>标签：</span>
                  <span>{{ item.labelNameList }}</span>
                </div>
                <div>
                  <span>房东：</span>
                  <span>张老板</span>
                </div>
                <div>
                  <span>电话：</span>
                  <span>{{ item.mobile }}</span>
                </div>
                <div>
                  <span>身份证：</span>
                  <span>{{ item.idCardNumber }}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-form-item>
      <el-form-item label="物业单位名称：" prop="remark">
        <span>{{ state.data.propertyName }}</span>
      </el-form-item>
      <el-form-item label="物业联系人：" prop="remark">
        <span>{{ state.data.propertyManager }}</span>
      </el-form-item>
      <el-form-item label="联系人电话：" prop="remark">
        <span>{{ state.data.managerTelephone }}</span>
      </el-form-item>
      <el-form-item v-if="state.data.storey" label="楼层：" prop="remark">
        <span>{{ state.data.storey }}</span>
      </el-form-item>
      <el-form-item
        v-if="state.data.builtUpArea"
        label="建筑面积："
        prop="remark"
      >
        <span>{{ state.data.builtUpArea }}</span>

        <!--        <el-input v-model="state.ruleForm.remark" type="span"></el-input>-->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { statisticsInfo } from "@/api/community";
import { localGet } from "@/utils";
import { ElMessage } from "element-plus";
const formRef = ref<any>(null);
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});
const emit = defineEmits(["reload"]);
const state = reactive({
  data: {},
  options: [
    {
      value: "ywtg-applet",
      label: "一网统管",
    },
    {
      value: "yfgr-applet",
      label: "以房管人",
    },
    {
      value: "fhaq-applet",
      label: "防火安全",
    },
  ],
  token: localGet("token") || "",
  ruleForm: {
    name: "",
    address: "",
    concat: "",
    person: "",
    remark: "",
  },
  rules: {
    name: [{ required: "true", message: "图片不能为空", trigger: ["change"] }],
    address: [
      { required: "true", message: "地址不能为空", trigger: ["change"] },
    ],
    concat: [
      {
        required: "true",
        message: "负责人联系方式不能为空",
        trigger: ["change"],
      },
    ],
    person: [
      { required: "true", message: "负责人不能为空", trigger: ["change"] },
    ],
    remark: [
      { required: "false", message: "备注不能为空", trigger: ["change"] },
    ],
  },
  id: "",
});
// 获取详情
const getDetail = (data: any) => {
  const params = {
    buildingId: data.buildingId,
    buildingStoreyId: data.buildingStoreyId,
    buildingUnitId: data.buildingUnitId,
    communityId: data.communityId,
    residentialAreaId: data.residentialAreaId,
    roomNumber: data.roomNumber,
    // userId: data.userId,
  };
  statisticsInfo(params).then((item) => {
    if (item.code === 0) {
      state.data = item.body;
    }
  });
};
// 开启弹窗
const open = (data: any) => {
  visible.value = true;
  if (data) {
    getDetail(data);
  }
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
// 重置
const handleClose = () => {
  formRef.value.resetFields();
};
// 提交表单
const submitForm = () => {
  const params = {
    id: state.id,
  };
  // formRef.value.resetFields();
  // addCommunity(params).then((item) => {
  //   ElMessage.success("添加成功");
  //   visible.value = false;
  //   emit("reload");
  // });
};
defineExpose({
  open,
  close,
  visible,
  submitForm,
  state,
  formRef,
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
.houseTitleItem {
  width: 214px;
  span {
    margin-right: 5px;
  }
}
</style>
