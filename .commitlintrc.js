module.exports = {
	ignores: [(commit) => commit.includes('init')],
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 信息以空格开头,描述前面要加空格
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [2, 'always'],
		// 信息最大长度
		'header-max-length': [2, 'always', 108],
		// 信息不能未空
		'subject-empty': [2, 'never'],
		// 信息类型不能未空
		'type-empty': [2, 'never'],
		// 提交信息的类型 下文有介绍
		'type-enum': [
			2,
			'always',
			[
				'feat', // 增加一个新特性或新功能
				'fix', // 修复一个bug
				'perf', // 优化相关，比如提升性能、体验
				'style', // 格式相关，比如缩进、逗号、引号、空格等格式修正
				'docs', // 仅仅修改文档说明
				'test', // 增加新的测试功能或更改原有的测试模块
				'refactor', // 代码重构，既不是新增功能，也不是修复bug
				'build', // 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）
				'ci', // 对 CI 配置文件和脚本的更改
				'chore', // 构建过程或辅助工具的变动
				'revert', // 回滚到上一个版本
				'wip', // 开发中
				'workflow', // 工作流改进
				'types', // 类型定义文件更改
				'release', // 发布新版本
				'temp' // 临时提交
			]
		]
	}
};
