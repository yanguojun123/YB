//在这里实现登录注册功能

posx = 0;
posy = 0;

window.onload = function()
{
    hhh();
}

function hhh(){
    var logWindowPos = $('#loginandreg_pos');
    posx = logWindowPos.offset().left;
    posy = logWindowPos.offset().top;
    var logWindow = $('#login_window');
    logWindow.css('left',posx - 150);
    logWindow.css('top', posy + 25);
    logWindow.css('z-index',100);

    logWindow.click(function(e){
        if(!$(e.target).closest('#login_window').length){
            logWindow.css('display','none');
        }
    })
    // logWindowPos.bind('click',function(e){
    //     var e = e || window.event;
    //     var elem = e.target || e.srcElement;
    //     while(elem)
    //     {
    //         if(elem.id && elem.id == 'login_window')
    //             return;
    //         elem = elem.parentNode;
    //     }
    //     if(logWindow.css('display') == 'none')
    //         logWindow.css('display', "block");
    //     else
    //         logWindow.css('display', "none");
    // });
}

//账号输入框
function inputInfo1(id)
{
    var target= $('#'+id);
    target.css('onblur',function(){
        var value = target[0].value;
        if(value == '')
            target[0].value = 'account';
    });
}

//密码输入框
function inputInfo2(id)
{
    var target= $('#'+id);
    target.css('onblur',function(){
        var value = target[0].value;
        if(value == '')
            target[0].value = 'password';
    });
}

function login()
{   //获取内容
    var account = $('#logInput1')[0].value;
    var password = $('#logInput2')[0].value;
    console.log(account);
    console.log(password);
}

function register()
{

}