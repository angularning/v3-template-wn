<template>
  <div class="guest-container">
    <div class="house">
      <div class="title">量化范围</div>
      <div class="wordContent">
        <div class="word">
          根据消防安全的状况，将火灾高危单位消防安全等级划分为“低风险、中风险、高风险、极高风险”四个等级。见下表。
        </div>
        <div class="normalImg">
          <img src="../../assets/image/lhfw.png" alt="" />
        </div>
      </div>
      <div class="title">评估指标打分表</div>
      <div class="wordContent">
        <img class="normalImg" style="width: 80%" src="../../assets/image/pgdfb.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.guest-container {
  min-height: 100%;
  background: #fff;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
.roleListDiv {
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
}
.house {
  text-align: left;
  .title {
    text-align: center;
    font-size: 30px;
    color: #333;
    padding: 30px;
  }
  .normalImg {
    width: 100%;
    img {
      width: 80%;
    }
  }
  .wordContent {
    text-align: center;
    margin: 0 20px;
    .word {
      font-size: 18px;
      color: #444444;
      text-indent: 30px;
      line-height: 50px;
    }
  }
}
</style>
