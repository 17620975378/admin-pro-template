<template>
	<div class="wrap-about">
		<!-- Hello about -->
		<tag :text="text" :theme="theme"></tag>
		<tag :text="text1" :theme="theme1"></tag>
		<tag :text="text2" :theme="theme2"></tag>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import tag from './tag.vue';
const text = ref('lim');
const text1 = ref('管理员');
const text2 = ref('用户');
const theme = ref('blue');
const theme1 = ref('red');
const theme2 = ref('');
</script>
<style lang="less" scoped>
.wrap-about {
	display: flex;
	// background-color: @bg;
	color: var(--dawei-bg);
}
</style>
