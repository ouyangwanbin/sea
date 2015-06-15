if( !window.appUtils ){
    window.appUtils = {
        getTimeStamp : function(){
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+1 < 10? '0' + (now.getMonth()+1) : (now.getMonth()+1);
            var day = now.getDate() < 10? '0' + now.getDate() : now.getDate();
            var hours = now.getHours()< 10? '0' + now.getHours() : now.getHours();
            var minutes = now.getMinutes()< 10? '0' + now.getMinutes() : now.getMinutes();
            var seconds = now.getSeconds()< 10? '0' + now.getSeconds() : now.getSeconds();
            return year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+seconds;
        }
    }
}
