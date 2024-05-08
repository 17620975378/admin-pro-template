<template>
	<div class="common-layout">
		<el-container class="container-box">
			<el-header>
				<Header></Header>
			</el-header>
			<el-container class="content-box">
				<el-aside width="200px">
					<el-menu :default-active="activeMenu" router class="el-menu-box">
						<el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">{{
							item.meta.title
						}}</el-menu-item>
						<!-- <el-menu-item index="/"><i-ep-menu class="icon-align-text" />项目介绍</el-menu-item>
						<el-menu-item index="/user"><i-ep-user class="icon-align-text" />用户列表</el-menu-item>
						<el-menu-item index="/role"><i-ep-document class="icon-align-text" />角色列表</el-menu-item>
						<el-menu-item index="/auth"><i-ep-setting class="icon-align-text" />权限列表</el-menu-item> -->
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue';
import Header from './components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const menuList = router.getRoutes().filter((route) => {
	return route.meta.isShow;
});
const activeMenu = ref('');
activeMenu.value = route.path;
watch(
	() => route.path,
	(newPath, oldPath) => {
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
		}
	}
}
</style>
