/**
 * Created by Administrator on 2016-06-01.
 */
var express=require('express');
var router=express.Router();

router.get(
    '/',function (req,res) {
        res.send('Hi i am Router');
    }
);
router.get(
    '/hello',function (req,res) {
        res.send('Hi i am TEST');
        console.log('test');
    }
);
router.get('/ce*',function (req,res) {
    res.send('ce后面输什么都是这一页');
});

module.exports=router;