export function createConfig(answer) {
  // 适配器
  const haveMiddleware = (name) => {
    return answer.middleware.indexOf(name) !== -1;
  };
  const inputConfig = {
    packageName: answer.packageName,
    port: answer.port,
    middleware: {
      static: haveMiddleware("koa-static"),
      views: haveMiddleware("koa-views"),
      router: haveMiddleware("koa-router"),
      body: haveMiddleware("koa-body"),
    },
  };

  return inputConfig;
}
