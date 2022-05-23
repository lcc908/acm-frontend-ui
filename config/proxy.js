export default {
  dev: {
    // localhost:8000/api/** -> http://10.122.67.151:8080/api/**
    '/api': {
      // 要代理的地址
      target: 'http://10.122.140.39:9001',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
