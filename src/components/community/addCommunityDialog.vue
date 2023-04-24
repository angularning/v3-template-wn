<template>
  <el-dialog
    v-model="visible"
    :title="'添加社区信息'"
    width="600px"
    @close="handleClose"
  >
    <div class="tip">社区基本信息，支持Excel导入</div>
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="社区名称" prop="name">
        <el-input v-model="state.ruleForm.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="社区地址" prop="address">
        <el-input v-model="state.ruleForm.address" type="text"></el-input>
      </el-form-item>
      <el-form-item label="社区负责人" prop="contactUser">
        <el-input v-model="state.ruleForm.contactUser" type="text"></el-input>
      </el-form-item>
      <el-form-item
        v-if="userStore.info.roles.includes('ROLE_admin')"
        label="乡政府："
        prop="xzfRole"
      >
        <el-select
          v-model="state.ruleForm.govId"
          class="normalSelect"
          placeholder="请选择乡政府"
        >
          <el-option
            v-for="item in townList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人电话" prop="contactPhone">
        <el-input v-model="state.ruleForm.contactPhone" type="text"></el-input>
      </el-form-item>
      <el-form-item v-if="false" label="城市区域名称" prop="cityRegion">
        <el-input v-model="state.ruleForm.cityRegion" type="text"></el-input>
      </el-form-item>
      <el-form-item label="社区编码" prop="cityRegion">
        <el-input v-model="state.ruleForm.code" type="text"></el-input>
      </el-form-item>
      <el-form-item label="工作时间" prop="cityRegion">
        <el-input v-model="state.ruleForm.workingHours" type="text"></el-input>
      </el-form-item>
      <el-form-item label="社区备注" prop="describe">
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
import {
  communityInfoAdd,
  communityInfoEdit,
  communityInfoInfo,
} from "@/api/community";
import { localGet } from "@/utils";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/pinia/modules/user";
import { getTownGovernment, sysUserAdd, userInfoUpdate } from "@/api/user";
const formRef = ref<any>(null);
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});
const userStore = useUserStore();
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
    address: "",
    cityRegion: "",
    code: "",
    contactPhone: "",
    contactUser: "",
    // createUser: 0,
    describe: "",
    govId: 1,
    name: "",
    // updateUser: 0,
    workingHours: "",
  },
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
const townList = ref([]);

// 获取详情
const getDetail = (id: string) => {
  // const params = state.ruleForm;
  communityInfoInfo({ id, communityId: id }).then((item) => {
    if (item.code === 0) {
      state.ruleForm = item.body;
    }
  });
};
// 开启弹窗
const open = (id: string, data: any) => {
  visible.value = true;
  getTownList();
  if (id) {
    state.id = id;
    state.ruleForm = data;
    // getDetail(id);
  }
};
// const del = (id: string) => {
//   communityInfoDel({ id }).then((item) => {
//     if (item.code === 0) {
//       ElMessage.success("删除成功");
//     }
//   });
// };
// 获取乡政府列表
const getTownList = () => {
  getTownGovernment({})?.then((item) => {
    if (item.code === 0) {
      townList.value = item.body;
    }
  });
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
  const params = state.ruleForm;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        communityInfoAdd({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("添加成功");
            close();
            emit("reload");
          } else {
            ElMessage.warning(item.msg);
          }
        });
      } else {
        communityInfoEdit({ ...params })?.then((item) => {
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
