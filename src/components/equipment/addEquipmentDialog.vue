<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加设备' : '编辑设备'"
    width="500px"
    @close="close"
  >
    <div class="tip">设备信息，支持Excel导入</div>
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="good-form"
    >
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
      <el-form-item label="单元：" prop="unitId">
        <el-select
          v-model="state.ruleForm.unitId"
          class="normalSelect"
          placeholder="请选择单元"
        >
          <el-option
            v-for="item in state.unitIdList"
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

      <el-form-item label="设备编码：" prop="equipmentCode">
        <el-input
          v-model="state.ruleForm.equipmentCode"
          class="normalInput"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item label="设备类型：" prop="equipmentType">
        <el-select
          v-model="state.ruleForm.equipmentType"
          class="normalSelect"
          placeholder="请选择设备类型"
        >
          <el-option
            v-for="item in state.equipmentTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input           class="normalInput"
                            v-model="state.ruleForm.supplierName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="供应商联系人" prop="supplierContactsName">
        <el-input
          class="normalInput"

          v-model="state.ruleForm.supplierContactsName"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="供应商手机号" prop="supplierContactsTel">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.supplierContactsTel"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="安装时间" prop="installTime">
        <el-date-picker
          v-model="state.ruleForm.installTime"
          type="datetime"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD hh:mm:ss"
          placeholder="请选择安装时间"
        />
      </el-form-item>
      <el-form-item label="设备质保期" prop="warrantyEndTime">
        <el-date-picker
          v-model="state.ruleForm.warrantyEndTime"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择设备质保期"
        />
      </el-form-item>
      <el-form-item label="最后保修时间" prop="reportRepair">
        <el-date-picker
          v-model="state.ruleForm.reportRepair"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择设备质保期"
        />
      </el-form-item>
      <el-form-item label="设备服务期" prop="serviceEndTime">
        <el-date-picker
          v-model="state.ruleForm.serviceEndTime"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择设备服务期"
        />
      </el-form-item>
      <el-form-item label="设备巡检期" prop="checkCycle">
        <el-select
          v-model="state.ruleForm.checkCycle"
          class="normalSelect"
          placeholder="请选择设备巡检期"
        >
          <el-option
            v-for="item in state.checkCycleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备使用寿命" prop="equipmentUseLife">
        <el-input
          class="normalInput"
          v-model="state.ruleForm.equipmentUseLife"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备状态：" prop="equipmentState">
        <el-select
          v-model="state.ruleForm.equipmentState"
          class="normalSelect"
          placeholder="请选择设备状态"
        >
          <el-option
            v-for="item in state.equipmentStateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护类型：" prop="upholdType">
        <el-select
          v-model="state.ruleForm.upholdType"
          class="normalSelect"
          placeholder="请选择维护类型"
        >
          <el-option
            v-for="item in state.upholdTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护人" prop="endUpholdName">
        <el-input class="normalInput" v-model="state.ruleForm.endUpholdName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="维护人电话" prop="endUpholdTel">
        <el-input class="normalInput" v-model="state.ruleForm.endUpholdTel" type="text"></el-input>
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
  equipmentAdd,
  populationInfoDel,
  equipmentInfo,
  equipmentEdit,
} from "@/api/common";
import {
  buildingInfoList,
  buildingInfoStoreyList,
  buildingInfoUnitList,
  residentialAreaList,
} from "@/api/community";

