const HomeService = require('../service/home')
module.exports = {
  index: async(ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  },
  home: async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },
  register: async(ctx, next) => {
    let {
      str1,
      str2
    } = ctx.request.body
    let data = await HomeService.register(str1, str2)
    ctx.response.body = data
  }
}
