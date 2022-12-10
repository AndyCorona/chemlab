<template>
  <div class="reaction-table" :style="`user-select:${userSelect}`"
    @mouseup="(mouseX = 0, firstDeltaMouseMove = false, contenteditable = !isGroup, userSelect = 'auto')"
    @mouseleave="(this.$store.commit('saveDraggable', true), mouseX = 0, firstDeltaMouseMove = false)"
    @mousemove="resize($event, resizeIndex)">
    <reaction-module-title placeholder="表格" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" :style="`width:${tWidth[index]}px`" v-for="(item, index) in thead " :key="index"
          @mouseenter="this.$store.commit('saveDraggable', false)"
          @mouseleave="this.$store.commit('saveDraggable', true)">
          <div class="data" :style="`width:${tWidth[index] - (!isGroup ? 20 : 0)}px`"
            :contenteditable="contenteditable && !isGroup" @input="synThead($event, index)">
            {{ item }}
          </div>
          <img src="/imgs/用户主页/删除项目.svg" @click="deleteCol(index)" v-if="(thead.length > 1 && !isGroup)">
          <div
            @mousedown="(userSelect = 'none', firstDeltaMouseMove = true, mouseX = $event.pageX, resizeIndex = index, contenteditable = false, this.$store.commit('saveDraggable', false))"
            @mouseenter="resize($event, resizeIndex)" class="slider" v-if="(index != thead.length - 1 && !isGroup)">
          </div>
        </div>
        <img src="/imgs/用户主页/添加项目.svg" v-if="thead.length < 10 && !isGroup" @click="addCol">
      </div>
      <div class="tbody" v-for="(row, i) in tbody" :key="i">
        <div class="wrapper" :style="`width:${tWidth[j]}px`" v-for="(item, j) in row" :key="j"
          @mouseenter="this.$store.commit('saveDraggable', false)"
          @mouseleave="this.$store.commit('saveDraggable', true)">
          <div :style="`width:${tWidth[j]}px`" :contenteditable="!isGroup" @input="synTbody($event, i, j)">
            {{ item }}</div>
        </div>
        <img src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)" v-if="!isGroup">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-if="(tbody.length < 500 && !isGroup)"
        @mouseenter="this.$store.commit('saveDraggable', false)"
        @mouseleave="this.$store.commit('saveDraggable', true)">+</div>
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
    showBlock: Boolean
  },
  data() {
    return {
      mouseX: 0,
      lastMouseX: 0,
      firstDeltaMouseMove: false,
      contenteditable: true,
      resizeIndex: null,
      userSelect: 'auto'
    }
  },
  methods: {
    addCol() {
      this.thead.push(`列${this.thead.length + 1}`)
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
    },
    // 分摊法，将删除的宽度按照权重分摊到所有列上
    deleteCol(index) {
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
      const arr = []
      arr.push(`行${this.tbody.length + 1}`)
      for (let i = 1; i < this.thead.length; i++) {
        arr.push('')
      }
      this.tbody.push(arr)
    },
    deleteRow(index) {
      this.tbody.splice(index, 1)
    },
    // 给表头双向绑定
    synThead(event, index) {
      this.thead[index] = event.target.innerHTML.trim()
    },
    // 给表体双向绑定
    synTbody(event, i, j) {
      this.tbody[i][j] = event.target.innerHTML.trim()
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
    resize(event, index) {
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
      if ((this.tWidth[index] <= 114 || this.tWidth[index + 1] >= 1140) && deltaX < 0) {
        return
      } else if ((this.tWidth[index] >= 1140 || this.tWidth[index + 1] <= 114) && deltaX > 0) {
        return
      }
      // 若果左边列宽已经超过最大值或者右边列宽已经小于最小值，禁止向右边调整
      this.tWidth[index] += deltaX * modifier
      this.tWidth[index + 1] -= deltaX * modifier
      this.lastMouseX = event.pageX
      this.firstDeltaMouseMove = false
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
    thead: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? ['默认'] : this.$store.state.reactionInfo.data[this.moduleOrder].content[1]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [this.tWidth, newVal, this.tbody] })
      }
    },
    tbody: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? [] : this.$store.state.reactionInfo.data[this.moduleOrder].content[2]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [this.tWidth, this.thead, newVal] })
      }
    },
    tWidth: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? ['1120'] : this.$store.state.reactionInfo.data[this.moduleOrder].content[0]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [newVal, this.thead, this.tbody] })
      }
    },
    isGroup() {
      return this.$store.state.isGroup
    }
  }
}
</script>
<style lang="scss">
.reaction-table {
  cursor: grab;

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
        cursor: text;
        display: flex;
        align-items: center;
        border: 1px solid #FFFFFF;

        div {
          min-height: 30px;
          line-height: 30px;
        }

        .slider:hover {
          opacity: 100%;
          border: 1px solid #FFFFFF;
        }

        .slider {
          height: 30px;
          line-height: 30px;
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
        border: 1px solid #D7D7D7;

        .slider {
          border: none;
        }
      }

      img {
        cursor: pointer;
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
      cursor: pointer;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px dashed #000000;
      height: 30px;
      line-height: 28px;
      width: 1180px;
      text-align: center;
    }
  }
}
</style>
