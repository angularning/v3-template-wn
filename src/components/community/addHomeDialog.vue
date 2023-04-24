<template>
  <el-dialog
    v-model="visible"
    :title="
      props.type === 'add'
        ? '添加房屋信息'
        : props.type === 'edit'
        ? '编辑房屋信息'
        : '房屋详情'
    "
    width="600px"
    @close="handleClose"
  >
    <div class="tip">房屋基本信息，支持Excel导入</div>
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="所属社区" prop="name">
        <el-select
          v-model="state.ruleForm.communityId"
          class="normalSelect"
          :disabled="props.type === 'detail'"
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
          v-model="state.ruleForm.residentialAreaId"
          class="normalSelect"
          :disabled="props.type === 'detail'"
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

      <el-form-item label="楼号：" prop="buildingId">
        <el-select
          v-model="state.ruleForm.buildingId"
          class="normalSelect"
          :disabled="props.type === 'detail'"
          placeholder="请选择楼号"
          @change="changeBuildingId"
        >
          <el-option
            v-for="item in state.buildingIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单元：" prop="buildingUnitId">
        <el-select
          v-model="state.ruleForm.buildingUnitId"
          class="normalSelect"
          :disabled="props.type === 'detail'"
          placeholder="请选择单元"
        >
          <el-option
            v-for="item in state.buildingUnitIdList"
            :key="item.id"
            :label="item.unitName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层：" prop="buildingStoreyId">
        <el-select
          v-model="state.ruleForm.buildingStoreyId"
          class="normalSelect"
          :disabled="props.type === 'detail'"
          placeholder="请选择楼层"
        >
          <el-option
            v-for="item in state.buildingStoreyIdList"
            :key="item.id"
            :label="item.storeyName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门牌号" prop="name">
        <el-input
          v-model="state.ruleForm.roomName"
          :disabled="props.type === 'detail'"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼房编码" prop="roomCode">
        <el-input
          v-model="state.ruleForm.roomCode"
          :disabled="props.type === 'detail'"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼长" prop="landlordName">
        <el-input
          v-model="state.ruleForm.landlordName"
          :disabled="props.type === 'detail'"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼房用途" prop="roomPurpose">
        <el-select
          v-model="state.ruleForm.roomPurpose"
          class="normalSelect"
          :disabled="props.type === 'detail'"
          placeholder="请选择楼房用途"
        >
          <el-option
            v-for="item in state.roomPurposeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建筑面积" prop="roomArea">
        <el-input
          v-model="state.ruleForm.roomArea"
          :disabled="props.type === 'detail'"
          type="text"
        ></el-input>
      </el-form-item>
      <!--      <el-form-item label="楼房描述" prop="describe">-->
      <!--        <el-input v-model="state.ruleForm.describe" type="text"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="楼长联系电话" prop="landlordMobile">
        <el-input
          v-model="state.ruleForm.landlordMobile"
          :disabled="props.type === 'detail'"
          type="text"
        ></el-input>
      </el-form-item>
      <!--      <el-form-item label="楼层数" prop="storey">-->
      <!--        <el-input v-model="state.ruleForm.storey" type="text"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="楼层名称" prop="storeyName">-->
      <!--        <el-input v-model="state.ruleForm.storeyName" type="text"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="房间类型：" prop="type">
        <el-select
          v-model="state.ruleForm.roomType"
          class="normalSelect"
          :disabled="props.type === 'detail'"
          placeholder="请选择房间类型"
        >
          <el-option
            v-for="item in state.roomTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="单元名称" prop="unitName">-->
      <!--        <el-input v-model="state.ruleForm.unitName" type="text"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="楼单元数量" prop="unitName">-->
      <!--        <el-input v-model="state.ruleForm.unitNumber" type="text"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="">
        <el-button
          style="width: 200px; margin-top: 15px"
          type="primary"
          size="large"
          :disabled="props.type === 'detail'"
          @click="submitForm"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  buildingRoomAdd,
  buildingRoomUpdate,
  buildingRoomDetail,
  communityInfoSelectList,
  residentialAreaList,
  buildingInfoList,
  buildingInfoUnitList,
  buildingInfoStoreyList,
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
    buildingId: "",
    buildingStoreyId: "",
    buildingUnitId: "",
    communityId: "",
    residentialAreaId: "",
    roomCode: "",
    roomName: "",
    roomType: 2,
    roomArea: "",
    roomPurpose: 1,
    landlordName: "",
    landlordMobile: "",
  },
  buildingIdList: [],
  buildingUnitIdList: [],
  buildingStoreyIdList: [],
  roomTypeList: [
    {
      id: 0,
      name: "一居",
    },
    {
      id: 1,
      name: "二居",
    },
    {
      id: 2,
      name: "三居",
    },
  ],
  roomPurposeList: [
    {
      id: 0,
      name: "其它",
    },
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
const flag = reactive({
  communityId: false,
  residentialAreaId: false,
  buildingId: false,
  buildingUnitId: false,
});
// 获取详情
const getDetail = (id: string) => {
  buildingRoomDetail({ id }).then((item) => {
    if (item.code === 0) {
      state.ruleForm = item.body;
    }
  });
};
// 开启弹窗
const open = async (id: string) => {
  visible.value = true;
  if (id) {
    state.id = id;
    await getDetail(id);
    if (props.type !== "add") {
      await getCommunityList("");
      await getResidentialList(state.ruleForm.communityId);
      await getBuildingInfoList(state.ruleForm.residentialAreaId);
      await getBuildingInfoUnitList(state.ruleForm.buildingId);
      await getBuildingInfoStoreyList(state.ruleForm.buildingUnitId);
    }
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
    getResidentialList(val);
    if (props.type === "edit" && flag.residentialAreaId) {
      restValueResidentialAreaId();
    }
  }
);

// 小区变动查询楼号
watch(
  () => state.ruleForm.residentialAreaId,
  (val) => {
    // 查楼号
    getBuildingInfoList(val);
    if (props.type === "edit" && flag.buildingId) {
      restValueBuildingId();
    }
  }
);
const changeResidentialAreaId = () => {
  flag.buildingId = true;
};
// 楼号变动查询单元
watch(
  () => state.ruleForm.buildingId,
  (val) => {
    getBuildingInfoUnitList(val);
    if (props.type === "edit" && flag.buildingUnitId) {
      restValueBuildingUnitId();
    }
  }
);
const changeBuildingId = () => {
  flag.buildingUnitId = true;
};
// 单元变动查询楼层
watch(
  () => state.ruleForm.buildingUnitId,
  (val) => {
    getBuildingInfoStoreyList(val);
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

// 查询楼号
const getBuildingInfoList = (id: string) => {
  const params = state.ruleForm;
  // 通过小区id查询楼
  if (id) {
    params.residentialAreaId = id;
  }
  buildingInfoList(params)?.then((item) => {
    if (item.code === 0) {
      state.buildingIdList = item.body;
    }
  });
};
// 查询单元
const getBuildingInfoUnitList = (id: string) => {
  const params = state.ruleForm;
  // 通过楼查询单元
  if (id) {
    params.buildingId = id;
  }
  buildingInfoUnitList(params)?.then((item) => {
    if (item.code === 0) {
      state.buildingUnitIdList = item.body;
    }
  });
};
// 查询楼层
const getBuildingInfoStoreyList = (id: string) => {
  const params = state.ruleForm;
  if (id) {
    params.buildingUnitId = id;
  }
  buildingInfoStoreyList(params)?.then((item) => {
    if (item.code === 0) {
      state.buildingStoreyIdList = item.body;
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
const restValueResidentialAreaId = () => {
  // state.ruleForm.communityId = "";
  state.ruleForm.residentialAreaId = "";
  state.residentialAreaIdList = [];
  state.ruleForm.buildingId = "";
  state.buildingIdList = [];
  state.ruleForm.buildingUnitId = "";
  state.buildingUnitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
};
const restValueBuildingId = () => {
  // state.ruleForm.communityId = "";
  // state.ruleForm.residentialAreaId = "";
  state.ruleForm.buildingId = "";
  state.ruleForm.buildingUnitId = "";
};
const restValueBuildingUnitId = () => {
  // state.ruleForm.communityId = "";
  // state.ruleForm.residentialAreaId = "";
  // state.ruleForm.buildingId = "";
  state.ruleForm.buildingUnitId = "";
  state.buildingUnitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
};
// 提交表单
const submitForm = () => {
  const params = state.ruleForm;
  if (props.type === "add") {
    buildingRoomAdd(params).then((item) => {
      if (item.code === 0) {
        ElMessage.success("添加成功");
        visible.value = false;
        emit("reload");
      } else {
        ElMessage.warning(item.msg);
      }
    });
  } else {
    buildingRoomUpdate(params).then((item) => {
      if (item.code === 0) {
        ElMessage.success("修改成功");
        visible.value = false;
        emit("reload");
      } else {
        ElMessage.warning(item.msg);
      }
    });
  }
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
