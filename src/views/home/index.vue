<template>
	<div class="wrap-content">
		<el-form inline :model="projectData" class="search-form">
			<el-form-item label="项目名称">
				<el-input v-model="projectData.title" placeholder="请输入项目名称"></el-input>
			</el-form-item>
			<el-form-item label="项目详情">
				<el-input v-model="projectData.introduce" placeholder="请输入项目详情"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchGoods()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" style="width: 100%">
			<el-table-column prop="id" label="编号" width="180"></el-table-column>
			<el-table-column prop="title" label="名称" width="180"></el-table-column>
			<el-table-column prop="introduce" label="项目详情"></el-table-column>
		</el-table>
		<el-pagination
			layout="prev, pager, next, sizes"
			:total="projectData.dataCount"
			:page-size="projectData.pageSize"
			:page-sizes="[5, 10, 20]"
			@size-change="onSizeChange"
			@current-change="onCurrentChange"
		></el-pagination>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { getProjectList } from '@/api/project';
// 项目接口
interface IProject {
	userId: number;
	id: number;
	title: string;
	introduce: string;
}
let projectList = ref<IProject[]>([]);
// 获取项目介绍列表数据
const fetchData = () => {
	getProjectList().then((res) => {
		projectList.value = res.data;
		projectData.dataCount = res.data.length;
	});
};
// 初始化调用项目介绍接口
onMounted(() => {
	fetchData();
});
let projectData = reactive({
	title: '',
	introduce: '',
	currentPage: 1,
	pageSize: 5,
	dataCount: 0
});
// 查询项目列表
const onSearchGoods = () => {
	console.log(projectList.value);
	let res: IProject[] = [];
	if (projectData.title || projectData.introduce) {
		if (projectData.title) {
			res = projectList.value.filter((value) => {
				return value.title.indexOf(projectData.title) !== -1;
			});
		}
		if (projectData.introduce) {
			res = projectList.value.filter((value) => {
				return value.introduce.indexOf(projectData.introduce) !== -1;
			});
		}
	} else {
		res = projectList.value;
	}
	projectList.value = res;
	projectData.dataCount = res.length;
	projectData.currentPage = 1;
};
// 获取当前页数据
let dataList = computed(() => {
	return projectList.value.slice(
		(projectData.currentPage - 1) * projectData.pageSize,
		projectData.currentPage * projectData.pageSize
	);
});
// 改变每页条数
const onSizeChange = (pageSize: number) => {
	projectData.pageSize = pageSize;
};
// 改变当前页
const onCurrentChange = (page: number) => {
	projectData.currentPage = page;
};
watch([() => projectData.title, () => projectData.introduce], () => {
	if (!projectData.title && !projectData.introduce) {
		fetchData();
	}
});
</script>
<style lang="less" scoped></style>
