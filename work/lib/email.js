/**
 * Created by Administrator on 2016-05-31.
 */
var nodemailer = require('nodemailer');
//var credentials=require(credentials);
module.exports=function (credentials) {
    var mailTransport = nodemailer.createTransport({
        host: "smtp.blskye.com", // 主机
        // secure: false, //disable SSL
        secureConnection: false, // 使用 SSL
        port: 25, // SMTP 端口
        auth: {
            user: credentials.blskyemail.user,
            pass: credentials.blskyemail.password
        }
    });
    var from = '"WHT" <wht@blskye.com>';
    var errorRecipient = 'wht@blskye.com';
    return{
        send:function (to,subj,body) {
            mailTransport.sendMail({
                from:from,
                to:to,
                subject:subj,
                html:body,
                generateTextFromHtml:true
            },function (err) {
                if(err) console.error('Unable to send email: ' + err);
            });
        },
        emailError:function (message,filename,exception) {
            var body='<h1>Error</h1><p>Message:'+message+'</p>';
            if (exception)body+='<p>Exception:'+exception+'</p>';
            if (filename)body+='<p>Filename'+filename+'</p>';
            mailTransport.sendMail({
                from:from,
                to:errorRecipient,
                subject:'Error Message',
                html:body,
                generateTextFromHtml:true
            },function (err) {
                if (err)console.error('Unable to send email: ' + err);
            });
        }
    }

}
