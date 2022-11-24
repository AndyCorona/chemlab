<template>
  <div class="reaction-data">
    <reaction-module-title placeholder="数据" name="data"></reaction-module-title>
    <div class="container">
      <div class="thead">
        <div class="wrapper" v-for="(item, index) in data.thead" :key="index">
          <div>
            {{ item }}
          </div>
        </div>
        <img>
      </div>
      <div class="tbody" v-for="(row, i) in data.tbody" :key="i">
        <div class="wrapper" v-for="(item, j) in row" :key="j">
          <div contenteditable="true">{{ item }}</div>
        </div>
        <img src="/imgs/左边栏/删除成员.svg">
      </div>
      <div class="NewRow" contenteditable="false">+</div>
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
  data() {
    return {
      data: {
        thead: ['仪器', '测试类型', '日期', '文件'],
        tbody: [['NMR', '谱图测试', '2022-12-12', 'lkz-Tl-S-1.zip']]
      }
    }
  }
}
</script>

<style lang="scss">
.reaction-data {
  .container {
    box-sizing: border-box;
    font-size: 16px;
    user-select: text;
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
        width: 200px;
        margin-right: 10px;
        border: 1px solid #FFFFFF;

        div {
          padding: 2px;
          width: 100%;
        }
      }

      img {
        cursor: pointer;
        width: 20px;
        height: 20px;
        opacity: 0;
      }
    }

    .tbody:hover {

      img {
        opacity: 100%;
      }
    }

    .thead {
      font-weight: bold;

      .wrapper {

        position: relative;

        &:hover img {
          transition: opacity 1s;
          opacity: 100%;
        }

        img {
          opacity: 0;
          width: 16px;
          height: 16px;
          position: absolute;
          top: 4px;
          right: 5px;
        }
      }
    }

    .NewRow {
      border-radius: 5px;
      border: 1px dashed #000000;
      height: 24px;
      line-height: 24px;
      width: 1180px;
      cursor: pointer;
      text-align: center;
    }
  }
}
</style>
