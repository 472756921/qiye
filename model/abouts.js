/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  newsschema=new mongoose.Schema({
    content:String,
});

mongoose.model('ABU',newsschema);
