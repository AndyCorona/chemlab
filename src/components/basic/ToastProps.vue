<template>
  <div class="toast-props" :class="open">
    <div class="toast-container" :id="ClassState">
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
    DurationTime: Number
  },
  data() {
    return {
      open: this.show,
      ToastSuccess: this.$config.ToastSuccess,
      ToastFail: this.$config.ToastFail,
      ToastForbid: this.$config.ToastForbid
    }
  },
  computed: {
    ClassState() {
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
        return this.ToastSuccess
      } else if (this.state === 1) {
        return this.ToastFail
      } else if (this.state === 2) {
        return this.ToastForbid
      } else {
        return ''
      }
    }

  },
  watch: {
    show: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.open = 'open'
          setTimeout(() => {
            this.open = 'close'
            this.$emit('close')
          }, this.DurationTime)
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
  top: -10%;
  transition: top .7s;
}

.open {
  transition: top .7s;
  top: 20%;
}
</style>