const formRef = ref<any>(null);
const visible = ref<boolean>(false);
const flag = reactive({
  communityId: false,
  residentialAreaId: false,
  buildingId: false,
  unitId: false,
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
    residentialAreaId: "",
    supplierContactsName: "",
    supplierName: "",
    endUpholdTel: "",
    buildingStoreyId: "",
    checkCycle: 1,
    equipmentState: 0,
    roomId: "",
    equipmentUseLife: "",
    serviceEndTime: "",
    equipmentCode: "",
    equipmentType: 1,
    unitId: "",
    warrantyEndTime: "",
    buildingId: "",
    createTime: "",
    endUpholdName: "",
    reportRepair: "",
    communityId: "",
    installTime: "",
    supplierContactsTel: "",
  },
  communityList: [],
  townList: [],
  checkCycleList: [
    {
      id: 1,
      name: "一天",
    },
    {
      id: 2,
      name: "一周",
    },
    {
      id: 3,
      name: "一月",
    },
    {
      id: 4,
      name: "一年",
    },
  ],
  equipmentTypeList: [
    {
      id: 1,
      name: "摄像头",
    },
    {
      id: 2,
      name: "烟感器",
    },
    {
      id: 3,
      name: "电动车充电桩",
    },
    {
      id: 4,
      name: "微型消防站",
    },
  ],
  equipmentStateList: [
    {
      id: 0,
      name: "正常",
    },
    {
      id: 1,
      name: "派单",
    },
    {
      id: 2,
      name: "处理中",
    },
    {
      id: 3,
      name: "完成",
    },
    {
      id: 4,
      name: "停用",
    },
    {
      id: 5,
      name: "报废",
    },
    {
      id: 6,
      name: "过期",
    },
  ],
  upholdTypeList: [
    {
      id: 1,
      name: "维修",
    },
    {
      id: 0,
      name: "日常巡检",
    },
  ],
  buildingIdList: [],
  unitIdList: [],
  buildingStoreyIdList: [],
  rules: {
    name: [{ required: "true", message: "名称不能为空", trigger: ["change"] }],
  },
  residentialAreaIdList: [],
  id: "",
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
const changeCommunityId = () => {
  flag.residentialAreaId = true;
};
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
    if (props.type === "edit" && flag.unitId) {
      restValueBuildingUnitId();
    }
  }
);
const changeBuildingId = () => {
  flag.unitId = true;
};
// 单元变动查询楼层
watch(
  () => state.ruleForm.unitId,
  (val) => {
    getBuildingInfoStoreyList(val);
  }
);
// 获取详情
const getDetail = (id: string) => {
  equipmentInfo({ id })?.then((item) => {
    if (item.code === 0) {
      state.ruleForm = item.body;
    }
  });
};
// 开启弹窗
const open = async (id: string) => {
  visible.value = true;
  getCommunityList("");
  // 请求各个列表
  if (id) {
    state.id = id;
    await getDetail(id);
    if (props.type !== "add") {
      await getCommunityList("");
      await getResidentialList(state.ruleForm.communityId);
      await getBuildingInfoList(state.ruleForm.residentialAreaId);
      await getBuildingInfoUnitList(state.ruleForm.buildingId);
      await getBuildingInfoStoreyList(state.ruleForm.unitId);
    }
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
    residentialAreaId: "",
    supplierContactsName: "",
    supplierName: "",
    endUpholdTel: "",
    buildingStoreyId: "",
    checkCycle: 1,
    equipmentState: 0,
    roomId: "",
    equipmentUseLife: "",
    serviceEndTime: "",
    equipmentCode: "",
    equipmentType: 1,
    unitId: "",
    warrantyEndTime: "",
    buildingId: "",
    createTime: "",
    endUpholdName: "",
    communityId: "",
    installTime: "",
    reportRepair: "",
    supplierContactsTel: "",
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
      // if (item.body.records.length === 0) {
      //   params.residentialAreaId = "";
      // }
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
      state.unitIdList = item.body;
    }
  });
};
// 查询楼层
const getBuildingInfoStoreyList = (id: string) => {
  const params = state.ruleForm;
  if (id) {
    params.unitId = id;
  }
  buildingInfoStoreyList(params)?.then((item) => {
    if (item.code === 0) {
      state.buildingStoreyIdList = item.body;
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
  state.ruleForm.unitId = "";
  state.unitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
};
const restValueResidentialAreaId = () => {
  // state.ruleForm.communityId = "";
  state.ruleForm.residentialAreaId = "";
  state.residentialAreaIdList = [];
  state.ruleForm.buildingId = "";
  state.buildingIdList = [];
  state.ruleForm.unitId = "";
  state.unitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
};
const restValueBuildingId = () => {
  // state.ruleForm.communityId = "";
  // state.ruleForm.residentialAreaId = "";
  state.ruleForm.buildingId = "";
  state.ruleForm.unitId = "";
};
const restValueBuildingUnitId = () => {
  // state.ruleForm.communityId = "";
  // state.ruleForm.residentialAreaId = "";
  // state.ruleForm.buildingId = "";
  state.ruleForm.unitId = "";
  state.unitIdList = [];
  state.ruleForm.buildingStoreyId = "";
  state.buildingStoreyIdList = [];
};
const submitForm = () => {
  const params = state.ruleForm;
  delete params.id;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === "add") {
        equipmentAdd({ ...params })
          ?.then((item) => {
            if (item.code === 0) {
              ElMessage.success("添加成功");
              emit("reload");
              close();
            } else {
              const error = JSON.parse(JSON.stringify(item));
              ElMessage.error(item.msg || error.message);
            }
          })
          .catch((err) => {
            ElMessage.error(err);
          });
      } else {
        equipmentEdit({ ...params })
          ?.then((item) => {
            if (item.code === 0) {
              ElMessage.success("修改成功");
              emit("reload");
              close();
            } else {
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
  width: 200px;
}
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
