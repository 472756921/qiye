/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  newsschema=new mongoose.Schema({
    title:String,
    content:String,
    headimg: String,
    time:String,
    category:String,
});

mongoose.model('Ens',newsschema);
