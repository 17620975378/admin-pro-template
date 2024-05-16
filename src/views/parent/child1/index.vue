<template>
	<div class="wrap-content">
		<el-container>
			<el-header>
				<el-tabs v-model="activeName" class="demo-tabs" style="width: 100%" @tab-click="handleClick">
					<el-tab-pane
						v-for="item in menuList"
						:key="item.path"
						:label="item.meta?.title"
						:name="item.path"
					></el-tab-pane> </el-tabs
			></el-header>
			<el-main><router-view></router-view></el-main>
		</el-container>
		<!-- <h1>child1</h1> -->
	</div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const routeObj = router.options.routes[0].children?.find((routeObj) => {
	return routeObj.path === '/child1';
});
// console.log(routeObj, 'routeObj');
const menuList = routeObj!.children[0].children?.filter((item) => {
	return item.meta?.isShow;
});
const activeName = ref('');
activeName.value = route.path;
watch(
	() => route.path,
	(newPath) => {
		activeName.value = newPath;
		// console.log(newPath, 'route.path');
	}
);

const handleClick = (tab) => {
	router.push(tab.props.name);
	// console.log(tab.props.name, 'tab.props.name');
};
</script>
<style lang="less" scoped>
// .wrap-content {
// 	display: flex;
// 	justify-content: center;
// 	font-size: 30px;
// 	font-weight: 700;
// 	h1 {
// 		margin-top: 20px;
// 	}
// }
</style>
