<template>
  <div class="common-info-modal" @wheel.prevent="">
    <div class="mask" :class="open" @click="closeAndEmitNo" :style="
    `height:${this.$store.state.height}px`">
    </div>
    <div class="modal" :class="open"
      :style="`top:${this.open === 'open' ? this.$store.state.scrollTop + 350 : -100}px`">
      <div class="modal-header">
        <img src="/imgs/Dialog/提醒.svg">
        <span>{{ showTitle }}</span>
      </div>
      <div class="modal-body">
        <div>{{ showText }}</div>
      </div>
      <div class="modal-footer">
        <button @click.prevent="closeAndEmitOk" class="save">是</button>
        <button @click.prevent="closeAndEmitNo" class="cancle">否</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonInfoModal',
  emits: ['ok', 'no'],
  props: {
    showText: String,
    showTitle: String,
    show: Boolean
  },
  data() {
    return {
      open: this.show ? 'open' : 'close'
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.open = 'open'
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
.common-info-modal {
  .mask {
    width: 1920px;
    margin: 0 auto;
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }

  .modal {
    transition: all .3s;
    z-index: 400;
    min-width: 320px;
    position: absolute;
    // top: 540px;
    left: 50%;
    translate: -50% -50%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);

    .modal-header {
      align-items: center;
      display: flex;
      box-sizing: border-box;
      padding: 20px;
      height: 33%;
      line-height: 28px;
      margin-bottom: 10px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      span {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .modal-body {
      padding: 20px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 20px;
    }

    .modal-footer {
      display: flex;
      margin: 20px 60px;
      justify-content: space-between;

      button {
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.35);
        cursor: pointer;
        width: 60px;
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
