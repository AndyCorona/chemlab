
<template>
  <div class="main-project-and-reaction-title">
    <div :class="ClassType">
      <img src="/imgs/用户主页/项目列表.svg">
      <input :readonly="ReadOnly" type="text" autocomplete="off" name="project-name" :value="Value">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainProjectAndReactionTitle',
  props: { ClassType: String, ProjectName: String, ReadOnly: { default: true, type: Boolean }, Value: { type: String, default: '项目列表' } }
}
</script>
<style lang="scss">
.main-project-and-reaction-title {
  margin: auto 140px;

  .project-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: none;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .reaction-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: 0;
      font-size: 36px;
      font-weight: bold;
      width: 1000px;
    }
  }

}
</style>
