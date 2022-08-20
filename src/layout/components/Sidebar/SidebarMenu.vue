<template>
  <el-menu
    :collapse="!store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.menuActiveText"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
// import { Location, List } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import store from '@/store'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
// console.log(store.getters.cssVar)
// console.log(JSON.stringify(routes.value))
// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
