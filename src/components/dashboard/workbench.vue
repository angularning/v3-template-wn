<template>
  <div class="workbench">
    <div class="commonTitle">待办</div>
    <el-card shadow="never">
      <el-row :gutter="8" class="workbench-nav">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <el-image
            style="width: 100%; height: 200px"
            :src="getImage('workbench', 'svg')"
            fit="fill"
          />
        </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <div class="image-space">
            <strong class="workbench-nav-title"
              >{{ hoursTip }}，欢迎来到{{
                userStore.roleName
              }}，祝你开开心心每一天 !</strong
            >
            <small class="workbench-nav-introduce"></small>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div class="commonTitle">数据分析</div>
    <div class="analysis">
      <el-row :gutter="8">
        <el-col
          v-for="(item, index) in dataList"
          :key="index"
          :xs="12"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
        >
          <el-card shadow="never" :body-style="{ padding: '35px 20px' }">
            <template #header>
              <div class="card-header">
                <span class="card-header-title">{{ item.title }}</span>
                <el-tag :type="item.type" effect="dark">{{
                  item.labelTitle
                }}</el-tag>
              </div>
            </template>
            <div class="text item card-h-total">{{ item.total }}</div>
          </el-card>
        </el-col>
      </el-row>
      <!--      <el-row :gutter="8" justify="space-between">-->
      <!--        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">-->
      <!--          <el-card class="m-t8" shadow="never">-->
      <!--            <template #header>-->
      <!--              <div class="card-header">-->
      <!--                <span class="card-header-title">人口年龄分布</span>-->
      <!--              </div>-->
      <!--            </template>-->
      <!--            <div class="text item">-->
      <!--              <template v-if="dataChart.populationAgeList.length > 0">-->
      <!--                <div id="activeChart" class="home_charts"></div>-->
      <!--              </template>-->
      <!--              <el-empty v-else></el-empty>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">-->
      <!--          <el-card class="m-t8" shadow="never">-->
      <!--            <template #header>-->
      <!--              <div class="card-header">-->
      <!--                <span class="card-header-title">标签用户分布</span>-->
      <!--              </div>-->
      <!--            </template>-->
      <!--            <div class="text item">-->
      <!--              <template v-if="dataChart.populationLabelsList.length > 0">-->
      <!--                <div id="genderChart" class="home_charts"></div>-->
      <!--              </template>-->
      <!--              <el-empty v-else></el-empty>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TagProps } from "element-plus";
import { siteName } from "@/router/middleware";
import { getImage } from "@/utils";
import { indexCensus, indexStatisticsInfo } from "@/api/common";
import { useUserStore } from "@/pinia/modules/user";
const hoursTip = ref<string>("");

type DataList = {
  type: TagProps["type"];
  title: string;
  labelTitle: string;
  total: number | string;
};
const eCharts: any = inject("eCharts");

const dataList = ref<DataList>(null);

const originChart = ref<any>(null);
const activeChart = ref<any>(null);
const statisticsChart = ref<any>(null);
let dataChart = reactive({
  populationLabelsList: [],
  populationAgeList: [],
});
const userStore = useUserStore();

onMounted(() => {
  console.log(userStore.roleName);
  chartsInit();
  accessTimeRange();
});

onActivated(() => chartsInit());
onUnmounted(() => chartsDispose());
onDeactivated(() => chartsDispose());

const chartsDispose = () => {
  if (originChart.value) {
    originChart.value.dispose();
  }

  if (activeChart.value) {
    activeChart.value.dispose();
  }
  if (statisticsChart.value) {
    statisticsChart.value.dispose();
  }
};

