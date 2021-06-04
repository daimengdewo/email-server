const HomeService = require('../service/code')
module.exports = {
  getCode: async(ctx, next) => {
    let {
      userMail,uName,uPhone,vMode,vType
    } = ctx.request.body
    
    try{
      let index = await HomeService.getCode(userMail,uName,uPhone,vMode,vType)
      ctx.response.body = index
    }catch(e){
      ctx.response.body = {errorMsg:e}
    }
  },
  checkCode: async(ctx, next) => {
    let {
      userMail,
      userCode
    } = ctx.request.body

    try{
      let index = await HomeService.checkCode(userMail,userCode)
      ctx.response.body = index
    }catch(e){
      ctx.response.body = {errorMsg:e}
    }
  }
}
