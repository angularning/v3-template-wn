<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加人口' : '编辑人口'"
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
      <el-form-item label="姓名：" prop="name">
        <el-input
          v-model="state.ruleForm.name"
          class="normalInput"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="location">
        <el-input
          v-model="state.ruleForm.location"
          class="normalInput"
          type="mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="state.ruleForm.mobile"
          class="normalInput"
          type="mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-select
          v-model="state.ruleForm.gender"
          class="normalSelect"
          placeholder="请选择性别"
        >
          <el-option
            v-for="item in state.genderList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型：" prop="idCardType">
        <el-select
          v-model="state.ruleForm.idCardType"
          class="normalSelect"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in state.idCardTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号：" prop="idCardNumber">
        <el-input
          v-model="state.ruleForm.idCardNumber"
          class="normalInput"
          type="mobile"
        ></el-input>
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
          @change="changeGovId"
        >
          <el-option
            v-for="item in state.townList"
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
          @change="changeCommunityId"
        >
          <el-option
            v-for="item in state.communityList"
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
          placeholder="请选择小区"
          @change="changeResidentialAreaId"
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
      <el-form-item label="房间号：" prop="roomId">
        <el-input
          v-model="state.ruleForm.roomId"
          class="normalInput"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="户籍类型：" prop="idAddress">
        <el-select
          v-model="state.ruleForm.idAddress"
          class="normalSelect"
          placeholder="请选择户籍类型"
        >
          <el-option
            v-for="item in state.idAddressList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出入类型：" prop="accessType">
        <el-select
          v-model="state.ruleForm.accessType"
          class="normalSelect"
          placeholder="请选择出入类型"
        >
          <el-option
            v-for="item in state.accessTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="labels">
        <el-select
          v-model="state.ruleForm.labels"
          class="normalSelect"
          multiple
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in state.labelsList"
            :key="item.id"
            :label="item.labelName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" prop="describe">
        <el-input
          v-model="state.ruleForm.describe"
          class="normalInput"
          type="text"
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
import {
  getCommunityInfoList,
  getTownGovernment,
  getCommunityInfoSelectList,
} from "@/api/user";
import { useUserStore } from "@/pinia/modules/user";
import {
  labelsInfoList,
  populationInfoAdd,
  populationInfoDel,
  populationInfoDetail,
  populationInfoEdit,
} from "@/api/common";
import {
  buildingInfoList,
  buildingInfoStoreyList,
  buildingInfoUnitList,
  residentialAreaList,
} from "@/api/community";
import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const formRef = ref<any>(null);
const visible = ref<boolean>(false);
const flag = reactive({
  communityId: false,
  residentialAreaId: false,
  buildingId: false,
  buildingUnitId: false,
});
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
    accessType: "",
    buildingId: "",
    buildingStoreyId: "",
    buildingUnitId: "",
    communityId: "",
    // "createUser": 0,
    gender: "",
    govId: "",
    // "id": 0,
    idAddress: "",
    idCardNumber: "",
    idCardType: "",
    labels: "",
    location: "",
    mobile: "",
    name: "",
    residentialAreaId: "",
    roomId: "",
    // "updateUser": 0
  },
  communityList: [],
  townList: [],
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
  idAddressList: [
    {
      id: 1,
      name: "户籍人口",
    },
    {
      id: 2,
      name: "非户籍人口",
    },
  ],
  genderList: [
    {
      id: 0,
      name: "未知",
    },
    {
      id: 1,
      name: "男",
    },
    {
      id: 2,
      name: "女",
    },
    {
      id: 3,
      name: "保密",
    },
  ],
  accessTypeList: [
    {
      id: 1,
      name: "常驻",
    },
    {
      id: 2,
      name: "租住",
    },
  ],
  idCardTypeList: [
    {
      id: 1,
      name: "身份证",
    },
    {
      id: 2,
      name: "驾驶证",
    },
    {
      id: 3,
      name: "港澳台通行证",
    },
  ],
  buildingIdList: [],
  buildingUnitIdList: [],
  buildingStoreyIdList: [],
  rules: {
    name: [{ required: "true", message: "名称不能为空", trigger: ["change"] }],
  },
  residentialAreaIdList: [],
  id: "",
});
// 政府变动查询社区
watch(
  () => state.ruleForm.govId,
  (val) => {
    // state.ruleForm.communityId = "";
    getCommunityList(val);
    if (props.type === "edit" && flag.communityId) {
      restValueCommunityId();
    }
  }
);
const changeGovId = () => {
  flag.communityId = true;
};
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
const changeCommunityId = () => {
  flag.residentialAreaId = true;
};

