<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  @import '@/styles/variables.scss';
  min-height: $mainH;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 16px;
}
</style>

