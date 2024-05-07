<template>
	<div class="header-box">
		<div class="logo-box">logo区域</div>
		<div class="flex-grow"></div>
		<div class="user-box"><i-ep-user style="vertical-align: middle" /> {{ userName }}</div>
		<div class="setting-box setting" @click="handleDrawer">
			<i-ep-setting style="vertical-align: middle"></i-ep-setting>
		</div>
	</div>
	<el-drawer v-model="isDrawer" class="elDrawer-box" :show-close="false" :with-header="false">
		<div class="text-config">
			<h2>项目配置</h2>
			<i-ep-close class="close-button" @click="closeDrawer"></i-ep-close>
		</div>
		<div class="logout-button">
			<el-button type="primary" @click="logout">退出登录</el-button>
		</div>
	</el-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import router from '@/router';
const userStore = useUserStore();
const userName = userStore.username;
const isDrawer = ref(false);
const handleDrawer = () => {
	isDrawer.value = true;
};
const closeDrawer = () => {
	isDrawer.value = false;
};
/**
 * 登出函数
 * 跳转到登录页面
 * 清空 sessionStorage 中的 userInfo
 */
const logout = () => {
	sessionStorage.removeItem('userInfo');
	router.push('/login');
};
</script>
<style lang="less" scoped>
.header-box {
	display: flex;
	align-items: center;
	box-shadow: 0 0 20px rgb(195 223 252 / 40%);
	padding: 0 10px;
	height: 60px;
	.setting-box {
		margin-left: 10px;
	}
	.setting {
		cursor: pointer;
	}
}
.elDrawer-box {
	.text-config {
		display: flex;
		justify-content: space-between;
		padding: 8px 0 40px 0;
		.close-button {
			cursor: pointer;
		}
	}
	.logout-button {
		display: flex;
		justify-content: center;
	}
}
</style>
