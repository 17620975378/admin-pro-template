import { defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import externalGlobals from 'rollup-plugin-external-globals';
import { visualizer } from 'rollup-plugin-visualizer';
import type { UserConfig, ConfigEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ViteCompression from 'vite-plugin-compression';

// 不让这些库被打包进最终的代码中
const globals = externalGlobals({
	moment: 'moment',
	'video.js': 'videojs',
	jspdf: 'jspdf',
	xlsx: 'XLSX',
	echart: 'echart'
});

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	// 获取当前工作目录
	const root = process.cwd();
	// 获取环境变量
	const env = loadEnv(mode, root);
	return {
		// 项目根目录
		root,
		// 项目部署的基础路径
		base: '/',
		css: {
			preprocessorOptions: {
				less: {
					additionalData: `@import '@/styles/variable.less';`
				}
			}
		},
		publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
		assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
		plugins: [
			// 开启压缩,可选 gzip 或 brotliCompress(br) 压缩，ext后缀也要记得改
			ViteCompression({
				threshold: 1024 * 20, // 超过20kb才进行压缩
				ext: '.gz', // 压缩后缀
				algorithm: 'gzip' // 压缩算法，默认 gzip，可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
			}),
			// Vue模板文件编译插件
			vue(),
			// jsx文件编译插件
			vueJsx(),
			// 开启mock服务器
			viteMockServe({
				// 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
				mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
				// localEnabled: true, // 是否开启本地 mock 服务
				enable: true // 本地环境是否开启 mock 功能
			}),
			// 开启ElementPlus自动引入CSS
			ElementPlus({}),
			// 自动引入组件和icon
			AutoImport({
				resolvers: [IconsResolver(), ElementPlusResolver()],
				dts: fileURLToPath(new URL('./type/auto-imports.d.ts', import.meta.url))
			}),
			// 自动注册组件
			Components({
				resolvers: [IconsResolver(), ElementPlusResolver()],
				dts: fileURLToPath(new URL('./type/components.d.d.ts', import.meta.url))
			}),
			// 自动安装图标
			Icons({
				autoInstall: true
			})
		],
		// 运行后本地预览的服务器
		server: {
			// 是否开启https
			// https: false,
			// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
			host: true,
			// 开发环境预览服务器端口
			port: 9000,
			// 启动后是否自动打开浏览器
			open: false,
			// 是否开启CORS跨域
			cors: true,
			// 代理服务器
			// 帮助我们开发时解决跨域问题
			proxy: {
				// 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
				[env.VITE_APP_API_BASEURL]: {
					target: 'http://localhost:9000', // 实际后端地址，如果后端没有api，就可以使用rewrite重写
					// 改变 Host Header
					changeOrigin: true
					// 发起请求时将 '/api' 替换为 ''
					// rewrite: (path) => path.replace(/^\/api/, ""),
				},
				[env.VITE_APP_MOCK_BASEURL]: {
					target: 'http://localhost:9001',
					// 改变 Host Header
					changeOrigin: true
					// 发起请求时将 '/api' 替换为 ''
					// rewrite: (path) => path.replace(/^\/api/, ""),
				}
			}
		},
		// 打包配置
		build: {
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 400kb 提示警告
			chunkSizeWarningLimit: 400,
			rollupOptions: {
				// 打包入口文件 根目录下的 index.html
				// 也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(new URL('./index.html', import.meta.url))
				},
				experimentalLogSideEffects: true, // 打包时记录哪些模块会触发副作用
				external: ['moment', 'video.js', 'jspdf', 'xlsx', 'echart'], // 打包时排除的依赖
				plugins: [visualizer({ open: true }), globals],
				treeshake: {
					// 开启 tree-shaking
					preset: 'recommended' // 一般使用recommended
				},
				output: {
					experimentalMinChunkSize: 20 * 1024, // 单位是B，这里表示将小于20kb的文件合并到同一个chunk中
					// manualChunks：用于手动控制代码分割和打包方式的一个配置选项
					// 这种配置方式，可以极大的减少chunk数量，但同时会导致vendor文件过大，导致加载时间过长
					manualChunks: (id) => {
						// 当html-canvas只有极少数页面使用的时候，可以将第三方库分类打包，从而实现按需加载
						if (id.includes('html-canvas')) {
							return 'html-canvas';
						}
						if (id.includes('node_modules')) {
							return 'vendor';
						}
						// return 'index'; // 业务代码
					}
					// hash后面可以加 :数字，表示hash长度，[name] 可以改为文件名，比如chunk
					// chunkFileNames: 'static/js/chunk-[hash:6].js'
					// chunkFileNames: 'static/js/[name]-[hash].js', // 配置代码分割后文件名
					// entryFileNames: 'static/js/[name]-[hash].js', // 配置入口文件名，只有一个
					// assetFileNames: 'static/[ext]/[name]-[hash].[ext]' // 配置静态资源文件名
				}
			}
		},
		// 配置别名
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'#': fileURLToPath(new URL('./types', import.meta.url))
			}
		}
	};
});
