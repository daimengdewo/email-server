const router = require('koa-router')()
const HomeController = require('./controller/email')
module.exports = (app) => {
  router.post( '/emailapi/getCode', HomeController.getCode )
  router.post('/emailapi/checkCode', HomeController.checkCode)
  app.use(router.routes())
     .use(router.allowedMethods())
}
