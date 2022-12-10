<template>
  <div class="reaction-data">
    <reaction-module-title placeholder="数据" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
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
          <div :style="`width:${tWidth[j]}px`" :contenteditable="!isGroup" @input="synTbody($event, i, j)"
            @mouseenter="this.$store.commit('saveDraggable', false)"
            @mouseleave="this.$store.commit('saveDraggable', true)">
            {{ item
            }}</div>
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-input" v-if="(!dataFileAndUrl[i][0] && !dataFileAndUrl[i][1])"
          @mouseenter="this.$store.commit('saveDraggable', false)"
          @mouseleave="this.$store.commit('saveDraggable', true)">
          <label :for="`img${randomNum * (i + 1)}`" draggable="false" :style="`border:${!isGroup ? '' : 'none'}`">{{
              !isGroup
                ? '上传文件' : '无文件'
          }}</label>
          <input :id="`img${randomNum * (i + 1)}`" type="file" @change="uploadFile($event, i)" v-if="!isGroup">
        </div>
        <div :style="`width:${tWidth[3]}px`" class="show-file-name"
          v-if="(dataFileAndUrl[i][0] || dataFileAndUrl[i][1])" @mouseenter="this.$store.commit('saveDraggable', false)"
          @mouseleave="this.$store.commit('saveDraggable', true)">
          <div @click="downloadFile(dataFileAndUrl[i][1])" draggable="false">{{ !dataFileAndUrl[i][0] ? '找不到文件名' :
              dataFileAndUrl[i][0]
          }}
          </div>
        </div>
        <img src="/imgs/左边栏/删除成员.svg" @click="deleteRow(i)" v-if="!isGroup">
      </div>
      <div class="NewRow" contenteditable="false" @click="addRow" v-if="(tbody.length < 10 && !isGroup)"
        @mouseenter="this.$store.commit('saveDraggable', false)"
        @mouseleave="this.$store.commit('saveDraggable', true)">+</div>
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from '../basic/ReactionModuleTitle.vue'
export default {
  name: 'ReactionData',
  components: {
    ReactionModuleTitle
  },
  props: {
    moduleOrder: Number,
    showBlock: Boolean
  },
  data() {
    return {
      thead: ['仪器', '测试类型', '日期', '文件'],
      tWidth: [200, 200, 200, 510],
      randomNum: Math.random()
    }
  },
  methods: {
    // 给表体双向绑定
    synTbody(event, i, j) {
      this.tbody[i][j] = event.target.innerHTML.trim()
    },
    // 最多添加 10 行
    addRow() {
      const arr = []
      arr.push(`行${this.tbody.length + 1}`)
      for (let i = 2; i < this.thead.length; i++) {
        arr.push('')
      }
      this.tbody.push(arr)
      this.dataFileAndUrl.push(['', '', ''])
    },
    deleteRow(index) {
      this.tbody.splice(index, 1)
      this.dataFileAndUrl.splice(index, 1)
    },
    downloadFile(url) {
      if (url === '') {
        alert('找不到可以下载的文件')
      }
      // 使用 item 提供的 utl 进行下载
      alert('下载成功')
    },
    uploadFile(event, row) {
      if (this.isGroup) {
        return
      }
      const file = event.target.files[0]
      if (!file) {
        return
      }
      if (file.size >= 1024 * 5 * 1024) {
        this.$store.commit('toast', { text: '上传文件大小不超过 5 M', state: 2 })
        return
      }
      // 改变文件之后，将文件暂时存放在 dataFileAndUrl 第三项中，将文件名存放在第一项中
      this.dataFileAndUrl.splice(row, 0, [file.name, '', file])
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
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [this.dataFileAndUrl, newVal] })
      }
    },
    dataFileAndUrl: {
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
.reaction-data {
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

      .show-file-name {
        text-decoration: underline;
        color: #638271;
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
