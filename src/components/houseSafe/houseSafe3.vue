<template>
  <div class="guest-container">
    <div class="house">
      <div class="title">安全建议</div>
      <div class="wordContent">
        <div class="word">
          针对所有建筑风险分析及排查发现的火灾隐患，建议乡政府和村委会严格安全监管，健全乡镇应急体系，不断提高公共安全水平。坚持以安全为中心的发展思想，将公共安全作为最基本的民生保障，坚持预防为主、防消结合，坚持乡镇、村政府主导与村民参与相结合，共享共治建设安全乡镇，积极应对乡镇区域火灾风险，采取先进理念构建全天候、系统性、现代化、智慧化的消防安全保障体系，以最高标准、最严措施保障区域安全。
        </div>
        <div class="word">
          建议乡镇、村政府结合朝防字〔2018〕40号文件精神，开展消防宣传教育和培训，提高公众的消防安全意识、素质，提高消防管理人员的能力，开展常态化的隐患治理。及时消除现实的火灾隐患，建立隐患整改长效机制，控制不在产生新的火灾隐患，逐步消减隐患存量，降低火灾风险。完善村内的消火栓建设，提高初起火灾的灭火能力。
        </div>
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
  .wordContent {
    margin: 0 50px;
    .word {
      font-size: 18px;
      color: #444444;
      text-indent: 30px;
      line-height: 50px;
    }
  }
}
</style>
