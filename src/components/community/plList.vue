<template>
  <div>
    <el-card class="swiper-container">
      <template #header>
        <div v-if="false" class="header">
          header
          <!--          <communityForm @search="handleSearch" @add="handleAdd" />-->
        </div>
      </template>
      <div class="plWrap">
        <div class="left">
          <template v-if="communityList && communityList.length > 0">
            <el-collapse v-model="model1" accordion>
              <el-collapse-item
                v-for="(item, index) in communityList"
                :key="index"
                :name="index"
              >
                <template #title>
                  <div class="title1">
                    <el-icon color="#409eff" size="18px"><Discount /></el-icon>
                    <span>{{ item.name }}</span>
                  </div>
                </template>
                <el-collapse
                  v-model="model2"
                  accordion
                  @change="changeResidential"
                >
                  <el-collapse-item
                    v-for="(ite, resiKey) in item.residentialAreaList"
                    :key="resiKey"
                    :name="resiKey"
                  >
                    <template #title>
                      <div
                        class="title2"
                        @click.prevent="clickResidential(ite, resiKey)"
                      >
                        {{ ite.areaName }}
                      </div>
                    </template>
                    <el-collapse v-model="model3" accordion>
                      <el-collapse-item
                        v-for="(build, ind) in ite.building"
                        :name="ind"
                      >
                        <template #title
                          ><div class="title3" @click="handleBuild(ind, build)">
                            {{ build.name }}
                          </div>
                        </template>
                        <div
                          v-for="(
                            unit, unitKey
                          ) in build.buildingUnitListVoList"
                          :name="unitKey"
                          class="unitListItem"
                          :class="{ unitedClass: unitKey === aIndex }"
                          @click="handleUnit(unitKey, unit, build)"
                        >
                          <a>
                            {{ unit.unitName }}
                          </a>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
          </template>
        </div>
        <div class="right">
          <div v-if="roomList && roomList.length > 0" class="roomDetail">
            <div class="roomUnitTitle">
              房间列表
              <!--              {{-->
              <!--                useStore.residential?.building &&-->
              <!--                useStore.residential?.building.length > 0 &&-->
              <!--                useStore.residential?.building[0]?.buildingUnitListVoList[0]-->
              <!--                  ?.unitName-->
              <!--              }}-->
            </div>
            <div class="roomList">
              <div
                v-for="(item, index) in roomList"
                :key="index"
                class="roomItem"
                @click="toShowDetail(item)"
              >
                <div class="homeNumber">
                  <div class="homeLabel">房间号：</div>
                  <em>{{ item.roomNumber }}</em>
                </div>
                <div class="homePopulation">
                  <div class="homeLabel">居住几人：</div>
                  <em>{{ item.population }}</em>
                </div>
                <div class="labelList">
                  <div class="homeLabel">标签：</div>
                  <div class="labels">
                    <span
                      v-for="(it, i) in item.labels"
                      :key="i"
                      class="labelItem"
                      :style="{
                        backgroundColor: it.colorRGBCode,
                        color: '#333',
                      }"
                      >{{ it.labelName }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-empty />
          </div>
        </div>
      </div>
    </el-card>
    <plDetailVue ref="plDetail" />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import {
  communityInfoSelectList,
  getComList,
  statisticsList,
} from "@/api/community";
import plDetailVue from "@/components/community/plDetail.vue";

import { useRoute, useRouter } from "vue-router";
import { usePlInfo } from "@/pinia/modules/community";
const plDetail = ref<any>(null);
const useStore = usePlInfo();
const router = useRouter();
const route = useRoute();
const roomUnitId = ref<number>(0);
const model1 = ref<number>(0);
const model2 = ref<number>(0);
const model3 = ref<number>(0);
const aIndex = ref<number>(0);
// const changeLast = () => {
//   aIndex.value = -1;
// };
// 社区模拟
const communityList = ref<any>([]);
// 房间模拟
const roomList = ref<any>([]);
// 点击查询 room
const handleUnit = (index: number, item: any, build: any) => {
  roomList.value = item.buildingStoreyListVoList;
  roomUnitId.value = build && build.id;
  aIndex.value = index;
};

// 点击单元
const handleBuild = (index: string, item: any) => {
  if (
    item &&
    item.buildingUnitListVoList &&
    item.buildingUnitListVoList.length > 0
  ) {
    handleUnit(0, item.buildingUnitListVoList[0]);
  }
};

// 点击小区
const clickResidential = (event: any, index: number) => {
  // console.log(model2.value);
  byIdGetList(event.id, 2, index);
};

// 小区变化
const changeResidential = (event: any) => {};
// 显示详情
const toShowDetail = (item: any) => {
  plDetail.value.visible = true;
  const data = {
    buildingId: item.buildingId,
    buildingStoreyId: item.storeyNumber,
    buildingUnitId: roomUnitId.value,
    communityId: useStore.community.communityId,
    residentialAreaId: item.residentialAreaId,
    roomNumber: item.id,
    // userId: data.userId,
  };
  plDetail.value.open(data);
};
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  type: "add", // 操作类型
});
onMounted(() => {
  if (route.query.id) {
    byIdGetList(route.query.id, 1);
  }
});
const byIdGetList = (id: string, from: number, index: number) => {
  const communityId = route.query.c;
  if (communityId) {
    const params = {
      communityId,
      govId: useStore.community.govId,
      residentialAreaId: id,
      // name: data.areaName,
      // userId: data.id,
    };
    statisticsList(params).then((item) => {
      const community = useStore.community;
      community.residentialAreaList = useStore.residential;
      if (
        community.residentialAreaList &&
        community.residentialAreaList[0] &&
        from === 1
      ) {
        community.residentialAreaList[0].building = item.body;
      } else {
        community.residentialAreaList[index].building = item.body;
      }
      community.plInfo = item.body;
      const temp = item.body;
      if (temp.length > 0) {
        roomList.value =
          temp[0] &&
          temp[0].buildingUnitListVoList &&
          temp[0].buildingUnitListVoList[0] &&
          temp[0].buildingUnitListVoList[0].buildingStoreyListVoList;
        roomUnitId.value =
          temp[0] &&
          temp[0].buildingUnitListVoList &&
          temp[0].buildingUnitListVoList[0] &&
          temp[0].buildingUnitListVoList[0].id;
      }
      communityList.value = [community];
    });
  }
};

