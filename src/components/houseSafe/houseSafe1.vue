<template>
  <div class="guest-container">
    <div class="house">
      <div class="title">数学模型</div>
      <div class="wordContent">
        <div class="word" style="text-align: left;">
          考虑到人员判断的不确定性和个体认识的差异，运用集体决策的思想，评分值的设计采用一个分值范围，并分别用多位消防专业人士根据所建立的指标体系，按照对安全有利的情况（越有利得分越高）进行了评分，从而降低不确定性和认识差异对结果准确性的影响。然后采用模糊集值统计方法，通过计算得出一个统一的结果。具体计算方法如下：
        </div>
        <div class="word" style="text-align: left;">
          对于指标，专家依据其评估标准和对该指标有关情况的了解给出一个特征值区间
        </div>
        <div class="normalImg">
          <img style="width: 80%" src="../../assets/image/imgs1.png" alt="" />
        </div>
      </div>
      <div class="title">评估指标</div>
      <div class="wordContent">
        <div class="normalImg">
          <img style="width: 80%" src="../../assets/image/imgs2.png" alt="" />
        </div>
        <div class="normalImg">
          <img style="width: 80%" src="../../assets/image/imgs3.png" alt="" />
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
  .normalImg {
    width: 100%;
    img {
      width: 80%;
    }
  }
  .wordContent {
    margin: 0 50px;
    text-align: center;
    .word {
      font-size: 18px;
      color: #444444;
      text-indent: 30px;
      line-height: 50px;
    }
  }
}
</style>
