<template>
  <div class="reaction-table" :style="`user-select:${userSelect}`"
    @mouseup="(this.mouseX = 0, this.firstDeltaMouseMove = false, this.contenteditable = true, this.userSelect = 'auto')"
    @mousemove="resize($event)">
    <reaction-module-title placeholder="表格" @input="gotTitle" :moduleOrder="moduleOrder" :dataOrder="dataOrder"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" :style="`width:${tWidth[index]}px`" v-for="(item, index) in thead " :key="index">
          <div class="data" :style="`width:${tWidth[index] - 20}px`" :contenteditable="contenteditable"
            @input="synThead($event, index)">
            {{ item }}
          </div>
          <img src="/imgs/用户主页/删除项目.svg" @click="deleteCol(index)" v-show="(this.thead.length > 1)">
          <div
            @mousedown="(this.userSelect = 'none', this.firstDeltaMouseMove = true, this.mouseX = $event.pageX, this.contenteditable = false, this.index = index)"
            @mousemove="resize($event)" class="slider" v-show="(index != thead.length - 1)"></div>
        </div>
        <img src="/imgs/用户主页/添加项目.svg" v-show="thead.length < 10" @click="addCol">
      </div>
      <div class="tbody" v-for="(row, i) in tbody" :key="i">
        <div class="wrapper" :style="`width:${tWidth[j]}px`" v-for="(item, j) in row" :key="j">
          <div :style="`width:${tWidth[j]}px`" contenteditable="true" @input="synTbody($event, i, j)">{{ item }}</div>
        </div>
        <img src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-show="(this.tbody.length < 500)">+</div>
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from '../basic/ReactionModuleTitle.vue'
export default {
  name: 'ReactionTable',
  components:
    { ReactionModuleTitle },
  props: {
    moduleOrder: Number,
    dataOrder: Number
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      title: '',
      thead: !this.$store.state.reactionInfo.data ? ['默认'] : this.$store.state.reactionInfo.data[this.dataOrder].content[1],
      tbody: !this.$store.state.reactionInfo.data ? [] : this.$store.state.reactionInfo.data[this.dataOrder].content.slice(2),
      tWidth: !this.$store.state.reactionInfo.data ? ['1120'] : this.$store.state.reactionInfo.data[this.dataOrder].content[0],
      col: null,
      row: null,
      mouseX: 0,
      lastMouseX: 0,
      firstDeltaMouseMove: false,
      contenteditable: true,
      index: null,
      userSelect: 'auto'
    }
  },
  methods: {
    gotTitle(value) {
      this.title = value
    },
    addCol() {
      this.thead.push(`列${this.col + 1}`)
      this.tbody.forEach(item => {
        item.push('')
      })
      // 添加列的宽度分配规则：分摊法。列的最大宽度为 1140 px，列的最小宽度为 114 px
      let newArr = []
      this.tWidth.forEach(item => {
        if (item <= 114) {
          // 已经是最小宽度则不再参与分配
          newArr.push(0)
        } else {
          // 否则按照当前的权重进行分配
          newArr.push(item / 1140)
        }
      })
      // 归一化处理，保证最后分配总和为 100%
      newArr = this.normalize(newArr)

      const retArr = []
      // 将所有列按照权重减去应该付出的宽度
      newArr.forEach((item, index) => {
        const oldVal = this.tWidth[index]
        retArr.push(oldVal - 114 * item)
      })
      retArr.push(114)
      this.tWidth = retArr
      this.col++
    },
    // 分摊法，将删除的宽度按照权重分摊到所有列上
    deleteCol(index) {
      this.col--
      this.thead.splice(index, 1)
      this.tbody.forEach(item => {
        item.splice(index, 1)
      })
      const deleteWidth = this.tWidth.splice(index, 1)
      let newArr = []
      this.tWidth.forEach(item => {
        if (item >= 1140) {
          // 已经是最大宽度则不再参与分配
          newArr.push(0)
        } else {
          // 否则按照当前的权重进行分配
          newArr.push(item / 1140)
        }
      })
      newArr = this.normalize(newArr)

      const retArr = []
      // 将所有列按照权重加上应该得到的宽度
      newArr.forEach((item, index) => {
        const oldVal = this.tWidth[index]
        retArr.push(oldVal + deleteWidth * item)
      })
      this.tWidth = retArr
    },
    // 最多添加到 500 行
    addRow() {
      this.row++
      const arr = []
      arr.push(`行${this.row}`)
      for (let i = 1; i < this.thead.length; i++) {
        arr.push('')
      }
      this.tbody.push(arr)
    },
    deleteRow(index) {
      this.tbody.splice(index, 1)
      this.row--
    },
    // 给表头双向绑定
    synThead(event, index) {
      this.thead[index] = event.target.innerHTML
    },
    // 给表体双向绑定
    synTbody(event, i, j) {
      this.tbody[i][j] = event.target.innerHTML
    },
    normalize(arr) {
      let sum = 0
      arr.forEach(item => {
        sum += item
      })
      if (sum === 1) {
        return arr
      }
      // 缩放系数，如果数组总和比 1 大则系数小于 1，如果数组总和比 1 小则系数大于 1
      const ratio = 1 / sum
      let withoutLastSum = 0
      for (let i = 0; i < arr.length - 1; i++) {
        const newVal = arr[i] * ratio
        arr[i] = newVal
        withoutLastSum += newVal
      }

      arr[arr.length - 1] = 1 - withoutLastSum
      return arr
    },
    resize(event) {
      if (this.mouseX === 0) {
        return
      }
      const modifier = 1
      // 第一次移动参考最原始的位置，后面的移动参考上一次移动的位置
      if (this.firstDeltaMouseMove) {
        this.lastMouseX = this.mouseX
      }
      const deltaX = event.pageX - this.lastMouseX
      // 如果左边列宽已经小于最小值或右边列宽已经大于最大值，禁止向左边调整
      if ((this.tWidth[this.index] <= 114 || this.tWidth[this.index + 1] >= 1140) && deltaX < 0) {
        return
      } else if ((this.tWidth[this.index] >= 1140 || this.tWidth[this.index + 1] <= 114) && deltaX > 0) {
        return
      }
      // 若果左边列宽已经超过最大值或者右边列宽已经小于最小值，禁止向右边调整
      this.tWidth[this.index] += deltaX * modifier
      this.tWidth[this.index + 1] -= deltaX * modifier
      this.lastMouseX = event.pageX
      this.firstDeltaMouseMove = false
    },
    // 当表格有内容时进行序列化
    serialize() {
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      } else {
        // 表头不为空
        for (let i = 0; i < this.thead.length; i++) {
          if (this.thead[i].trim() !== '') {
            isBlank = false
            break
          }
        }
        // 表体不为空
        if (isBlank) {
          for (let i = 0; i < this.tbody.length; i++) {
            for (let j = 0; j < this.tbody[i].length; j++) {
              if (this.tbody[i][j].trim() !== '') {
                isBlank = false
                break
              }
            }
          }
        }
      }
      // 如果是空白表格
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      const data = {
        type: 'table',
        title: this.title,
        content: [this.tWidth, this.thead]
      }
      this.tbody.forEach(item => {
        data.content.push(item)
      })
      this.$emit('success', data)
    }
  },
  computed: {
    readonlyThead() {
      return !this.$store.state.reactionInfo.data ? ['默认'] : this.$store.state.reactionInfo.data[this.dataOrder].content[1]
    },
    readonlyTbody() {
      if (!this.$store.state.reactionInfo.data) {
        return []
      } else {
        const retArr = []
        const arr = this.$store.state.reactionInfo.data[this.dataOrder].content
        const length = arr.length
        if (length > 2) {
          for (let i = 2; i < length; i++) {
            retArr.push(arr[i])
          }
        }
        return retArr
      }
    },
    readonlyTwidth() {
      return !this.$store.state.reactionInfo.data ? [1120] : this.$store.state.reactionInfo.data[this.dataOrder].content[0]
    }
  },
  watch: {
    readonlyThead(newVal) {
      this.thead = newVal
    },
    readonlyTbody(newVal) {
      this.tbody = newVal
    },
    readonlyTwidth(newVal) {
      this.tWidth = newVal
    },
    thead: {
      handler(newVal) {
        this.col = newVal.length
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
.reaction-table {
  .container {
    box-sizing: border-box;
    font-size: 16px;
    width: 1200px;
    border-radius: 5px;
    border: 1px solid #000000;
    padding: 10px;

    .thead,
    .tbody {
      text-align: left;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;

      .wrapper {
        display: flex;
        align-items: center;

        div {
          min-height: 30px;
          line-height: 30px;
          border: 1px solid #FFFFFF;
        }

        .slider:hover {
          opacity: 100%;
          border: 1px solid #FFFFFF;
        }

        .slider {
          height: 30px;
          line-height:30px;
          cursor: col-resize;
          width: 4px;
          opacity: 0;
          border: none;
        }

        .slider::before,
        .slider::after {
          content: '|';
        }
      }
    }

    .thead:hover,
    .tbody:hover {
      .wrapper {
        div {
          border: 1px solid #D7D7D7;
        }

        .slider {
          border: none;
        }
      }

      img {
        opacity: 100%;
      }
    }

    .thead {
      font-weight: bold;

      .wrapper {

        &:hover img {
          transition: opacity 1s;
          opacity: 100%;
        }

        img {
          opacity: 0;
          width: 16px;
          height: 16px;
        }
      }
    }

    .NewRow {
      box-sizing: border-box;
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
