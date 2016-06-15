/**
 * Created by Administrator on 2016-06-01.
 */
var express=require('express');
var mysql=require('mysql');

var index =require('./routes/index');
var app=express();
app.use('/',index);

app.listen(3000);