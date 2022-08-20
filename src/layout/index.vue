<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></Sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <Navbar></Navbar>
      </div>
      <!-- 内容区 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
import variables from '@/styles/variables.module.scss'
</script>
./components/AppMain/index.vue
<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
@import '~@/styles/mixin.scss';
@import '~@/styles/sidebar.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hiedsideBarWidth});
}
</style>
