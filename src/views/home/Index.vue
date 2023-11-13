<script setup lang="ts">
console.log('index')
const activeIndex = ref('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
  console.log(index)
}
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4"><div class="grid-content ep-bg-purple" />xxxx</el-col>
          <el-col :span="20"><div class="grid-content ep-bg-purple-light" />
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">列表</el-menu-item>
              <el-menu-item index="3">列表x</el-menu-item>
              <el-menu-item index="4">列表2</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>


<style scoped lang="scss">

</style>