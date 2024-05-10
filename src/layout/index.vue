<template>
	<div class="common-layout">
		<el-container class="container-box">
			<el-header>
				<Header></Header>
			</el-header>
			<el-container class="content-box">
				<el-aside width="200px">
					<el-menu :default-active="activeMenu" router class="el-menu-box">
						<template v-for="item in menuList" :key="item.path">
							<el-menu-item v-if="!item.children" :index="item.path">
								<span>{{ item.meta?.title }}</span>
							</el-menu-item>
							<el-sub-menu v-else :index="item.path">
								<template #title>
									<span>{{ item.meta?.title }}</span>
								</template>
								<el-menu-item
									v-for="subItem in item.children"
									:key="subItem.path"
									:index="subItem.path"
								>
									<span>{{ subItem.meta?.title }}</span>
								</el-menu-item>
							</el-sub-menu>
						</template>
						<!-- <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">{{
							item.meta.title
						}}</el-menu-item> -->

						<!-- <el-menu-item index="/"><i-ep-menu class="icon-align-text" />项目介绍</el-menu-item>
						<el-menu-item index="/user"><i-ep-user class="icon-align-text" />用户列表</el-menu-item>
						<el-menu-item index="/role"><i-ep-document class="icon-align-text" />角色列表</el-menu-item>
						<el-menu-item index="/auth"><i-ep-setting class="icon-align-text" />权限列表</el-menu-item> -->
					</el-menu>
				</el-aside>
				<el-main>
					<el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb-box">
						<el-breadcrumb-item v-for="item in settingStore.title" :key="item" :to="{ name: item }">{{
							item
						}}</el-breadcrumb-item>
					</el-breadcrumb>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import Header from './components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore } from '@/store/setting';
const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
// console.log(settingStore);
// console.log(router.options.routes[0].children);
// const menuList = router.getRoutes().filter((route) => {
// 	return route.meta.isShow;
// });
const menuList = router.options.routes[0].children?.filter((route) => {
	return route.meta!.isShow;
});
const activeMenu = ref('');
activeMenu.value = route.path;
watch(
	() => route.path,
	(newPath) => {
		activeMenu.value = newPath;
	}
);
</script>
<style lang="less" scoped>
.common-layout {
	height: 100vh;
	.container-box {
		height: 100%;
		.content-box {
			margin: 10px 0 0 10px;
			.el-menu-box {
				height: 100%;
			}
			.breadcrumb-box {
				margin-bottom: 25px;
			}
		}
	}
}
</style>
