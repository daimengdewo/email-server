const nodemailer = require('nodemailer')
const { callbackPromise } = require('nodemailer/lib/shared')
const db = require('../tool/db')

module.exports = {
  //新增用户
    register: async(userMail) => {
      const mail = await db.Uservalidation.create({ userEmail: userMail , validationID : 0})
      await mail.increment('validationID')
    },
    //发送验证码
    getCode: async(userMail) => {
      let newCode = createCode()
      let time = Math.floor(Date.now() / 1000)

      let smtp = nodemailer.createTransport({
        host : 'smtp.test01.com.cn',
        secure : true,
        tls: {
          rejectUnauthorized: false
        },
        auth : {
            user : 'test@test01.com.cn',
            pass : '12345678'
        }
      })

      let url = `http://localhost:3000/emailapi/checkCode?userMail=${userMail}&code=${newCode}`

      let config = {
        from : 'test@test01.com.cn',
        to : userMail,
        subject : '验证码',
        html : `<div style='width:600px;margin:30px auto'><h1 style='text-align:center'>欢迎注册</h1><p style='font-size:24px'>此次验证码如下:</p><strong style='font-size:20px;display:block;text-align:center;color:red'>${newCode}</strong><p>验证码十分钟内有效，请及时输入</p><i style='color:#00bfff'>此邮件为系统自动发送，请勿回复！若您没有进行过注册请忽略。</i><br /><br /><i style='color:#00bfff'>注册链接：${url}</i><p style='text-align:right'>--ZngJng</p></div>`
      }
      
      msg = smtp.sendMail(config,function(err,msg){
        if(err){
          console.log(err)
        }else{
          smtp.close()
          callbackPromise(msg)
        }
      })

      await db.Uservalidation.update({ 
        validCode: newCode, 
        expiredTime: time + 600,
        validUrl : url,
        validMode : 'Email',
        state: '发送成功'
      }, 
      {
        where: {
        userEmail: userMail
      }
      })

      return msg
    },
    //验证
    checkCode: async(userMail,code) => {
      let nowtime = Math.floor(Date.now() / 1000)
      const results = await db.Uservalidation.findAll({ 
        attributes: ['validCode', 'expiredTime']
      }, 
      {
        where: {
        userEmail: userMail
      }
      })
      result = results[0]['dataValues']
      let thiscode = result['validCode']
      let time = result['expiredTime']

      if(nowtime < parseInt(time)){
        if (code==thiscode){
            return('验证码正确')
        }else{
          return('验证码错误')
        }
      }else{
        return('验证码超时')
      }
    }
  }

  function createCode(){
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code
}