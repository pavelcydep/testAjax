
 
 search__button.onclick = function () {
    this.btnClick = (this.btnClick || 0) + 1;
    if (this.btnClick > 3) {
        this.disabled = true;
        setTimeout(function(){
            search__button.disabled = false;
            search__button.btnClick = 0;
        }, 10000); 
    }
};
$(function() {
   
$("body").delegate("#search__button",'click',function(){
    
    $.ajax({
        url: '../../../../src/pages/main/bitcoin/bitcoin.php',         
        method: 'get',            
        dataType: 'json', 
        cache: false,      
        data: {text: 'ok'}, 
        beforeSend: function() {
            $('#keys').append('<div id="lo" class="preloader__search"><div class="preloader__circle"></div>Идет поиск биткоинов...</div>');
            $('.search').hide();
            $('.bike').show();
        },
        complete: function(data) {
            $('.bike').hide();
            $('.search').show();  
            
          
        },
       
        success: function(data){  
         if(!data)
            {
                $('#keys').append('<li class="keys__item">Что-то пошло не так!</li>');
            }else{
                $('.preloader__search').remove();
                $('#keys').append('<li class="keys__item">Адрес:'+ data.addr +'<br/>Ключ:'+data.pkey+'</li>');
            }
            
        }
    })
})
})


