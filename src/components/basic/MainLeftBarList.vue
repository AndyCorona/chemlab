<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup" v-for="(item, index) in GroupMemberList" :key="index">
      <div class="left-wrapper">
        <img :src="item.logo">
        <span>{{ item.name }}</span>
      </div>
      <div class="right-wrapper">
        <img src="/imgs/左边栏/组长.svg" v-show="item.isAdmin">
        <img src="/imgs/左边栏/成员.svg" v-show="!item.isAdmin">
        <!-- 群主不能删除自己 -->
        <img src="/imgs/左边栏/删除成员.svg" v-show="IsAdmin && (item.name !== this.$store.state.userInfo.username)">
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup && IsAdmin">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup && !IsAdmin">
      <div class="left-wrapper">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>退出课题组</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeftBarList',
  computed: {
    // 是否出现 "创建课题组" 和 "加入课题组"
    IsJoinGroup() {
      return !this.$store.state.userInfo.groupName
    },
    GroupMemberList() {
      return this.$store.state.userInfo.members
    },
    // 是否为群主
    IsAdmin() {
      return this.$store.state.userInfo.isAdmin
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
      cursor: pointer;
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
