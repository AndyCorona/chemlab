<template>
  <div class="reaction-right-bar-record">
    <img draggable="false" src="/imgs/登录页/产品图标.png" ref="img" style="position: absolute; top: -1000px;width: 100px;height:100px">
    <div class="wrapper" draggable="true" @dragstart="dragStart($event, 'scheme')" :style="`cursor: ${dragCursor}`"
      @drag="dragCursor = 'grabbing'" @dragend="dragCursor = 'grab', this.$store.commit('saveIsDragging', false)">
      <img draggable="false" src="/imgs/单个实验/模块-图片.svg">
      <span>图片</span>
    </div>
    <div class="wrapper" draggable="true" @dragstart="dragStart($event, 'table')" :style="`cursor: ${dragCursor}`"
      @drag="dragCursor = 'grabbing'" @dragend="dragCursor = 'grab', this.$store.commit('saveIsDragging', false)">
      <img draggable="false" src="/imgs/单个实验/模块-表格.svg">
      <span>表格</span>
    </div>
    <div class="wrapper" draggable="true" @dragstart="dragStart($event, 'text')" :style="`cursor: ${dragCursor}`"
      @drag="dragCursor = 'grabbing'" @dragend="dragCursor = 'grab', this.$store.commit('saveIsDragging', false)">
      <img draggable="false" src="/imgs/单个实验/模块-文本.svg">
      <span>文本</span>
    </div>
    <div class="wrapper" draggable="true" @dragstart="dragStart($event, 'data')" :style="`cursor: ${dragCursor}`"
      @drag="dragCursor = 'grabbing'" @dragend="dragCursor = 'grab', this.$store.commit('saveIsDragging', false)">
      <img draggable="false" src="/imgs/单个实验/模块-数据.svg">
      <span>数据</span>
    </div>
    <div class="wrapper" draggable="true" @dragstart="dragStart($event, 'reference')" :style="`cursor: ${dragCursor}`"
      @drag="dragCursor = 'grabbing'" @dragend="(dragCursor = 'grab', this.$store.commit('saveIsDragging', false))">
      <img draggable="false" src="/imgs/单个实验/模块-引文.svg">
      <span>引文</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionRightBarRecord',
  data() {
    return {
      dragCursor: 'grab',
      img: document.createElement('img')
    }
  },
  methods: {
    dragStart(event, moduleName) {
      // 启动拖拽事件，让表单元素禁止
      this.$store.commit('saveIsDragging', true)
      // 设置传输的数据
      event.dataTransfer.setData('text/plain', moduleName)
      // 设置拖动时的图片效果
      event.dataTransfer.setDragImage(this.$refs.img, 50, 50)
      event.dataTransfer.effectAllowed = 'move'
    }
  }
}
</script>

<style lang="scss" >
.reaction-right-bar-record {
  .wrapper {
    cursor: grab;
    width: 240px;
    height: 50px;
    margin: 0 30px 15px 30px;
    background-color: #F1EDDF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);

    img {
      margin: 12px;
      width: 24px;
      height: 24px;
    }

    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
