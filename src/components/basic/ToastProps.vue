<template>
  <div class="toast-props" :class="open"
    :style="`top:${this.open ==='open' ? this.$store.state.scrollTop + 200 :-100}px`">
    <div class="toast-container" :id="classState">
      <img :src="icon">
      <span>{{ text }}</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ToastProps',
  emits: ['close'],
  props: {
    // 是否显示
    show: Boolean,
    // 要显示的文字
    text: String,
    // 0 代表成功， 1 代表失败， 2 代表禁止
    state: Number,
    // 持续时间
    durationTime: Number
  },
  data() {
    return {
      open: this.show,
      toastSuccess: this.$config.toastSuccess,
      toastFail: this.$config.toastFail,
      toastForbid: this.$config.toastForbid
    }
  },
  computed: {
    classState() {
      if (this.state === 0) {
        return 'success'
      } else if (this.state === 1) {
        return 'fail'
      } else if (this.state === 2) {
        return 'forbid'
      } else {
        return ''
      }
    },
    icon() {
      if (this.state === 0) {
        return this.toastSuccess
      } else if (this.state === 1) {
        return this.toastFail
      } else if (this.state === 2) {
        return this.toastForbid
      } else {
        return ''
      }
    }

  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.open = 'open'
          setTimeout(() => {
            this.open = 'close'
            this.$emit('close')
          }, this.durationTime)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.toast-props {
  position: absolute;
  top: -10%;
  left: 50%;
  translate: -50% -50%;
  z-index: 999999;

  .toast-container {

    display: flex;
    width: 400px;
    height: 60px;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      margin-left: 25px;
    }

    span {
      text-align: center;
      display: inline-block;
      font-size: 16px;
      margin-right: 25px;
      width: 300px;

    }

    border-radius: 5px;
    border: 1px solid #000000;
  }

  #success {
    color: #638271;
    background-color: #CFEFC7;
  }

  #fail {
    color: #D9001B;
    background-color: #FFF1F1;
  }

  #forbid {
    color: #555555;
    background-color: #D7D7D7;
  }

}

.close {
  transition: top .5s;
}

.open {
  transition: top .5s;
}
</style>
