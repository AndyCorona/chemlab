<template>
  <div class="reation-select-template-modal">
    <div class="mask" :class="open" @click="closeAndEmit" :style="`height:${height}px;width:${width}px`">
    </div>
    <div class="modal" :class="open">
      <div class="modal-header">
        实验模板
      </div>
      <div class="modal-body">
        <div class="title">内置模板</div>
        <div class="container">
          <button class="builtin" @click.prevent="" v-for="(item, index) in templates.builtin" :key="index">{{ item
          }}</button>
        </div>
        <div class="title">自定义</div>
        <div class="container">
          <button class="define" @click.prevent="" v-for="(item, index) in templates.define" :key="index">{{ item
          }}</button>
          <button class="newTemplate" @click.prevent="" v-show="this.templates.define.length < 5">+</button>
        </div>
      </div>
      <div class="modal-footer">
        <button @click.prevent="closeAndEmit" class="save">确认</button>
        <button @click.prevent="closeAndEmit" class="cancle">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionSelectTemplateModal',
  data() {
    return {
      open: this.show ? 'open' : 'close',
      templates: { builtin: ['模版A', '模版B', '模版C', '模版D', '模版E'], define: ['自定义1', '自定义2', '自定义3', '自定义4', '自定义5'] },
      height: '1080',
      width: '1920'
    }
  },
  emits: ['close'],
  props: {
    show: Boolean
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
.reation-select-template-modal {
  .mask {
    margin: 0 auto;
    backdrop-filter: blur(5px);
    position: absolute;
    top: -61px;
    left: -300px;
    z-index: 100;
  }

  .modal {
    z-index: 200;
    font-size: 20px;
    font-weight: bold;
    width: 800px;
    height: 450px;
    position: absolute;
    top: 40%;
    left: 50%;
    translate: -50% -50%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);

    .modal-header {
      box-sizing: border-box;
      padding: 16px;
      height: 60px;
      line-height: 28px;
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.35);
      margin-bottom: 30px;
    }

    .modal-body {
      font-size: 18px;
      font-weight: bold;
      padding: 0 50px;

      .title {
        padding-top: 30px 0 3px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
      }

      .container {
        display: flex;
        justify-content: space-between;
        margin: 30px 20px;

        button {
          cursor: pointer;
          width: 120px;
          height: 50px;
          border-radius: 5px;

          border: 1px solid #7F7F7F;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);
        }

        .builtin {
          background-color: #00BFBF;
        }

        .define {
          background-color: #ede9ec;
        }
      }
    }

    .modal-footer {
      display: flex;
      margin: 0 180px;
      justify-content: space-between;

      button {
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.35);
        cursor: pointer;
        width: 160px;
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
