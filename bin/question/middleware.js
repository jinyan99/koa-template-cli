export default () => {
  return {
    type: "checkbox",
    message: "select middleware",
    name: "middleware",
    choices: [
      {
        name: "koa-router",
      },
      {
        name: "koa-static",
      },
      {
        name: "koa-views",
      },
      {
        name: "koa-body",
      },
    ],
  };
};
