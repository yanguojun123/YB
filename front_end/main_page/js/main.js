
//在这里实现登录注册功能
WIDTH = 0;
HEIGHT = 0;

posx = 0;
posy = 0;

    
/////////////////////////////////////////////////////

window.onload = function () {
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight;
  
    console.log("hhh")
    

    hhh();
    showLoginWindow();
}

function hhh() {
    //登录框样式
    var logWindowPos = $('#loginandreg_pos');
    posx = logWindowPos.offset().left;
    posy = logWindowPos.offset().top;
    var logWindow = $('#login_window');
    logWindow.css('left', posx - 150);
    logWindow.css('top', posy + 25);
    //注册框样式
    var registerWindow = $('#register_window');
    var regisWindowWidth = 500;
    var regisWindowHeight = 400;
    registerWindow.css('width', regisWindowWidth + 'px');
    registerWindow.css('height', regisWindowHeight + 'px');
    registerWindow.css('left', (WIDTH / 2 - regisWindowWidth / 2) + 'px');
    // registerWindow.css('top', (HEIGHT / 2 - regisWindowHeight / 2) + 'px');
    registerWindow.css('top', 150 + 'px');

    var grayBackground = $('#grayBackground');
    grayBackground.css('width', WIDTH);
    grayBackground.css('height', HEIGHT);
    grayBackground.css('background', 'black');
    grayBackground.css('opacity', '0.5');
    grayBackground.css('top', 0);
    grayBackground.css('left', 0);
}

//显示输入框
function showLoginWindow() {
    var logWindow = $('#login_window');
    var portrait = $('#portrait');
    portrait.click(function (e) {
        if (logWindow.css('display') == 'none')
            logWindow.css('display', "block");
        else
            logWindow.css('display', "none");
    });
}

//账号输入框
function inputInfo1(id) {
    var target = $('#' + id);
    target.css('onblur', function () {
        var value = target[0].value;
        if (value == '')
            target[0].value = 'account';
    });
}

//密码输入框
function inputInfo2(id) {
    var target = $('#' + id);
    target.css('onblur', function () {
        var value = target[0].value;
        if (value == '')
            target[0].value = 'password';
    });
}

//将账号密码发送到服务器进行验证并判断返回消息
//如果服务器判断成功则计入 session 否则刷新
function login() {
    var account = $('#logInput1')[0].value;
    var password = $('#logInput2')[0].value;  
//    var xmlhttp = getHTTPObject();
//    xmlhttp.open('POST', 'http://localhost/YiBa/Controller/user_controller.php', true);
//    xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
//    xmlhttp.send({"userId": account, "password": password, "purpose":0});
//    xmlhttp.onreadystatechange = function () {
//        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//            console.log("进来了吗");
//            //alert("收到");  
//            console.log(xmlhttp.responseText);
//        } else {
//            // console.log(xmlhttp.readyState + ":" + xmlhttp.status)
//        }
//    }
     $.ajax({
         type: "POST",
         url: "http://localhost/YiBa/Controller/user_controller.php",
         data: {"userId": account, "password": password, "purpose":0},
         dataType: "text",
         success: function(data)
         {   //返回值
             console.log("data",data)
              var obj = JSON.parse(data);
              var response = obj.status;
             //var response = data['status'];
             console.log("response",response);
             if(response == "1")
             {   //登录成功
                 alert("success")
                 console.log("success log in!!");
             }
             else
             {   //登录失败
                 alert("fail")
                 console.log("failed log in!!");
             }
         },
         error: function(jqXHR,textStatus,errorThrown)
         {
             console.log(jqXHR);
             console.log(textStatus);
             console.log(errorThrown)
         }
     })

    //登录成功返回 true
    var condition = true;
    if (condition) {
        // $.session.set(account, password);
        var input = getForm(account, password);

    } else {
        $.session.remove(account);
    }
}

//注册按钮点击函数
function registerBTN() {
    regisWindow = $('#register_window');
    if (regisWindow.css('display') == 'none') {
        $('#grayBackground').css('display', 'block');
        regisWindow.css('display', "block");
        $('#login_window').css('display', 'none');
    } else
        regisWindow.css('display', "none");
}

function register_cancel() {
    $('#register_window').css('display', 'none');
    $('#grayBackground').css('display', 'none');
}

function getForm(account, password) { //这里可以引入 md5 加密
    var tempInput = document.createElement('form');
    tempInput.type = 'hidden';
    tempInput.name = account;
    tempInput.value = password;
    return tempInput;
}

function getHTTPObject() {
    var xhr = false;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}