// 小区变动查询楼号
watch(
  () => state.ruleForm.residentialAreaId,
  (val) => {
    // 查标签
    getLabelsList();
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
// 获取详情
const getDetail = (id: string) => {
  populationInfoDetail({ id })?.then((item) => {
    if (item.code === 0) {
      state.ruleForm = item.body;
      if (configStore.appConfig.entry) {
        const temp = item.body.idCardNumber;
        const tempArr = temp.split("");
        tempArr.splice(4, 6, "*****");
        const tempStr = tempArr.join(",").replaceAll(",", "");
        state.ruleForm.idCardNumber = tempStr;
      }
      const params = {
        communityId: state.ruleForm.communityId,
        govId: state.ruleForm.govId,
        residentialAreaId: state.ruleForm.residentialAreaId,
      };
      labelsInfoList(params)?.then((res) => {
        if (res.code === 0) {
          state.labelsList = res.body;
          state.ruleForm.labels =
            item.body.labels &&
            item.body.labels.split(",").map((r) => {
              return Number(r);
            });
        }
      });
    }
    console.log(state.ruleForm.labels);
  });
};
// 开启弹窗
const open = async (id: string) => {
  visible.value = true;
  getTownList();
  // 请求各个列表
  if (id) {
    state.id = id;
    await getDetail(id);
    if (userStore.info.roles.includes("ROLE_admin")) {
      await getTownList();
      if (props.type !== "add") {
        await getCommunityList(state.ruleForm.govId);
        await getResidentialList(state.ruleForm.communityId);
        await getBuildingInfoList(state.ruleForm.residentialAreaId);
        await getBuildingInfoUnitList(state.ruleForm.buildingId);
        await getBuildingInfoStoreyList(state.ruleForm.buildingUnitId);
      }
    }
  }
  if (!userStore.info.roles.includes("ROLE_admin")) {
    getCommunityList("");
  }
};
const emit = defineEmits(["reload"]);
// 删除用户
const del = (id: string) => {
  populationInfoDel({ id }).then((item) => {
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
  state.ruleForm = {
    accessType: "",
    buildingId: "",
    buildingStoreyId: "",
    buildingUnitId: "",
    communityId: "",
    // "createUser": 0,
    gender: "",
    govId: "",
    // "id": 0,
    idAddress: "",
    idCardNumber: "",
    idCardType: "",
    labels: "",
    location: "",
    mobile: "",
    name: "",
    residentialAreaId: "",
    roomId: "",
    // "updateUser": 0
  };
  flag.value = false;
};
// 获取乡政府列表
const getTownList = () => {
  getTownGovernment({})?.then((item) => {
    if (item.code === 0) {
      state.townList = item.body;
    }
  });
};
// 查询社区
const getCommunityList = (govId: string) => {
  const params = { govId };
  if (!govId) {
    getCommunityInfoSelectList()?.then((item) => {
      if (item.code === 0) {
        state.communityList = item.body;
      }
    });
  } else {
    getCommunityInfoList(params)?.then((item) => {
      if (item.code === 0) {
        state.communityList = item.body;
      }
    });
  }
};
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
const getLabelsList = () => {
  const params = {
    communityId: state.ruleForm.communityId,
    govId: state.ruleForm.govId,
    residentialAreaId: state.ruleForm.residentialAreaId,
  };
  labelsInfoList(params)?.then((item) => {
    if (item.code === 0) {
      state.labelsList = item.body;
    }
  });
};
const handleClose = () => {
  formRef.value.resetFields();
};
const restValueCommunityId = () => {
  state.ruleForm.communityId = "";
  state.communityList = [];
  state.ruleForm.residentialAreaId = "";
  state.residentialAreaIdList = [];
  state.ruleForm.buildingId = "";
  state.buildingIdList = [];
  state.ruleForm.buildingUnitId = "";
  state.buildingUnitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
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
const submitForm = () => {
  const params = state.ruleForm;
  let labels = "";
  if (params.labels) {
    labels =
      typeof params.labels !== "string"
        ? params.labels.join(",")
        : params.labels;
  }
  params.labels = labels;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        populationInfoAdd({ ...params })
          ?.then((item) => {
            if (item.code === 0) {
              ElMessage.success("添加成功");
              emit("reload");
              close();
            } else {
              if (labels && typeof labels === "string") {
                state.ruleForm.labels = labels
                  .split(",")
                  .map((item) => Number(item));
              }
              const error = JSON.parse(JSON.stringify(item));
              ElMessage.error(item.msg || error.message);
            }
          })
          .catch((err) => {
            ElMessage.error(err);
          });
      } else {
        populationInfoEdit({ ...params })
          ?.then((item) => {
            if (item.code === 0) {
              ElMessage.success("修改成功");
              emit("reload");
              close();
            } else {
              if (labels && typeof labels === "string") {
                state.ruleForm.labels = labels
                  .split(",")
                  .map((item) => Number(item));
              }
              const error = JSON.parse(JSON.stringify(item));
              ElMessage.error(item.msg || error.message);
            }
          })
          .catch((err) => {
            ElMessage.error(err);
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
