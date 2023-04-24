<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '新增标签' : '编辑标签'"
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
      <el-form-item label="标签名称：" prop="labelName">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.labelName"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签描述：" prop="describe">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.describe"
          type="mobile"
        ></el-input>
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
      <el-form-item label="颜色：" prop="colorRGBA">
        <el-radio-group v-model="state.ruleForm.colorRGBCode" class="ml-4">
          <el-radio
            v-for="item in state.colorList"
            :key="item.value"
            :label="item.value"
            size="large"
          >
            <a
              style="display: inline-block; width: 40px; height: 20px"
              :style="{ background: item.value }"
            >
            </a>
          </el-radio>
        </el-radio-group>
        <!--        <el-select-->
        <!--          class="normalSelect"-->
        <!--          v-model="state.ruleForm.colorRGBA"-->
        <!--          placeholder="请选择状态"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="item in state.colorList"-->
        <!--            :key="item.id"-->
        <!--            :label="item.name"-->
        <!--            :value="item.id"-->
        <!--          >-->
        <!--          </el-option>-->
        <!--        </el-select>-->
      </el-form-item>
      <el-form-item label="是否可见：" prop="visible">
        <el-select
          class="normalSelect"
          v-model="state.ruleForm.visible"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in state.visibleList"
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
import { getCommunityInfoList, getTownGovernment } from "@/api/user";
import { useUserStore } from "@/pinia/modules/user";
import {
  labelsInfoAdd,
  labelsInfoDel,
  labelsInfoDetail,
  labelsInfoUpdate,
} from "@/api/common";
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
const emit = defineEmits(["reload"]);
const userStore = useUserStore();
const townList = ref([]);
const communityList = ref([]);
const colorRGBA = ref("");
const state = reactive({
  ruleForm: {
    id: "",
    labelName: "",
    describe: "",
    colorRGBA: "",
    govId: "",
    communityId: "",
    visible: "",
    residentialAreaId: "", // ?小区不一定有
  },
  colorList: [
    {
      id: 1,
      value: "#F8E9E3",
      name: 1,
    },
    {
      id: 2,
      value: "#ccffcc",
      name: 2,
    },
    {
      id: 3,
      value: "#33ffcc",
      name: 3,
    },
    {
      id: 4,
      value: "#FFFCE9",
      name: 4,
    },
    {
      id: 5,
      value: "#EDFDEC",
      name: 5,
    },
  ],
  communityList: [],
  roles: [
    {
      id: 1,
      name: "管理员",
    },
    {
      id: 2,
      name: "普通用户",
    },
  ],
  visibleList: [
    {
      id: 0,
      name: "启用",
    },
    {
      id: 1,
      name: "禁用",
    },
  ],
  rules: {
    labelName: [
      { required: "true", message: "标签不能为空", trigger: ["change"] },
    ],
    describe: [
      { required: "false", message: "手机不能为空", trigger: ["change"] },
    ],
    // communityId: [
    //   { required: "true", message: "社区不能为空", trigger: ["change"] },
    // ],
    visible: [
      { required: "true", message: "状态不能为空", trigger: ["change"] },
    ],
  },
  id: "",
});
watch(
  () => state.ruleForm.govId,
  (val) => {
    state.ruleForm.communityId = "";
    getCommunityList(val || 1);
  }
);
// 获取详情
const getDetail = (data: any) => {
  const params = {
    id: data.id,
    labelName: data.labelName,
    // visible: 0,
  };
  labelsInfoDetail(params)?.then((item) => {
    if (item.code === 0) {
      state.ruleForm = {
        id: item.body.id,
        describe: item.body.describe,
        labelName: item.body.labelName,
        visible: item.body.visible,
        colorRGBCode: item.body.colorRGBCode,
        communityId: item.body.communityId,
        govId: item.body.govId,
      };
    }
  });
};
// 开启弹窗
const open = (data: any) => {
  visible.value = true;
  // 请求各个列表
  if (userStore.info.roles.includes("ROLE_admin")) {
    getTownList();
  }
  getCommunityList(state.ruleForm.govId);
  if (data) {
    state.id = data.id;
    getDetail(data);
  }
};
// 删除用户
const del = (data: any) => {
  const params = {
    id: data.id,
    labelName: data.labelName,
  };
  labelsInfoDel(params).then((item) => {
    if (item.code === 0) {
      ElMessage.success("删除成功");
      emit("reload");
    } else {
      ElMessage.error("删除失败");
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
        labelsInfoAdd({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("添加成功");
            close();
            emit("reload");
          } else {
            ElMessage.warning(item.msg);
          }
        });
      } else {
        labelsInfoUpdate({ ...params })?.then((item) => {
          if (item.code === 0) {
            ElMessage.success("添加成功");
            emit("reload");
            close();
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
