<template>
  <div class="reaction-reference">
    <reaction-module-title placeholder="引用" :moduleOrder="moduleOrder" :showBlock="showBlock"
      :showTitle="showTitle"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" :style="`width:${tWidth[index]}px`" v-for="(item, index) in thead " :key="index">
          <div :style="`width:${tWidth[index]}px`">
            {{ item }}
          </div>
        </div>
        <img draggable="false" src="/imgs/用户主页/添加项目.svg" @click.prevent="" v-if="!isGroup">
      </div>
      <div class="tbody" v-for="(row, i) in tbody" :key="i">
        <div class="wrapper" :style="`width:${tWidth[j]}px`" v-for="(item, j) in row" :key="j">
          <div :style="`width:${tWidth[j]}px`" :contenteditable="!isGroup" @input="synTbody($event, i, j)">
            {{ item
            }}</div>
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-input" v-if="!referencePath[i]">
          <label :for="`img${randomNum * (i + 1)}`" draggable="false" :style="`border:${!isGroup ? '' : 'none'}`">{{
              !isGroup ? '解析文件' : '无链接'
          }}</label>
          <input v-if="!isGroup" :id="`img${randomNum * (i + 1)}`" type="file" @change="resolveFile($event, i)">
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-reference" v-if="referencePath[i]">
          <a class="word-wrap" target="_blank" :href="referencePath[i]" draggable="false">{{ referencePath[i] }}</a>
        </div>
        <img draggable="false" src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)" v-if="!isGroup">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-if="(tbody.length < 10) && !isGroup">+</div>
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
    showBlock: Boolean,
    showTitle: Boolean
  },
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
      for (let i = 1; i < this.thead.length; i++) {
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
    }
  },
  computed: {
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
    },
    isGroup() {
      return this.$store.state.isGroup
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

    .tbody {
      .wrapper {
        div {
          cursor: text;
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
