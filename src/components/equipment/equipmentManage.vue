<template>
  <div>
    <el-card class="container">
      <template #header>
        <div class="header">
          <equipmentForm @search="handleSearch" @add="handleAdd" />
        </div>
      </template>
      <div class="equipmentBody">
        <div
          v-for="(item, index) in state.tableData"
          :key="index"
          class="equipmentItem"
          @click="toEquipmentList(item)"
        >
          <div class="title">
            <div class="name">
              {{ mapsEquipmentTypeDes[item.equipmentType] }}
            </div>
            <div class="alignCenter">
              <span>{{ item.equipmentTypeTotal }} 个</span>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="normalDiv">
            <div>安装时间：</div>
            <div>{{ item.installTime || "-" }}</div>
          </div>
          <div class="normalDiv">
            <div>安装位置：</div>
            <div>
              {{ locationEquipment(item) }}
            </div>
          </div>
          <div class="normalDiv">
            <div>设备使用周期：</div>
            <div>{{ item.equipmentUseLife || "-" }}</div>
          </div>
          <div class="normalDiv">
            <div>设备质保期：</div>
            <div>{{ item.warrantyEndTime || "-" }}</div>
          </div>
          <div class="normalDiv">
            <div>供应商服务期：</div>
            <div>{{ item.serviceEndTime || "-" }}</div>
          </div>
          <div class="normalDiv">
            <div>设备巡检周期：</div>
            <div class="alignCenter">
              <span>{{ mapsCheckCycle[item.checkCycle] || "-" }}</span>
              <el-tooltip
                content="巡检日期到了会自动给维护师傅发送日常巡检工单，请到维护管理中进行审核"
              >
                <el-icon size="18px" style="margin-left: 10px"
                  ><QuestionFilled
                /></el-icon>
              </el-tooltip>
            </div>
          </div>
          <div class="normalDiv">
            <div>供应商：</div>
            <div>
              {{ item.supplierName }} ,{{ item.supplierContactsName }},
              {{ item.supplierContactsTel }}
            </div>
          </div>
        </div>
      </div>
      <pagination :pagination="state" @change="changePage" />
    </el-card>
    <addEquipmentDialog
      ref="addEquipmentDialogRef"
      :type="state.type"
      @reload="getList"
    />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import { equipmentTypePage, generateQrCode } from "@/api/community";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import equipmentForm from "@/components/equipment/equipmentForm.vue";
import addEquipmentDialog from "@/components/equipment/addEquipmentDialog.vue";
const mapsCheckCycle = {
  1: "一天",
  2: "一周",
  3: "一月",
  4: "一年",
};
const mapsEquipmentTypeDes = {
  1: "摄像头",
  2: "烟感器",
  3: "电动车充电桩",
  4: "微型消防站",
};
const router = useRouter();
const route = useRoute();
const addEquipmentDialogRef = ref<any>(null);
const addResidential = ref<any>(null);
const state = reactive({
  loading: false,
  search: "",
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  pageIndex: 1, // 当前页
  pageSize: 9, // 分页大小
  type: "add", // 操作类型
  equipmentList: [],
});
onMounted(() => {
  getList();
});
const locationEquipment = (data: any) => {
  const temp = [];
  data.communityName && temp.push(data.communityName);
  data.residentialAreaName && temp.push(data.residentialAreaName);
  data.buildingName && temp.push(data.buildingName);
  data.unitName && temp.push(data.unitName);
  data.buildingName && temp.push(data.buildingName);
  data.buildingStoreyName && temp.push(data.buildingStoreyName);
  return `${temp.join("-")}`;
};
// 生成二维码
const qrCode = (data: any) => {
  const params = { id: data.id, govId: route.query.id, loginId: data.id };
  generateQrCode(params)
    ?.then((item) => {
      if (item.code === 0) {
        ElMessageBox({
          title: "小区二维码",
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
  };
  if (state.search) {
    params.search = state.search;
  }
  equipmentTypePage(params).then((res) => {
    state.loading = false;
    state.tableData = res.body.records;
    state.total = res.body.total;
  });
};
const handleSolve = (item: { id: string }, type: string) => {
  state.type = type;
  if (type === "edit") {
    addResidential.value.open(item.id, item);
  } else if (type === "del") {
    ElMessageBox.confirm("此操作会删除社区, 是否继续?", "删除社区", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      addResidential.value.del(item.id);
    });
  }
};
// search回调
const handleSearch = (search) => {
  state.search = search;
  getList();
};
const toEquipmentList = (item: any) => {
  router.push({
    path: "/equipment/equipmentList",
    query: {
      id: item.id || 1,
      data: JSON.stringify(item),
    },
  });
};
// 点击新增按钮
const handleAdd = () => {
  addEquipmentDialogRef.value.open(route.query.id);
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
.equipmentBody {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-flow: row wrap;
  .equipmentItem {
    border-radius: 5px;
    padding: 10px;
    box-shadow: 2px 1px 7px 4px #eee;
    border: 1px #fff solid;
    width: 30%;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 15px;
    &:hover {
      background: rgba(51, 136, 255, 0.15);
      border: 1px #eee solid;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      .name {
        font-size: 18px;
        color: #38f;
      }
      span {
        color: #38f;
      }
    }
    .normalDiv {
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 5px 0;
      font-size: 14px;
      & > div:first-child {
        color: #333;
      }
      & > div:last-child {
        color: #666;
      }
    }
  }
  .alignCenter {
    display: flex;
    align-items: center;
    i {
      margin-left: 5px;
    }
  }
}
</style>
