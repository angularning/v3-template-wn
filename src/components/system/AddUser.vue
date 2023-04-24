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
          class="normalInput"
          v-model="state.ruleForm.userName"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.mobile"
          type="mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色：" prop="roleId">
        <el-select
          class="normalSelect"
          v-model="state.ruleForm.roleId"
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
          class="normalSelect"
          v-model="state.ruleForm.govId"
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
          class="normalSelect"
          v-model="state.ruleForm.communityId"
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
          class="normalSelect"
          v-model="state.ruleForm.state"
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
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="state.ruleForm.password"
          class="normalInput"
          type="password"
          show-password
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
    password: "",
    userName: "",
  },
  roles: [],
  communityList: [],
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
state.roles = result;
const emit = defineEmits(["reload"]);
watch(
  () => state.ruleForm.govId,
  (val) => {
    state.ruleForm.communityId = "";
    getCommunityList(val || 1);
  }
);
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
  if (userStore.info?.roles.includes("ROLE_admin")) {
    await getTownList();
    await getCommunityList(state.ruleForm.govId || 1);
  }
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
// 获取乡政府列表
const getTownList = () => {
  getTownGovernment({})?.then((item) => {
    if (item.code === 0) {
      townList.value = item.body;
    }
  });
};

const getCommunityList = (govId: string) => {
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
