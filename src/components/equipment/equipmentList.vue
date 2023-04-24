<template>
  <div>
    <el-card class="container">
      <template #header>
        <div class="header">
          <equipmentListForm @search="handleSearch" @add="handleAdd" />
        </div>
      </template>
      <el-table
        ref="multipleTable"
        v-loading="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="设备ID" width="130">
          <template #default="scope">
            {{ scope.row.equipmentCode }}
          </template>
        </el-table-column>
        <el-table-column label="安装位置" width="200">
          <template #default="scope">
            {{ locationEquipment(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="设备状态">
          <template #default="scope">
            {{ mapsEquipmentState[scope.row.equipmentState] }}
          </template>
        </el-table-column>
        <el-table-column label="维护人" width="130">
          <template #default="scope">
            {{ scope.row.endUpholdName }}
          </template>
        </el-table-column>
        <el-table-column label="设置维修员" width="160">
          <template #default="scope">
            <div class="roleListDiv">
              <div>当前维修员：{{ scope.row.upholdNameList || "-" }}</div>
              <el-select :model-value="scope.row.a">
                <el-option
                  v-for="item in state.equipmentUserList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.userName"
                  @click.stop="setUserEquipment(scope.row, item)"
                >
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="150">
          <template #default="scope">
            {{ scope.row.endUpholdTel }}
          </template>
        </el-table-column>
        <el-table-column label="维护时间" width="150">
          <template #default="scope">
            {{ scope.row.reportRepair }}
          </template>
        </el-table-column>
        <el-table-column label="维护记录">
          <template #default="scope">
            <a
              style="color: #3388ff; cursor: pointer"
              @click="seeDetail(scope.row)"
              >查看详情</a
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="scope">
            <el-button
              style="cursor: pointer; margin-right: 10px; color: #fff"
              type="primary"
              size="small"
              @click.stop="qrCode(scope.row)"
              >生成二维码</el-button
            >
            <a
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 'edit')"
              >编辑</a
            >
            <!--            设备状态-->
            <!--            0：正常-》编辑，维修，停用（三个按钮）-->
            <!--            1：派单-》编辑（一个按钮）-->
            <!--            2：处理中-》编辑（一个按钮）-->
            <!--            3：处理完成待验收-》编辑，通过（两个按钮）-->
            <!--            4：停用-》编辑，启用（两个按钮）-->
            <!--            5：报废-》编辑，维修，停用（三个按钮-->
            <!--            6：过期-》编辑（一个按钮）-->
            <a
              v-if="
                scope.row.equipmentState === 0 || scope.row.equipmentState === 5
              "
              style="cursor: pointer; margin-right: 10px; color: #4277e5"
              @click.stop="handleSolve(scope.row, 1)"
              >维修</a
            >
            <a
              v-if="scope.row.equipmentState === 4"
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 0)"
              >启用</a
            >
            <a
              v-if="
                scope.row.equipmentState === 0 || scope.row.equipmentState === 5
              "
              style="cursor: pointer; margin-right: 10px; color: #ff0000"
              @click.stop="handleSolve(scope.row, 4)"
              >停用</a
            >
            <a
              v-if="scope.row.equipmentState === 3"
              style="cursor: pointer; margin-right: 10px; color: dodgerblue"
              @click.stop="handleSolve(scope.row, 0)"
              >通过</a
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination :pagination="state" @change="changePage" />
    </el-card>
    <addEquipmentDialog
      ref="addEquipmentDialogRef"
      :type="state.type"
      @reload="getList"
    />
    <historyDetail ref="historyDetailRef" @reload="getList" />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import addEquipmentDialog from "@/components/equipment/addEquipmentDialog.vue";
import equipmentListForm from "@/components/equipment/equipmentListForm.vue";
import historyDetail from "@/components/equipment/historyDetail.vue";
import { equipmentPage } from "@/api/community";
import {
  equipmentChange,
  equipmentGenerateQrCode,
  equipmentRepair,
  settingUpholdUser,
  userInfoSelectList,
} from "@/api/common";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute();
const addEquipmentDialogRef = ref<any>(null);
const historyDetailRef = ref<any>(null);
const state = reactive({
  loading: false,
  search: "",
  tableData: [], // 数据列表
  total: 0, // 总条数
  pageIndex: 1, // 当前页
  pageSize: 10, // 分页大小
  type: "add", // 操作类型
  data: {}, // 设备详细数据
  equipmentUserList: [],
});
const mapsEquipmentState = {
  0: "正常",
  1: "派单",
  2: "处理中",
  3: "完成",
  4: "停用",
  5: "报废",
  6: "过期",
};
onMounted(() => {
  state.data = route.query.data && JSON.parse(route.query.data);
  getList();
  getEquipmentUserList();
});
// 查看详情
const seeDetail = () => {
  historyDetailRef.value.open(state.data);
};
const locationEquipment = (data: any) => {
  const temp = [];
  data.communityName && temp.push(data.communityName);
  data.residentialAreaName && temp.push(data.residentialAreaName);
  data.buildingName && temp.push(data.buildingName);
  data.unitName && temp.push(data.unitName);
  data.buildingStoreyName && temp.push(data.buildingStoreyName);
  data.roomName && temp.push(data.roomName);
  return `${temp.join("-")}`;
};
// 生成二维码
const qrCode = (data: any) => {
  const params = { id: data.id };
  equipmentGenerateQrCode(params)
    ?.then((item) => {
      if (item.code === 0) {
        ElMessageBox({
          title: "设备二维码",
          dangerouslyUseHTMLString: true,
          message: `<div><img src="${item.body}" alt=""></div>`,
          showCancelButton: true,
          confirmButtonText: "下载",
          cancelButtonText: "取消",
        })
          .then((action) => {
            const a = document.createElement("a");
            a.setAttribute("target", "_blank");
            a.href = item.body;
            a.click();
          })
          .catch((action) => {});
      } else {
        ElMessage.error(`生成失败`);
      }
    })
    .catch((err) => {
      ElMessage.error(
        `状态码：${err.status}, 路径：${err.path}, 错误：${err.error}`
      );
    });
};
// 获取列表
const getList = () => {
  state.loading = true;
  const params = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    equipmentType: state.data.equipmentType,
    supplierName: state.data.supplierName,
  };
  if (state.search) {
    params.search = state.search;
  }
  equipmentPage(params).then((res) => {
    state.loading = false;
    state.tableData = res.body.records.map((item) => {
      item.upholdNameListArr = item.upholdNameList.split(",");
      return item;
    });
    state.total = res.body.total;
  });
};
const handleSolve = (item: { id: string }, type: string) => {
  state.type = type;
  if (type === "edit") {
    addEquipmentDialogRef.value.open(item.id, item);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除社区, 是否继续?", "删除社区", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addEquipmentDialogRef.value.del(item.id);
    });
  } else if (type === 1) {
    equipmentRepair({
      id: item.id,
    }).then((res) => {
      if (res.code === 0) {
        ElMessage.success("修改成功");
        setTimeout(() => {
          getList();
        }, 1000);
      }
    });
  } else {
    equipmentChange({
      id: item.id,
      equipmentState: type,
    }).then((res) => {
      if (res.code === 0) {
        ElMessage.success("修改成功");
        setTimeout(() => {
          getList();
        }, 1000);
      }
    });
  }
};
// search回调
const handleSearch = (search: string) => {
  state.search = search;
  getList();
};
// 获取下拉用户列表
const getEquipmentUserList = () => {
  userInfoSelectList({}).then((item) => {
    if (item.code === 0) {
      state.equipmentUserList = item.body;
    } else {
      ElMessage.error(item.msg);
    }
  });
};
// 设置维修员
const setUserEquipment = (row: any, item: any) => {
  ElMessageBox.confirm(`确认将${item.userName}设置为维修员吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const { id } = row;
      const params = {
        equipmentId: id,
        userId: item.id,
      };
      settingUpholdUser(params).then((item) => {
        if (item.code === 0) {
          ElMessage.success("设置成功");
          setTimeout(() => {
            getList();
          }, 1000);
        } else {
          ElMessage.error(item.msg);
        }
      });
      // userInfoUpdate(params).then((item) => {
      //   if (item.code === 0) {
      //     getGuestList();
      //     ElMessage({
      //       type: "success",
      //       message: "修改成功",
      //     });
      //   } else {
      //     ElMessage({
      //       type: "warring",
      //       message: item.msg,
      //     });
      //   }
      // });
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "Delete canceled",
      // });
    });
};
// 点击新增按钮
const handleAdd = () => {
  state.type = "add";
  addEquipmentDialogRef.value.open();
};

const changePage = (val: number) => {
  state.pageIndex = val;
  getList();
};
</script>
<style scoped lang="scss">
.nameAndBtn {
  display: flex;
  align-items: center;
  .nameBtn {
    margin-left: 15px;
  }
}
.communityDetail {
  background: rgba(64, 158, 255, 0.14);
  padding: 20px 0;
  padding-left: 110px;
  //margin-top: -10px;
  p {
    padding: 10px 0;
  }
}
</style>
