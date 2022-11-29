<template>
  <div class="common-info-modal">
    <div class="mask" :class="open" @click="animate" :style="
    `height:${height}px;width:${width}px`">
    </div>
    <div class="modal" :class="[dynamic, open]">
      <div class="modal-header">
        <img src="/imgs/Dialog/提醒.svg">
        <span>{{ ShowTitle }}</span>
      </div>
      <div class="modal-body">
        <div>{{ ShowText }}</div>
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
    ShowText: String,
    ShowTitle: String,
    show: Boolean
  },
  data() {
    return {
      dynamic: '',
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
    },
    animate() {
      this.dynamic = 'dynamic'
      setTimeout(() => {
        this.dynamic = ''
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.common-info-modal {
  .mask {
    margin: 0 auto;
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .modal {
    transition: all .3s;
    z-index: 200;
    width: 320px;
    height: 180px;
    position: absolute;
    top: 40%;
    left: 50%;
    translate: -50% -50%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);

    .modal-header {
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
      font-size: 16px;
      text-align: center;
      margin-bottom: 20px;
    }

    .modal-footer {
      display: flex;
      margin: 0 60px;
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

  .dynamic {
    width: 330px;
    height: 197px;
    transition: all .3s;
  }

  .close {
    display: none;
  }

  .open {
    display: block;
  }
}
</style>
