const router = require('koa-router')()
const HomeController = require('./controller/email')
module.exports = (app) => {
  router.get( '/emailapi/getCode', HomeController.getCode )
  router.get('/emailapi/checkCode', HomeController.checkCode)
  router.post('/emailapi/register', HomeController.register)
  app.use(router.routes())
     .use(router.allowedMethods())
}
