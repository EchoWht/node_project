// /**
//  * Created by Administrator on 2016-05-31.
//  */
var mongoose = require('mongoose');
/*schema 架构*/
// var workSchema = mongoose.Schema({
//     username: String,
//     date: String,
//     description:String,
//     tag:[String]
// });
// /*模型的一些方法*/
// // workSchema.methods.getDisplayPrice = function(){
// //     return   (this.priceInCents / 100).toFixed(2);
// // };
// var Work = mongoose.model('Work', workSchema);
// module.exports = Work;



var Schema=mongoose.Schema;
var Works=new Schema({
    username: String,
    date: String,
    description:String,
    status:{type:Number,default:0},
    tag:[String]
});
module.exports = mongoose.model('Work',Works);