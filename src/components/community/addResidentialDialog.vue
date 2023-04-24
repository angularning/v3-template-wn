<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加小区信息' : '编辑小区信息'"
    width="600px"
    @close="handleClose"
  >
    <div class="tip">小区基本信息，支持Excel导入</div>
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="小区名称" prop="areaName">
        <el-input v-model="state.ruleForm.areaName" type="text"></el-input>
      </el-form-item>
      <el-form-item
        v-if="state.ruleForm.address"
        label="小区地址"
        prop="address"
      >
        <el-input v-model="state.ruleForm.address" type="text"></el-input>
      </el-form-item>
      <el-form-item label="物业状态：" prop="propertyStatus">
        <el-select
          v-model="state.ruleForm.propertyStatus"
          class="normalSelect"
          placeholder="请选择物业状态"
        >
          <el-option
            v-for="item in state.propertyStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="state.ruleForm.propertyStatus === 1">
        <el-form-item label="物业名称" prop="propertyName">
          <el-input
            v-model="state.ruleForm.propertyName"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="物业负责人" prop="propertyManager">
          <el-input
            v-model="state.ruleForm.propertyManager"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="managerTelephone">
          <el-input
            v-model="state.ruleForm.managerTelephone"
            type="text"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item label="小区描述" prop="describe">
        <el-input v-model="state.ruleForm.describe" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width: 200px; margin-top: 15px"
          type="primary"
          size="large"
          @click="submitForm"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { localGet } from "@/utils";
import { ElMessage } from "element-plus";
import {
  residentialAreaAdd,
  residentialAreaDel,
  residentialAreaEdit,
} from "@/api/community";
import { useRoute, useRouter } from "vue-router";
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
    areaName: "",
    communityId: "",
    // createUser: 0,
    describe: "",
    // id: 0,
    managerTelephone: "",
    // positionX: 0,
    // positionY: 0,
    propertyManager: "",
    propertyName: "",
    propertyStatus: 0,
    // updateUser: 0,
  },
  propertyStatusList: [
    {
      id: 0,
      name: "无物业",
    },
    {
      id: 1,
      name: "有物业",
    },
  ],
  rules: {
    name: [{ required: "false", message: "图片不能为空", trigger: ["change"] }],
    address: [
      { required: "false", message: "地址不能为空", trigger: ["change"] },
    ],
    concat: [
      {
        required: "false",
        message: "负责人联系方式不能为空",
        trigger: ["change"],
      },
    ],
    person: [
      { required: "false", message: "负责人不能为空", trigger: ["change"] },
    ],
    remark: [
      { required: "false", message: "备注不能为空", trigger: ["change"] },
    ],
  },
  id: "",
});
const route = useRoute();
// 获取详情
// const getDetail = (id: string) => {};
// 开启弹窗
const open = (id: string, data: any) => {
  visible.value = true;
  // 如果是编辑，删除一些字端
  if (id && data) {
    state.id = id;
    delete data.createUser;
    delete data.updateTime;
    delete data.positionY;
    delete data.positionX;
    delete data.createTime;
    delete data.updateUser;
    delete data.isFlag;
    delete data.state;
    state.ruleForm = data;
    state.ruleForm.communityId = route.query.id || 1;
    // getDetail(id);
  } else if (id) {
    // 如果新增，可能存在从左侧菜单点击，所以默认0
    state.ruleForm.communityId = route.query.id || 1;
    // getDetail(id);
  } else {
    handleClose();
  }
};
// "communityId": 0,
//   "govId": 0,
//   "id": 0,
const del = (id: string, item: any) => {
  // console.log("item", item);
  // residentialAreaDel({ id, communityId: route.query.id }).then((item) => {
  //   if (item.code === 0) {
  //     ElMessage.success("删除成功");
  //   }
  // });
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
// 重置
const handleClose = () => {
  state.ruleForm = {
    areaName: "",
    communityId: "",
    // createUser: 0,
    describe: "",
    // id: 0,
    managerTelephone: "",
    // positionX: 0,
    // positionY: 0,
    propertyManager: "",
    propertyName: "",
    propertyStatus: 1,
    // updateUser: 0,
  };
};
// 提交表单
const submitForm = () => {
  const params = state.ruleForm;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        residentialAreaAdd({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("添加成功");
            close();
            emit("reload");
          } else {
            ElMessage.warning(item.msg);
          }
        });
      } else {
        residentialAreaEdit({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("修改成功");
            close();
            emit("reload");
          } else {
            ElMessage.warning(item.msg);
          }
        });
      }
    }
  });
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
</style>
