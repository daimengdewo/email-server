const HomeService = require('../service/code')
module.exports = {
  getCode: async(ctx, next) => {
    let userMail = JSON.parse(JSON.stringify(ctx.query)).userMail

    let index = await HomeService.getCode(userMail)
    ctx.response.body = {code:200, data:index}
  },
  checkCode: async(ctx, next) => {
    let userMail = JSON.parse(JSON.stringify(ctx.query)).userMail
    let code = JSON.parse(JSON.stringify(ctx.query)).code

    let index = await HomeService.checkCode(userMail,code)
    ctx.response.body = {code:200, data:index}
  },
  register: async(ctx, next) => {
    let {
      userMail
    } = ctx.request.body
    let index = await HomeService.register(userMail)
    ctx.response.body = {code:200, data:index}
  }
}