// 跳转小区
const toVillage = (item: any) => {
  router.push({
    path: "/",
  });
};
</script>
<style lang="scss">
.plWrap {
  display: flex;
  flex-flow: row nowrap;
  .left {
    width: 300px;
    max-height: 560px;
    overflow: auto;
    .title1 {
      padding-left: 20px;
      display: flex;
      font-size: 15px;
      align-items: center;
      span {
        margin-left: 5px;
      }
      &:hover {
        color: #409eff;
      }
    }
    .title2 {
      padding-left: 50px;
      width: 120%;
      &:hover {
        color: #409eff;
      }
    }
    .title3 {
      padding-left: 70px;
      width: 100%;
      &:hover {
        color: #409eff;
      }
    }
    .unitListItem {
      padding: 15px 0 15px 110px;
      cursor: pointer;
      &:hover,
      &:visited,
      &:link {
        color: #409eff;
        background: rgba(64, 158, 255, 0.19);
      }
    }
  }
  .unitClass {
  }
  .unitedClass {
    color: #409eff;
    background: rgba(64, 158, 255, 0.19);
  }
  .el-collapse-item__wrap {
    border: none;
  }
  .right {
    width: calc(100% - 500px);
    margin-left: 20px;
    .roomUnitTitle {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
    }
    .roomList {
      display: flex;
      flex-flow: row wrap;
      font-size: 13px;
      justify-content: center;
      .roomItem {
        border: 1px #eee solid;
        padding: 5px;
        width: 200px;
        margin: 5px;
        text-align: left;
        em {
          font-style: normal;
          font-size: 16px;
          color: #409eff;
          //font-weight: bold;
        }
        .homeLabel {
          display: inline-block;
          width: 70px;
        }
        .homeNumber {
          margin: 5px 0;
        }
        .homePopulation {
          margin-bottom: 10px;
        }
        &:hover {
          cursor: pointer;
          background: rgba(64, 158, 255, 0.19);
        }
      }
    }
    .labelList {
      display: flex;
      .labels {
        display: flex;
        flex-flow: row wrap;
      }
    }
    .labelItem {
      width: 60px;
      text-align: center;
      display: inline-block;
      padding: 3px 6px;
      font-size: 13px;
      border-radius: 5px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
