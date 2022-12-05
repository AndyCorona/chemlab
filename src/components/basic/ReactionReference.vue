<template>
  <div class="reaction-reference">
    <reaction-module-title placeholder="引用" @input="gotTitle" :moduleOrder="moduleOrder"
      :dataOrder="dataOrder"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" :style="`width:${tWidth[index]}px`" v-for="(item, index) in thead " :key="index">
          <div :style="`width:${tWidth[index]}px`">
            {{ item }}
          </div>
        </div>
        <img draggable="false" src="/imgs/用户主页/添加项目.svg" @click.prevent="">
      </div>
      <div class="tbody" v-for="(row, i) in tbody" :key="i">
        <div class="wrapper" :style="`width:${tWidth[j]}px`" v-for="(item, j) in row" :key="j">
          <div :style="`width:${tWidth[j]}px`" contenteditable="true" @input="synTbody($event, i, j)">{{ item
          }}</div>
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-input" v-show="!hasFile[i]">
          <label :for="`img${randomNum * (i + 1)}`">解析文件</label>
          <input :id="`img${randomNum * (i + 1)}`" type="file" @change="resolveFile($event, i)">
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-reference" v-show="hasFile[i]">
          <a class="word-wrap" target="_blank" :href="referencePath[i]">{{ referencePath[i] }}</a>
        </div>
        <img src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-show="(this.tbody.length < 10)">+</div>
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
    dataOrder: Number
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      title: '',
      thead: ['日期', '期刊', '标题', '链接'],
      tWidth: [200, 200, 200, 510],
      tbody: !this.$store.state.reactionInfo.data ? [] : this.$store.state.reactionInfo.data[this.dataOrder].content.slice(1),
      referencePath: !this.$store.state.reactionInfo.data ? [] : this.$store.state.reactionInfo.data[this.dataOrder].content[0],
      col: 4,
      row: null,
      randomNum: Math.random(),
      hasFile: []
    }
  },
  methods: {
    gotTitle(value) {
      this.title = value
    },
    // 给表体双向绑定
    synTbody(event, i, j) {
      this.tbody[i][j] = event.target.innerHTML
    },
    addRow() {
      this.row++
      const arr = []
      arr.push(`行${this.row}`)
      for (let i = 2; i < this.thead.length; i++) {
        arr.push('')
      }
      this.tbody.push(arr)
      this.referencePath.push('')
    },
    deleteRow(index) {
      this.tbody.splice(index, 1)
      this.referencePath.splice(index, 1)
      this.row--
    },
    resolveFile(event, row) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      // 改变文件之后，文件状态为已经上传
      this.hasFile[row] = true
      this.referencePath[row] = '111111111'
      // 解析文件并进行填充单元格
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
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      // this.axios.post('')
      this.referencePath = ['https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333', 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333', 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333']
      const data = {
        type: 'data',
        title: this.title,
        content: []
      }
      data.content.push(this.referencePath)
      data.content.push(this.tbody)
      this.$emit('success', data)
    }
  },
  computed: {
    readonlyTbody() {
      if (!this.$store.state.reactionInfo.data) {
        return []
      } else {
        const retArr = []
        const arr = this.$store.state.reactionInfo.data[this.dataOrder].content
        const length = arr.length
        if (length > 1) {
          for (let i = 1; i < length; i++) {
            retArr.push(arr[i])
          }
        }
        return retArr
      }
    },
    readonlyreferencePath() {
      return !this.$store.state.reactionInfo.data ? [] : this.$store.state.reactionInfo.data[this.dataOrder].content[0]
    },
    readyonlyHasFile() {
      if (!this.$store.state.reactionInfo.data) {
        return []
      } else {
        const retArr = []
        const arr = this.$store.state.reactionInfo.data[this.dataOrder].content[0]
        const length = arr.length
        for (let i = 0; i < length; i++) {
          if (arr[i] !== '') {
            retArr.push(true)
          } else {
            retArr.push(false)
          }
        }
        return retArr
      }
    }
  },
  watch: {
    readonlyTbody(newVal) {
      this.tbody = newVal
    },
    readonlyreferencePath: {
      handler(newVal) {
        this.referencePath = newVal
      }
    },
    readyonlyHasFile: {
      handler(newVal) {
        this.hasFile = newVal
      },
      immediate: true
    },
    tbody: {
      handler(newVal) {
        this.row = newVal.length + 1
      },
      immediate: true
    },
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
