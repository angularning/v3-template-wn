<template>
  <el-dialog
    v-model="visible"
    :title="'添加楼层信息'"
    width="600px"
    @close="handleClose"
  >
    <div class="tip">楼层基本信息，支持Excel导入</div>
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="所属社区" prop="name">
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
      <el-form-item label="小区：" prop="residentialAreaId">
        <el-select
          class="normalSelect"
          v-model="state.ruleForm.residentialAreaId"
          placeholder="请选择小区"
        >
          <el-option
            v-for="item in state.residentialAreaIdList"
            :key="item.id"
            :label="item.areaName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼牌号" prop="name">
        <el-input v-model="state.ruleForm.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="楼房编码" prop="buildingCode">
        <el-input v-model="state.ruleForm.buildingCode" type="text"></el-input>
      </el-form-item>
      <el-form-item label="楼长" prop="buildingManager">
        <el-input
          v-model="state.ruleForm.buildingManager"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼房用途" prop="buildingPurpose">
        <el-input
          v-model="state.ruleForm.buildingPurpose"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="builtUpArea">
        <el-input v-model="state.ruleForm.builtUpArea" type="text"></el-input>
      </el-form-item>
      <el-form-item label="楼房描述" prop="describe">
        <el-input v-model="state.ruleForm.describe" type="text"></el-input>
      </el-form-item>
      <el-form-item label="楼长联系电话" prop="managerTelephone">
        <el-input
          v-model="state.ruleForm.managerTelephone"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼层总数" prop="storey">
        <el-input v-model="state.ruleForm.storey" type="text"></el-input>
      </el-form-item>
      <el-form-item label="当前楼层" prop="storeyName">
        <el-input v-model="state.ruleForm.storeyName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="楼层类型：" prop="type">
        <el-select
          class="normalSelect"
          v-model="state.ruleForm.type"
          placeholder="请选择楼层类型"
        >
          <el-option
            v-for="item in state.typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前单元" prop="unitName">
        <el-input v-model="state.ruleForm.unitName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="单元总数" prop="unitName">
        <el-input v-model="state.ruleForm.unitNumber" type="text"></el-input>
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
  residentialAreaHouseAdd,
  communityInfoSelectList,
  residentialAreaList,
} from "@/api/community";
import { localGet } from "@/utils";
import { ElMessage } from "element-plus";
import { getCommunityInfoList } from "@/api/user";
import { useRoute } from "vue-router";
const formRef = ref<any>(null);
const visible = ref(false);
const communityList = ref([]);
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
    buildingCode: "",
    buildingManager: "",
    buildingPurpose: "",
    builtUpArea: "",
    communityId: "",
    // createUser: 0,
    describe: "",
    // "id": 0,
    managerTelephone: "",
    name: "",
    residentialAreaId: "",
    storey: "",
    storeyName: "",
    type: "",
    unitName: "",
    unitNumber: "",
  },
  typeList: [
    // 1：居民楼，2:公寓，3:学校，4:医院，5:商场，6:民用建筑
    {
      id: 1,
      name: "居民楼",
    },
    {
      id: 2,
      name: "公寓",
    },
    {
      id: 3,
      name: "学校",
    },
    {
      id: 4,
      name: "医院",
    },
    {
      id: 5,
      name: "商场",
    },
    {
      id: 6,
      name: "民用建筑",
    },
  ],
  rules: {
    // name: [{ required: "true", message: "图片不能为空", trigger: ["change"] }],
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
// 获取详情
const getDetail = (id: string) => {};
// 开启弹窗
const open = (id: string) => {
  visible.value = true;
  if (id) {
    state.id = id;
    getDetail(id);
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
const route = useRoute();
onMounted(() => {
  getCommunityList(route.query.id);
});
// 社区变动查询小区
watch(
  () => state.ruleForm.communityId,
  (val) => {
    state.ruleForm.residentialAreaId = "";
    getResidentialList(val);
  }
);
// 查询小区
const getResidentialList = (id: string) => {
  const params = state.ruleForm;
  // 通过社区id查询小区
  if (id) {
    params.communityId = id;
  }
  residentialAreaList(params)?.then((item) => {
    if (item.code === 0) {
      if (item.body.length === 0) {
        params.residentialAreaId = "";
      }
      state.residentialAreaIdList = item.body.records;
    }
  });
};
const getCommunityList = (govId: string) => {
  communityInfoSelectList({ govId })?.then((item) => {
    if (item.code === 0) {
      communityList.value = item.body;
    }
  });
};
// 提交表单
const submitForm = () => {
  const params = state.ruleForm;
  residentialAreaHouseAdd(params).then((item) => {
    if (item.code === 0) {
      ElMessage.success("添加成功");
      visible.value = false;
      emit("reload");
    } else {
      ElMessage.warning(item.msg);
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
  getDetail,
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
