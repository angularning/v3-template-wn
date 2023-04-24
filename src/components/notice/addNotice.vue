<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加公告' : '编辑公告'"
    width="500px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="公告标题：" prop="userName">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.userName"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="公告内容：" prop="mobile">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.mobile"
          type="mobile"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useSysRole } from "../../hooks/index";
import {
  getCommunityInfoList,
  getTownGovernment,
  sysUserAdd,
  sysUserUpdate,
  sysUserDetail,
  sysUserDel,
} from "@/api/user";
import { useUserStore } from "@/pinia/modules/user";
const formRef = ref<any>(null);
const visible = ref<boolean>(false);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "add",
  },
});
const userStore = useUserStore();
const state = reactive({
  ruleForm: {
    id: "",
    account: "",
    mobile: "",
    roleId: "",
    state: "",
    govId: "",
    communityId: "",
    password: "",
    userName: "",
  },
  rules: {
    userName: [
      { required: "true", message: "名称不能为空", trigger: ["change"] },
    ],
    mobile: [
      { required: "true", message: "手机不能为空", trigger: ["change"] },
    ],
    roleId: [
      { required: "true", message: "角色不能为空", trigger: ["change"] },
    ],
    state: [{ required: "true", message: "状态不能为空", trigger: ["change"] }],
    password: [
      { required: "true", message: "密码不能为空", trigger: ["change"] },
    ],
  },
  id: "",
});
const { result } = useSysRole();
const emit = defineEmits(["reload"]);
// 获取详情
const getDetail = (id: string) => {
  sysUserDetail({ id })?.then((item: any) => {
    if (item.code === 0) {
      state.ruleForm = {
        id,
        account: item.body.account,
        mobile: item.body.mobile,
        roleId: item.body.roleId,
        state: item.body.state,
        password: item.body.password,
        userName: item.body.userName,
        govId: item.body.govId,
        communityId: item.body.communityId,
      };
    }
  });
};
// 开启弹窗
const open = async (id: string) => {
  visible.value = true;
  // 请求各个列表
  if (id) {
    state.id = id;
    await getDetail(id);
  }
};
// 删除用户
const del = (id: string) => {
  sysUserDel({ id }).then((item) => {
    if (item.code === 0) {
      ElMessage.success("删除成功");
      emit("reload");
    } else {
      ElMessage.error(item.msg);
    }
  });
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};

const handleClose = () => {
  formRef.value.resetFields();
};
const submitForm = () => {
  const params = state.ruleForm;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        ElMessage.success("添加成功");
        close();
        emit("reload");
        // sysUserAdd({ ...params })?.then((item) => {
        //   if (item.code === 0) {
        //     ElMessage.success("添加成功");
        //     close();
        //     emit("reload");
        //   } else {
        //     ElMessage.warning(item.msg);
        //   }
        // });
      } else {
        sysUserUpdate({ ...params })?.then((item) => {
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
  visible,
  del,
  state,
});
</script>

<style scoped lang="scss">
.normalInput {
  width: 300px;
}
.normalSelect {
  width: 300px;
}
</style>
