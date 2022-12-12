<template>
  <div class="common-modal" @wheel="preventWheel($event, prevent)">
    <div class="mask" :class="open" @click="closeAndEmitNo">
    </div>
    <div class="modal" :class="open" :style="`top:${open === 'open' ? $store.state.scrollTop + 350 : -100}px`">
      <div class="modal-header" :style="`box-shadow: ${!hasBorder ? 'none' : '0 4px 4px 0 rgba(0, 0, 0, 0.35)'}`">
        <img draggable="false" v-if="hasImg" :src="imgPath">
        <span>{{ showTitle }}</span>
      </div>
      <div class="modal-body">
        <slot :name="name"></slot>
      </div>
      <div class="modal-footer">
        <button :style="`width:${buttonWidth} `" @click.prevent="closeAndEmitOk(autoClose)" class="greenButton">{{
            buttonOk
        }}</button>
        <button v-if="showNoButton" :style="`width: ${buttonWidth}`" @click.prevent="closeAndEmitNo"
          class="whiteButton">{{
    buttonNo
          }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonModal',
  emits: ['ok', 'no'],
  props: {
    imgPath: String,
    hasImg: Boolean,
    name: String,
    showTitle: String,
    hasBorder: Boolean,
    show: Boolean,
    buttonOk: String,
    buttonNo: String,
    autoClose: Boolean,
    buttonWidth: String,
    showNoButton: {
      type: Boolean,
      default: true
    },
    // 是否关闭鼠标滚动行为
    prevent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    open() {
      return !this.show ? 'close' : 'open'
    }
  },
  methods: {
    closeAndEmitOk(autoClose) {
      this.$emit('ok')
      if (autoClose) {
        this.$store.commit('modal', { showModal: false })
      }
    },
    closeAndEmitNo() {
      this.$emit('no')
      this.$store.commit('modal', { showModal: false })
    },
    // 默认会阻止鼠标的滚动事件
    preventWheel(event, prevent = true) {
      if (prevent) {
        event.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss">
.common-modal {
  .mask {
    height: 100%;
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
    position: absolute;
    left: 50%;
    translate: -50% -50%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);

    .modal-header {
      padding: 16px 0;
      align-items: center;
      display: flex;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        margin-left: 10px;
      }

      span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }

    .modal-footer {
      display: flex;
      margin-bottom: 30px;
      justify-content: space-around;

      .small {
        width: 60px;
      }

      .medium {
        width: 80px;
      }

      .large {
        width: 160px;
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
