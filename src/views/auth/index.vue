<template>
	<div>
		<el-tree
			ref="treeRef"
			style="max-width: 600px"
			:data="roleAuthList"
			show-checkbox
			node-key="authId"
			:check-strictly="true"
			:default-checked-keys="checkedNode"
			:props="{ label: 'name', children: 'authList' }"
		/>
		<el-button type="primary" size="small" style="margin: 10px 0 0 20px" @click="onConfirmChangeAuth"
			>修改权限</el-button
		>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuthList } from '@/api/auth';
import { ElMessage } from 'element-plus';
const router = useRouter();
const route = useRoute();
const { query } = route;
// 权限列表接口
interface IAuth {
	name: string;
	authId: number;
	viewRole: string;
	authList?: IAuth[];
}
// 权限列表
let roleAuthList = ref<IAuth[]>([]);
// 权限树
const treeRef = ref<any>();
// 权限树选中
const checkedNode = ref<number[]>([]);
if (query.authList) {
	checkedNode.value = query.authList;
}
onMounted(() => {
	getAuthList().then((res) => {
		roleAuthList.value = res.data;
	});
});
const onConfirmChangeAuth = () => {
	const selectedTreeNode = treeRef.value.getCheckedNodes();
	console.log(selectedTreeNode);
	ElMessage({
		type: 'success',
		message: '修改权限成功'
	});
	router.push('/role');
};
</script>
<style lang="less" scoped></style>
