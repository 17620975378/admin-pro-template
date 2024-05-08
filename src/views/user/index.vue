<template>
	<div>
		<el-form inline :model="searchList" class="search-form">
			<el-form-item label="用户名称">
				<el-input
					v-model="searchList.nickName"
					placeholder="请输入用户名称"
					style="width: 180px"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="用户角色">
				<el-select v-model="searchList.role" style="width: 180px">
					<el-option :key="0" label="全部" :value="0" />
					<el-option
						v-for="item in roleWithAuthList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchUserInfo">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="userList" style="width: 100%" border class="content-table">
			<el-table-column label="编号" prop="id" width="100"></el-table-column>
			<el-table-column label="用户名称" prop="nickName" width="160"></el-table-column>
			<el-table-column label="用户角色" prop="role">
				<template #default="scope">
					<!-- 使用计算属性或方法来生成带有顿号的角色名称字符串 -->
					<!-- <span>{{ scope.row.role.map((item) => item.roleName).join('、') }}</span> -->
					<el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small">
						{{ item.roleName }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="160" align="center">
				<template #default="scope">
					<el-button type="primary" size="small" @click="onEditUserIsOpen(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="dialogVisible" class="edit-dialog" title="编辑用户信息">
			<el-form class="edit-dialog-form" :data="editUser">
				<el-form-item label="用户名称">
					<el-input
						v-model="editUser.nickName"
						placeholder="请输入用户名称"
						style="width: 180px"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="用户角色">
					<el-select v-model="editUser.role" style="width: 180px" multiple placeholder="请选择用户角色">
						<el-option
							v-for="item in roleWithAuthList"
							:key="item.roleId"
							:label="item.roleName"
							:value="item.roleId"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="onEditConfirm">确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
// 角色接口
interface IRole {
	roleId: number;
	roleName: string;
}
// 用户接口
interface IUser {
	id: number;
	nickName: string;
	role: IRole[];
}
// 用户列表请求返回数据接口
// interface responeseUserList<T = any> {
// 	code: number | string;
// 	message: string;
// 	data: T;
// }
// 编辑用户列表接口
interface IEditUser {
	id: number;
	nickName: string;
	role: number[];
}
// 查询条件接口
interface IQueryUser {
	nickName: string;
	role: number;
}
// 有权限的角色接口
interface IRoleWithAuth {
	roleId: number;
	roleName: string;
	authority: [];
}
// 角色列表
let roleWithAuthList = ref<IRoleWithAuth[]>([]);
let dialogVisible = ref(false);

// 用户列表
/*
注：此处可以用 ref 或者 reactive 定义响应式对象；
   如果用 ref，赋值的时候要使用 .value，否则无法触发响应式；
   如果用 reactive，赋值的时候需要一个个属性赋值，才可触发响应式；如果对象整体赋值，则无法响应式
*/
//使用 ref 定义引用数据类型
let userList = ref<IUser[]>([]);
//使用 reactive 定义对象
// let userList = reactive<responeseUserList>({
// 	code: 0,
// 	message: '',
// 	data: []
// });

// 所有用户列表
let allUserList = ref<IUser[]>([]);
// 编辑用户列表
let editUser = reactive<IEditUser>({
	id: 0,
	nickName: '',
	role: []
});
// 查询条件
let searchList = reactive<IQueryUser>({
	nickName: '',
	role: 0
});
// 初始化获取用户列表
onMounted(() => {
	fetchUserList();
	fetchRoleList();
});
// 获取用户列表
const fetchUserList = () => {
	getUserList().then((res) => {
		userList.value = res.data; //使用 ref 定义引用数据类型时，赋值方式
		// userList.data = res.data; // 使用reactive 定义对象时，赋值方式
		allUserList.value = res.data;
	});
};
// 获取角色列表
const fetchRoleList = () => {
	getRoleList().then((res) => {
		roleWithAuthList.value = res.data;
	});
};
// 查询用户信息
// 使用 reactive 定义用户列表变量时的写法
// const onSearchUserInfo = () => {
// 	let res: IUser[] = [];
// 	userList.data = allUserList.value;
// 	// console.log(userList);
// 	if (searchList.nickName || searchList.role) {
// 		if (searchList.nickName) {
// 			res = userList.data.filter((item) => {
// 				return item.nickName.indexOf(searchList.nickName) !== -1;
// 			});
// 		}
// 		if (searchList.role) {
// 			res = searchList.nickName ? res : userList.data;
// 			res = res.filter((item) => {
// 				return item.role.find((ele) => {
// 					return ele.role === searchList.role;
// 				});
// 			});
// 		}
// 	} else {
// 		res = userList.data;
// 	}
// 	userList.data = res;
// };
const onSearchUserInfo = () => {
	let res: IUser[] = [];
	userList.value = allUserList.value;
	// console.log(userList);
	if (searchList.nickName || searchList.role) {
		if (searchList.nickName) {
			res = userList.value.filter((item) => {
				return item.nickName.indexOf(searchList.nickName) !== -1;
			});
		}
		if (searchList.role) {
			res = searchList.nickName ? res : userList.value;
			res = res.filter((item) => {
				return item.role.find((ele) => {
					return ele.role === searchList.role;
				});
			});
		}
	} else {
		res = userList.value;
	}
	userList.value = res;
};
watch([() => searchList.nickName, () => searchList.role], () => {
	if (searchList.nickName === '' && searchList.role === 0) {
		fetchUserList();
	}
});
// 编辑用户信息
const onEditUserIsOpen = (row) => {
	dialogVisible.value = true;
	// editUser.nickName = row.nickName;
	// editUser.role = row.role.map((item) => {
	// 	return item.role;
	// });
	Object.assign(editUser, {
		...row,
		role: row.role.map((item) => {
			return item.role;
		})
	});
};
// 编辑用户信息确认
const onEditConfirm = () => {
	dialogVisible.value = false;
	/*
	为什么obj属性值变了，userList.value中的值也跟着变？
	因为直接赋值，复制的是该对象的引用，而不是对象本身，所以 obj 和 userList.value 指向同一个对象
	let a = {
            id: 1,
            name: 'a'
        }
        let b = a
        b.name = "b"
        console.log(a.name) // b
	*/
	let obj: IUser = userList.value.find((item) => {
		return item.id === editUser.id;
	});
	// 使用 Object.assign() 浅拷贝
	// let obj: IUser = Object.assign(
	// 	{},
	// 	userList.value.find((item) => {
	// 		return item.id === editUser.id;
	// 	})
	// );
	// let obj: IUser = userList.value.find((item) => item.id === editUser.id); //也可以这么写，省略大括号和return关键字
	obj.nickName = editUser.nickName;
	obj.role = [];
	// obj.role.length = 0; 使用浅拷贝可以这么写，以防止 obj.role = [] 会创建新数组，这个新数组与userList.value中找到的对象的role属性没有任何关系
	roleWithAuthList.value.forEach((item) => {
		if (
			editUser.role.find((ele) => {
				return ele === item.roleId;
			})
		) {
			obj.role.push({
				role: item.roleId,
				roleName: item.roleName
			});
		}
		// editUser.role.forEach((ele) => {
		// 	if (ele === item.roleId) {
		// 		obj.role.push({
		// 			roleId: item.roleId,
		// 			roleName: item.roleName
		// 		});
		// 	}
		// });
	});
};
</script>
<style lang="less" scoped></style>
