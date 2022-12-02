<template>
  <div class="reaction-save-template-modal">
    <div class="mask" :class="open" @click="closeAndEmit" :style="`height:${height}px;width:${width}px`">
    </div>
    <div class="modal" :class="open">
      <div class="modal-header">
        保存模板
      </div>
      <div class="modal-body">
        <div>模版名称</div>
        <input type="text" placeholder="请输入文本">
      </div>
      <div class="modal-footer">
        <button @click.prevent="closeAndEmit" class="save">保存</button>
        <button @click.prevent="closeAndEmit" class="cancle">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionSaveTemplateModal',
  emits: ['close'],
  props: {
    show: Boolean
  },
  data() {
    return {
      open: this.show ? 'open' : 'close',
      height: '1080',
      width: '1920'
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.open = 'open'
      }
    }
  },
  mounted() {
    this.height = document.body.clientHeight
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    close() {
      this.open = 'close'
    },
    closeAndEmit() {
      this.emitClose()
      this.close()
    }
  }
}
</script>
<style lang="scss">
.reaction-save-template-modal {
  .mask {
    margin: 0 auto;
    backdrop-filter: blur(10px);
    position: absolute;
    top: -61px;
    left: -300px;
    z-index: 100;
  }

  .modal {
    z-index: 200;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 64px;
    left: 1200px;
    background-color: #FFFFFF;
    width: 360px;
    height: 230px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.35);

    .modal-header {
      padding: 6px 10px;
      height: 30px;
      line-height: 30px;
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.35);
    }

    .modal-body {
      font-size: 18px;
      font-weight: bold;
      padding: 24px 30px;

      div {
        margin-bottom: 10px;
      }

      input {
        box-sizing: border-box;
        border: none;
        width: 300px;
        height: 40px;
        border-radius: 5px;
        padding: 2px 10px;
        border: 1px solid #797979;
        background-color: #E0E6E3;
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.35);
      }
    }

    .modal-footer {
      display: flex;
      margin: 0 70px;
      justify-content: space-between;

      button {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);
        cursor: pointer;
        width: 80px;
        height: 40px;
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
      }

      .cancle {
        background-color: #FFFFFF;
        border: 2px solid #638271;
        color: #638271;
      }

      .save {
        background-color: #638271;
        border: 2px solid #638271;
        color: #FFFFFF;
      }

    }
  }

  .close {
    display: none;
  }

  .open {
    display: block;
  }
}
</style>
