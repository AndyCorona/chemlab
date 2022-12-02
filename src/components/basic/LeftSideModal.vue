<template>
  <div class="left-side-modal" @wheel.prevent="">
    <div class="mask" :class="open" @click="closeAndEmitNo" :style="
    `height:${this.$store.state.height}px`">
    </div>
    <div class="modal" :class="open">
      <div class="modal-header">
        <img :src="titleImg">
        <span>{{ showTitle }}</span>
      </div>
      <div class="modal-body">
        <slot :name="type"></slot>
      </div>
      <div class="modal-footer">
        <button @click.prevent="clickClose ? this.closeAndEmitOk : this.$emit('ok')" class="confirm">确认</button>
        <button @click.prevent="clickClose ? this.closeAndEmitNo : this.$emit('no')" class="cancle">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftSideModal',
  emits: ['ok', 'no'],
  props: {
    showText: String,
    showTitle: String,
    show: Boolean,
    titleImg: String,
    type: String,
    // 是否开启自动关闭对话框
    clickClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollTop: this.$store.state.scrollTop,
      height: this.$store.state.height,
      open: this.show ? 'open' : 'close'
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.open = 'open'
      } else {
        this.open = 'close'
      }
    }
  },
  methods: {
    close() {
      this.open = 'close'
    },
    closeAndEmitOk() {
      this.$emit('ok')
      this.close()
    },
    closeAndEmitNo() {
      this.$emit('no')
      this.close()
    }
  }
}
</script>

<style lang="scss">
.left-side-modal {
  .mask {
    margin: 0 auto;
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 1920px;
  }

  .modal {
    transition: all .3s;
    z-index: 200;
    min-width: 800px;
    height: 450px;
    position: absolute;
    top: 40%;
    left: 960px;
    translate: -50% -50%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);

    .modal-header {
      border-bottom: 1px solid #797979;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);
      align-items: center;
      display: flex;
      box-sizing: border-box;
      padding: 20px;
      height: 60px;
      line-height: 28px;
      margin-bottom: 40px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      span {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .modal-body {

      margin: 0 50px;

      label {
        font-size: 18px;
        font-weight: bold;
      }

      .title {
        display: block;
        padding: 2px 20px;
        border-bottom: 1px solid #000000;
        margin-bottom: 40px;
      }

      .create-wrapper {
        margin: 0 120px;
        display: flex;

        input {
          box-sizing: border-box;
          padding: 6px 10px;
          border: 1px solid #797979;
          background-color: #E0E6E3;
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.35);
          border-radius: 5px;
          width: 300px;
          height: 40px;
          margin-bottom: 15px;
        }

        textarea {
          border: 1px solid #797979;
          background-color: #E0E6E3;
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.35);
          border-radius: 5px;
          box-sizing: border-box;
          padding: 6px 10px;
          width: 300px;
          height: 100px;
          resize: none;
          margin-bottom: 50px;
        }

        label {
          margin-right: 35px;
        }
      }

      .join-wrapper {
        margin: 0 20px;
        display: flex;
        justify-content: space-between;

        input {
          width: 540px;
          box-sizing: border-box;
          padding: 6px 10px;
          border: 1px solid #797979;
          background-color: #E0E6E3;
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.35);
          border-radius: 5px;
          height: 40px;
          margin-bottom: 160px;
        }

        button {
          cursor: pointer;
          width: 80px;
          height: 40px;
          border-radius: 5px;
          background-color: #638271;
          border: 1px solid #638271;
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold
        }
      }

      .addMember-wrapper1 {
        margin: 0 20px;
        display: flex;
        justify-content: space-between;

        button {
          cursor: pointer;
          width: 80px;
          height: 40px;
          border-radius: 5px;
          background-color: #638271;
          border: 1px solid #638271;
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold
        }

        input {
          width: 540px;
          box-sizing: border-box;
          padding: 6px 10px;
          border: 1px solid #797979;
          background-color: #E0E6E3;
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.35);
          border-radius: 5px;
          height: 40px;
          margin-bottom: 30px;
        }
      }

      .addMember-wrapper2 {
        margin: 0 20px 30px 20px;
        height: 30px;
        line-height: 30px;
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
          margin-right: 20px;
        }

        img {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
      }
    }

    .modal-footer {
      display: flex;
      margin: 0 180px 40px 180px;
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

      .confirm {
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
