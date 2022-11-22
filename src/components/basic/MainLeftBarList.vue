<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="right-wrapper">
        <img src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup" v-for="(item, index) in GroupMemberList" :key="index">
      <div class="left-wrapper">
        <img :src="item.logo">
        <span>{{item.name}}</span>
      </div>
      <div class="right-wrapper">
        <img src="/imgs/左边栏/头像-1.svg">
        <img src="/imgs/左边栏/删除成员.svg">
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeftBarList',
  data () {
    return {
      // 是否出现 "创建课题组" 和 "加入课题组"
      IsJoinGroup: false,
      GroupMemberList: [
        { name: 'Ye', logo: '/imgs/左边栏/组长.svg', role: '0' },
        { name: '成员A', logo: '/imgs/左边栏/头像-1.svg', role: '1' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' },
        { name: '成员B', logo: '/imgs/左边栏/头像-2.svg', role: '2' }
      ]
    }
  }
}
</script>

<style lang="scss">
.main-left-bar-list {
  margin: 0 50px;

  .wrapper {
    margin-bottom: 13px;
    display: flex;
    align-items: center;

    &:hover .right-wrapper img {
      transition: opacity 1s;
      opacity: 100%;
    }

    .left-wrapper {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        font-size: 16px;
        margin: 0 10px;
        min-width: 130px;
      }

      img {
        width: 16px;
        height: 16px;
      }
    }

    .right-wrapper {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
        margin: 1px;
        opacity: 0;
        width: 16px;
        height: 16px;
      }
    }
  }

}
</style>
