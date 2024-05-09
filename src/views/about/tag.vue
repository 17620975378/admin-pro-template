<template>
	<div class="wrap-tag">
		<span v-bind="props" ref="tag" class="tag"></span>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
const props = defineProps({
	text: {
		type: String,
		default: null
	},
	theme: {
		type: String,
		default: null,
		required: false
	}
});
const tag = ref<HTMLElement>();
onMounted(() => {
	setText(), setTheme();
});
const setText = () => {
	tag.value!.innerText = props.text;
};
const setTheme = () => {
	tag.value!.style.background = props.theme;
};
</script>
<style lang="less" scoped>
.wrap-tag {
	margin: 10px;
}
.tag {
	background-color: antiquewhite;
	font-size: 14px;
	padding: 5px 10px;
	border-radius: 5px;
	color: #fff;
}
</style>
