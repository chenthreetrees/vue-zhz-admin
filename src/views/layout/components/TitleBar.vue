<template>
  <div class="titlebar">
    <div class="logo center-row">
      <svg-icon icon-class="logo" class-name="logo-svg" />
      <div class="center-column" style="margin-left:12px;">
        <span style="color:#fff;font-size:20px;line-height:20px;font-style:bold;letter-spacing:4px">设备数据管理平台</span>
        <span style="color:#fff;font-size:12px;line-height:20px;">Equipment Data Management Platform</span>
      </div>
    </div>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <span style="color:#4e7afb;">{{ unit }}</span> -->
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <svg-icon icon-class="user" style="margin-left:6px;" />
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <!-- <el-dropdown-item divided>
              <router-link to="/profile/password">
                密码修改
              </router-link>
            </el-dropdown-item> -->
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TitleBar',
  computed: {
    ...mapGetters([
      'name',
      'device',
      'roles'
    ])
  },
  methods: {

    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.titlebar {
  @import '@/styles/variables.scss';
  height: $titleBarH;
  line-height: $titleBarH;
  width: 100%;
  background: $menuBg;
  position: fixed;
  .logo{
    float: left;
    height: 100%;
    margin-left: 48px;
    color: #fff;
    .logo-svg {
      width: 3em;
      height: 3em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: $titleBarH;
      margin-right: $titleBarH;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        color:#fff;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -15px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
