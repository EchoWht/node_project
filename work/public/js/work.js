/**
 * Created by Administrator on 2016-06-02.
 */


var host="http://"+window.location.host;
function workcomplete(id) {
    $.ajax({
        type:'post',
        url:host+"/work-complete",
        data:{
            id:id
        },
        dataType:'json',
        success:function(result){
            console.log(result);

            $('#tr'+id).addClass('is-completed').removeClass('is-current');
        }
    });
}
function workremove(id) {
    $.ajax({
        type:'post',
        url:host+"/work-remove",
        data:{
            id:id
        },
        dataType:'json',
        success:function(result){
            console.log(result);
            $('#tr'+id).remove();
        }
    });
}