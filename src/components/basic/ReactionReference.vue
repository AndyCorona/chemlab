<template>
  <div class="reaction-reference">
    <reaction-module-title placeholder="引用" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" :style="`width:${tWidth[index]}px`" v-for="(item, index) in thead " :key="index">
          <div :style="`width:${tWidth[index]}px`" @focusout="this.$store.commit('saveDraggable', true)"
            @focusin="this.$store.commit('saveDraggable', false)">
            {{ item }}
          </div>
        </div>
        <img draggable="false" src="/imgs/用户主页/添加项目.svg" @click.prevent="">
      </div>
      <div class="tbody" v-for="(row, i) in tbody" :key="i">
        <div class="wrapper" :style="`width:${tWidth[j]}px`" v-for="(item, j) in row" :key="j">
          <div :style="`width:${tWidth[j]}px`" contenteditable="true" @input="synTbody($event, i, j)"
            @focusout="this.$store.commit('saveDraggable', true)" @focusin="this.$store.commit('saveDraggable', false)">
            {{ item
            }}</div>
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-input" v-show="!referencePath[i]">
          <label :for="`img${randomNum * (i + 1)}`" draggable="false">解析文件</label>
          <input :id="`img${randomNum * (i + 1)}`" type="file" @change="resolveFile($event, i)">
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-reference" v-show="referencePath[i]">
          <a class="word-wrap" target="_blank" :href="referencePath[i]" draggable="false">{{ referencePath[i] }}</a>
        </div>
        <img src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-show="(tbody.length < 10)">+</div>
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from './ReactionModuleTitle.vue'
export default {
  name: 'ReactionReference',
  components: {
    ReactionModuleTitle
  },
  props: {
    moduleOrder: Number,
    showBlock: Boolean
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      thead: ['日期', '期刊', '标题', '链接'],
      tWidth: [200, 200, 200, 510],
      randomNum: Math.random()
    }
  },
  methods: {
    // 给表体双向绑定
    synTbody(event, i, j) {
      this.tbody[i][j] = event.target.innerHTML.trim()
    },
    addRow() {
      const arr = []
      arr.push(`行${this.tbody.length + 1}`)
      for (let i = 2; i < this.thead.length; i++) {
        arr.push('')
      }
      this.tbody.push(arr)
      this.referencePath.push('')
    },
    deleteRow(index) {
      this.tbody.splice(index, 1)
      this.referencePath.splice(index, 1)
    },
    resolveFile(event, row) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      // 改变文件之后，修改 referencePath 中的文件名
      this.referencePath[row] = 'https://www.baidu.com'
      // 解析文件并进行填充单元格
      // TODO
    },
    serialize() {
      // 只有一列，不需要上传
      if (this.row === 1) {
        this.$emit('success', null)
        return
      }
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      }
      // 单元格内容不为空
      if (isBlank) {
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            if (this.tbody[i][j].trim() !== '') {
              isBlank = false
              break
            }
          }
        }
      }
      // 标题为空、所有单元格内容为空 => 该模块不需要保存
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      // this.axios.post('')
      this.referencePath = ['https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333', 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333', 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333']
      const data = {
        type: 'data',
        title: this.title,
        content: [this.referencePath, this.tbody]
      }
      this.$emit('success', data)
    }
  },
  computed: {
    title: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? '' : this.$store.state.reactionInfo.data[this.moduleOrder].title
      },
      set(newVal) {
        this.$store.commit('saveReactionDataTitle', { index: this.moduleOrder, content: newVal })
      }
    },
    tbody: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? [] : this.$store.state.reactionInfo.data[this.moduleOrder].content[1]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [this.referencePath, newVal] })
      }
    },
    referencePath: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? [] : this.$store.state.reactionInfo.data[this.moduleOrder].content[0]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [newVal, this.tbody] })
      }
    }
  },
  watch: {
    isSubmit(newVal) {
      if (newVal) {
        this.serialize()
      }
    }
  }
}
</script>

<style lang="scss">
.reaction-reference {
  .container {
    box-sizing: border-box;
    font-size: 16px;
    width: 1200px;
    border-radius: 5px;
    border: 1px solid #000000;
    padding: 10px;

    .thead,
    .tbody {
      text-align: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;

      .wrapper {
        display: flex;
        align-items: center;

        div {
          text-align: left;
          min-height: 30px;
          line-height: 30px;
          border: 1px solid #FFFFFF;
        }
      }

      .show-reference {
        a {
          text-decoration: underline;
          color: #638271;
          display: inline-block;
          line-height: 30px;
          height: 30px;
          max-width: 510px;
        }

        cursor: pointer;
      }

      .show-input {
        input {
          display: none;
        }

        label {
          text-align: center;
          border: 1px dashed #555555;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          display: inline-block;
          width: 508px;
          font-size: 16px;
        }
      }
    }

    .tbody:hover {
      .wrapper {
        div {
          border: 1px solid #D7D7D7;
        }
      }
    }

    .thead {
      font-weight: bold;

      img {
        opacity: 0;
        width: 20px;
        height: 20px
      }

      div:nth-child(4) {

        div {
          text-align: center;
        }
      }
    }

    .NewRow {
      border-radius: 5px;
      border: 1px dashed #000000;
      height: 30px;
      line-height: 28px;
      width: 1180px;
      cursor: pointer;
      text-align: center;
    }
  }
}
</style>
