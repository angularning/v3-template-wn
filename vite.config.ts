import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
//@ts-ignore
import path from "path";
//@ts-ignore
import { createVitePlugins } from "./build/index";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const plugins = createVitePlugins(env);
  return {
    base: "/", //打包路径
    plugins,
    // 配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/assets/style/theme.scss" as *;
              `,
          charset: false,
        },
      },
      postcss: {
        plugins: [
          // 移除打包element时的@charset警告
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    //启动服务配置
    server: {
      host: "0.0.0.0",
      port: 3001,
      open: false,
      cors: true,
      proxy: {
        "/wisdom-community-admin": {
          target: "http://admin-community-api.bjzelr.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wisdom-community-admin/, ""),
        },
      },
    },

    // 生产环境打包配置
    //去除 console debugger
    build: {
      sourcemap: mode !== "production",
      // minify: 'esbuild', // 启用这个下面的才会生效，打包速度会慢很多
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
};
