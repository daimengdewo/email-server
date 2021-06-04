const nodemailer = require('nodemailer')
const db = require('../tool/db')
const Config = require("./emailConfig");

module.exports = {
    //发送验证码
    getCode: async(userMail,uName,uPhone,vMode,vType) => {
      let newCode = createCode()
      let ndate = Math.floor(Date.now() / 1000) + 600

      let smtp = nodemailer.createTransport({
        host : Config.hostname,
        secure : true,
        tls: {
          rejectUnauthorized: false
        },
        auth : {
            user : Config.username,
            pass : Config.password
        }
      })
      //判断操作类型
      let vTypeStr = ''
      switch(vMode){
        case 1:
          switch(vType){
            case 0:
              vTypeStr = '测试'
              break
            case 1:
              vTypeStr = '注册'
              break
            case 2:
              vTypeStr = '登录'
              break
            case 3:
              vTypeStr = '找回密码'
              break
            }
          break
        case 2:
          return {ret:0,msg:'手机验证暂未上线'}
      }
      //创建参数
      let url = `http://localhost:3000/emailapi/checkCode?userMail=${userMail}&code=${newCode}`
      let mState = 0
      let config = {
        from : 'test@test01.com.cn',
        to : userMail,
        subject : '验证码',
        html : `<div style='width:600px;margin:30px auto'><h1 style='text-align:center'>${vTypeStr}</h1><p style='font-size:24px'>此次验证码如下:</p><strong style='font-size:20px;display:block;text-align:center;color:red'>${newCode}</strong><p>验证码十分钟内有效，请及时输入</p><i style='color:#00bfff'>此邮件为系统自动发送，请勿回复！若您没有进行过注册请忽略。</i><br /><br /><i style='color:#00bfff'>注册链接：${url}</i><p style='text-align:right'>--ZngJng</p></div>`
      }
      
//验证码smtp发送
      try{
          smtp.sendMail(config,function(err,msg){
            if(err){
              console.log(err)
            }else{
              smtp.close()
            }
          })
          mState = 1
        }catch(e){
          mState = 2
          return {ret:mState,errorMsg:e}
      }
    //数据库操作
      await db.Uservalidation.upsert({ 
        validationID : 0,
        userName: uName, 
        userEmail: userMail,
        mPhone : uPhone,
        validCode : newCode,
        validUrl: url,
        validMode: vMode,
        expiredTime: ndate,
        state: mState,
        validType: vType
      }, 
      {
        updateOnDuplicate:true
      })

      return {ret:mState}
    },
    //验证
    checkCode: async(userMail,code) => {
      let nowtime = Math.floor(Date.now() / 1000)
      //数据库操作
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
      //验证码判断
      if(nowtime < parseInt(time)){
        if (code==thiscode){
            return {ret:0}
        }else{
          return {ret:1,errorMsg:'验证码错误'}
        }
      }else{
        return {ret:2,errorMsg:'验证码超时'}
      }
    }
  }
//创建验证码
  function createCode(){
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code
}