const chartsInit = async () => {
  // 请求数据
  indexCensus({}).then((item) => {
    if (item.code === 0) {
      if(userStore.roleName !== '社区防火安全') {
        dataList.value = [
          {
            title: "录入人口总数",
            total: item.body.userTotalNum,
            labelTitle: "总数",
            type: "danger",
          },
          {
            title: "本日新增录入",
            total: item.body.todayAddNum,
            labelTitle: "总数",
            type: "",
          },
          {
            title: "户籍人口",
            total: item.body.idAddressTotalNum,
            labelTitle: "总数",
            type: "success",
          },
          {
            title: "常驻人口",
            total: item.body.oftenStayTotalNum,
            labelTitle: "总数",
            type: "warning",
          },
        ];
      } else {
        dataList.value = [
          {
            title: "录入设备总数",
            total: item.body.userTotalNum,
            labelTitle: "总数",
            type: "danger",
          },
          {
            title: "本日新增录入",
            total: item.body.todayAddNum,
            labelTitle: "总数",
            type: "",
          },
          {
            title: "维修人员",
            total: item.body.idAddressTotalNum,
            labelTitle: "总数",
            type: "success",
          },
        ];
      }
    }
  });
  indexStatisticsInfo({}).then((item) => {
    dataChart = item.body;
    loadActiveChart();
    loadGenderChart();
    console.log("item", item);
  });
  //图标初始化
  // loadOriginChart();
};

const loadOriginChart = () => {
  //加载访问图表
  originChart.value = eCharts.init(document.getElementById("originChart"));
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件营销" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" },
        ],
      },
    ],
  };
  originChart.value.setOption(option);
};

const loadActiveChart = () => {
  //每周访问量
  activeChart.value = eCharts.init(document.getElementById("activeChart"));
  // 绘制图表
  const option = {
    xAxis: {
      type: "category",
      data: dataChart.populationAgeList.map((item) => item.x),
      axisLabel: {
        //x轴文字的配置
        show: true,
        interval: 0,
        textStyle: {
          color: "#333",
        },
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: dataChart.populationAgeList.map((item) => item.y),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  activeChart.value.setOption(option);
};

const loadGenderChart = () => {
  //用户性别统计
  statisticsChart.value = eCharts.init(document.getElementById("genderChart"));
  // 绘制图表
  const option = {
    xAxis: {
      type: "category",
      data: dataChart.populationLabelsList.map((item) => item.y),
      axisLabel: {
        //x轴文字的配置
        show: true,
        interval: 0,
        textStyle: {
          color: "#333",
        },
      },
    },
    yAxis: {
      type: "value",
    },
    series: {
      data: dataChart.populationLabelsList.map((item) => item.value),
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  };
  statisticsChart.value.setOption(option);
};
const accessTimeRange = () => {
  //获取时间范围
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) {
    hoursTip.value = "早上好";
  } else if (hour >= 12 && hour < 18) {
    hoursTip.value = "下午好";
  } else {
    hoursTip.value = "晚上好";
  }
};

const toViewDocument = (url: string) => {
  //打开文档
  window.open(url);
};
</script>
<style lang="scss" scoped>
.analysis {
  //margin-top: 10px;
  .home_charts {
    height: 380px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;

    .card-header-title {
      font-size: 15px;
    }
  }

  .card-h-total {
    font-size: 28px;
  }
}

.workbench {
  height: auto;
  .module-icon {
    padding-right: 4px;
    font-size: 16px;
  }

  &-nav {
    border-radius: 4px;
    display: flex;
    align-items: center;

    .image-space {
      text-align: center;
    }

    .workbench-nav-title {
      font-size: 24px;
    }

    .workbench-nav-introduce {
      display: block;
      color: #808695;
      padding-top: 30px;
    }
  }

  &-statistics {
    &-label {
      font-size: 15px;
      display: block;
      color: var(--af-default-font-color);
      padding: 4px 5px;
    }

    &-value {
      display: block;
      padding-top: 10px;
      font-size: 25px;
      font-weight: bold;
      color: var(--af-default-font-color);
    }
  }

  &-navigation {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px 20px;
    list-style: none;

    li {
      cursor: pointer;
      text-align: center;
      border-radius: 3px;
      color: #606266;
      font-size: 14px;

      i {
        font-size: 22px;
        padding-bottom: 8px;
      }

      span {
        color: var(--af-default-font-color);
      }
    }

    li:hover {
      color: #409eff;
    }
  }

  &-use-help {
    ul {
      list-style: none;

      li {
        margin-top: 10px;
      }
    }

    .other-help {
      border-top: 1px solid #e4e7ed;
      padding-top: 15px;
      margin-top: 20px;

      &-label {
        display: block;
        padding-bottom: 10px;
      }
    }
  }
  .commonTitle {
    font-size: 20px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 20px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 5px;
      width: 4px;
      height: 20px;
      background: #409eff;
    }
  }
}
</style>
