<template>
  <div>
    <el-card class="swiper-container">
      <template #header>
        <div class="header">
          <el-button type="primary" size="small" :icon="Plus" @click="handleAdd"
            >增加</el-button
          >
          <!--          <el-popconfirm title="确定删除吗？" @confirm="handleDelete">-->
          <!--            <template #reference>-->
          <!--              <el-button type="danger" size="small" icon="el-icon-delete"-->
          <!--                >批量删除</el-button-->
          <!--              >-->
          <!--            </template>-->
          <!--          </el-popconfirm>-->
        </div>
      </template>
      <el-table
        ref="multipleTable"
        v-loading="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="轮播图" width="200">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imgUrl"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" width="200">
          <template #default="scope">
            <a target="_blank" :href="scope.row.redirectUrl">{{
              scope.row.linkUrl || "-"
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="平台" width="120">
          <template #default="scope">
            <a>
              {{ translatePlateForm(scope.row.platform) }}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <a>
              <span v-if="scope.row.state === 1" style="color: green"
                >已启用</span
              >
              <span v-if="scope.row.state === 0" style="color: red"
                >已禁用</span
              >
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="200">
          <template #default="scope">
            <a>
              {{ translateDate(scope.row.createTime) }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <a
              style="cursor: pointer; margin-right: 10px; color: #409eff"
              @click="handleEdit(scope.row.id)"
              >修改</a
            >
            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDeleteOne(scope.row.id)"
            >
              <template #reference>
                <a style="cursor: pointer; color: red">删除</a>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--总数超过一页，再展示分页器-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="state.pageSize"
        :current-page="state.currentPage"
        @current-change="changePage"
      />
    </el-card>
    <DialogAddSwiper ref="addGood" @reload="getCarousels" :type="state.type" />
  </div>
</template>
<script setup lang="ts" name="BannerList">
import DialogAddSwiper from "@/components/banner/DialogAddSwiper.vue";
import { getBannerList } from "@/api/banner";
import { translatePlateForm, translateDate } from "@/utils";
import { Plus, Edit } from "@element-plus/icons-vue";
import axios from "axios";
const multipleTable = ref(null);
const addGood = ref<any>(null);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: "add", // 操作类型
});
onMounted(() => {
  getCarousels();
});
// 获取轮播图列表
const getCarousels = () => {
  state.loading = true;
  const params = {
    platform: "ywtg-applet",
    seat: "home",
  };
  getBannerList(params).then((res) => {
    console.log(res);
    state.loading = false;
    state.tableData = res.body;
    state.total = res.body.length;
  });
  //   axios.get('/carousels', {
  //     params: {
  //       pageNumber: state.currentPage,
  //       pageSize: state.pageSize
  //     }
  //   }).then(res => {
  //     state.tableData = res.list
  //     state.total = res.totalCount
  //     state.currentPage = res.currPage
  //     state.loading = false
  //   })
};
// 添加轮播项
const handleAdd = () => {
  state.type = "add";
  addGood.value.open();
};
// 修改轮播图
const handleEdit = (id: string) => {
  state.type = "edit";
  addGood.value.open(id);
};
// 选择项
const handleSelectionChange = (val: string) => {
  state.multipleSelection = val;
};
// 批量删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    // ElMessage.error("请选择项");
  }
  // axios
  //   .delete("/carousels", {
  //     data: {
  //       ids: state.multipleSelection.map((i) => i.carouselId),
  //     },
  //   })
  //   .then(() => {
  //     // ElMessage.success("删除成功");
  //     getCarousels();
  //   });
};
// 单个删除
const handleDeleteOne = (id: string) => {
  // 删除轮播图
  // axios
  //   .delete("/carousels", {
  //     data: {
  //       ids: [id],
  //     },
  //   })
  //   .then(() => {
  //     ElMessage.success("删除成功");
  //     getCarousels();
  //   });
};
const changePage = (val) => {
  state.currentPage = val;
  getCarousels();
};
</script>
<style scoped lang="less"></style>
