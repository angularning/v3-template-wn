<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加用户' : '编辑用户'"
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
      <el-form-item label="姓名：" prop="userName">
        <el-input
          v-model="state.ruleForm.userName"
          class="normalInput"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="state.ruleForm.mobile"
          class="normalInput"
          type="mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色：" prop="roleId">
        <el-select
          v-model="state.ruleForm.roleId"
          class="normalSelect"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in state.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
      <el-form-item label="社区：" prop="communityId">
        <el-select
          v-model="state.ruleForm.communityId"
          class="normalSelect"
          placeholder="请选择社区"
        >
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="state">
        <el-select
          v-model="state.ruleForm.state"
          class="normalSelect"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in state.state"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import {
  getCommunityInfoList,
  getTownGovernment,
  sysUserAdd,
  sysUserUpdate,
  userInfoDetail,
  userInfoUpdate,
} from "@/api/user";
import { useMiniRole } from "../../hooks/index";
import { useUserStore } from "@/pinia/modules/user";
const formRef = ref<any>(null);
const visible = ref<boolean>(false);
const hasCommunity = ref<boolean>(true);
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
const townList = ref([]);
const communityList = ref([]);
const state = reactive({
  ruleForm: {
    id: "",
    account: "",
    mobile: "",
    roleId: "",
    state: "",
    govId: "",
    communityId: "",
    userName: "",
  },
  communityList: [],
  roles: [],
  state: [
    {
      id: 1,
      name: "启用",
    },
    {
      id: 0,
      name: "禁用",
    },
  ],
  rules: {
    account: [
      { required: "true", message: "名称不能为空", trigger: ["change"] },
    ],
    mobile: [
      { required: "true", message: "手机不能为空", trigger: ["change"] },
    ],
    roleId: [
      { required: "true", message: "角色不能为空", trigger: ["change"] },
    ],
    state: [
      { required: "false", message: "状态不能为空", trigger: ["change"] },
    ],
  },
  id: "",
});
const setFlag = ref(false);
const { result } = useMiniRole();
state.roles = result;

const emit = defineEmits(["reload"]);
watch(
  () => state.ruleForm.govId,
  (val) => {
    if (setFlag) {
      state.ruleForm.communityId = "";
    }
    getCommunityList(val);
  }
);
watch(
  () => state.ruleForm.roleId,
  (val) => {
    if (val === 1) {
      hasCommunity.value = false;
    } else if (val === 2) {
      hasCommunity.value = true;
    }
  }
);
// 获取详情
const getDetail = (id: string) => {
  userInfoDetail({ id })?.then((item: any) => {
    if (item.code === 0) {
      state.ruleForm = {
        id,
        account: item.body.account,
        mobile: item.body.mobile,
        roleId: item.body.roleId,
        state: item.body.state,
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
  if (userStore.info?.roles.includes("ROLE_admin")) {
    await getTownList();
    await getCommunityList(state.ruleForm.govId || 1);
    setFlag.value = true;
  }
  if (id) {
    state.id = id;
    setTimeout(() => {
      getDetail(id);
    }, 10);
  }
};
// 删除用户
const del = (id: string) => {
  console.log("删除的id", id);
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
// 获取乡政府列表
const getTownList = () => {
  getTownGovernment({})?.then((item) => {
    if (item.code === 0) {
      townList.value = item.body;
    }
  });
};

const getCommunityList = (govId: string) => {
  setFlag.value = false;
  getCommunityInfoList({ govId })?.then((item) => {
    if (item.code === 0) {
      communityList.value = item.body;
    }
  });
};
const handleClose = () => {
  formRef.value.resetFields();
};
const submitForm = () => {
  const params = state.ruleForm;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        sysUserAdd({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("添加成功");
            close();
            emit("reload");
          } else {
            ElMessage.warning(item.msg);
          }
        });
      } else {
        userInfoUpdate({ ...params })?.then((item) => {
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
