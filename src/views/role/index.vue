<template>
	<div>
		<el-form class="form-box">
			<el-form-item>
				<el-button style="width: 60px" size="small" type="warning" @click="onAddRole">新增角色</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="roleList" style="width: 100%" border>
			<el-table-column label="角色编号" prop="roleId" width="180px"></el-table-column>
			<el-table-column label="角色名称" prop="roleName" width="180px"></el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button style="width: 60px" type="primary" size="small" @click="onChangeAuth(scope.row)"
						>修改权限</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getRoleList } from '@/api/role';
import { ElMessageBox, ElMessage } from 'element-plus';
// 角色接口
interface IRole {
	roleId: number;
	roleName: string;
}
// 角色列表
const roleList = ref<IRole[]>([]);
onMounted(() => {
	getRoleList().then((res) => {
		roleList.value = res.data;
	});
});
// 新增角色
const onAddRole = () => {
	ElMessageBox.prompt('请输入角色名称', '新增角色', {
		confirmButtonText: '确定',
		cancelButtonText: '取消'
	})
		.then(({ value }) => {
			roleList.value.push({
				roleId: roleList.value.length + 1,
				roleName: value
			});
			ElMessage({
				type: 'success',
				message: `${value}新增成功`
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: `取消新增`
			});
		});
};
// 修改权限
const onChangeAuth = (row) => {};
</script>
<style lang="less" scoped>
/deep/.form-box {
	width: 100%;
	.el-form-item__content {
		display: flex;
		justify-content: right;
	}
}
</style>
