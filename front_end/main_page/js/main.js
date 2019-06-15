
//在这里实现登录注册功能
WIDTH = 0;
HEIGHT = 0;

posx = 0;
posy = 0;

    
/////////////////////////////////////////////////////

window.onload = function () {
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight;
  
    console.log("main.js start...")

    hhh();
    showLoginWindow();
    let tuser=$.session.get('user');
    //let tuser=sessionStorage.getItem("user");//var book = JSON.parse(prebook);
    if(tuser==null){
      console.log("未登录")
    }
    else{
      tuser=JSON.parse(tuser);
      console.log("登录",tuser);
      $("#loginandreg_pos").text(tuser.nickname);
      //$.session.remove('user');
    }


  //sessionStorage.removeItem("user");
  
}
$("#loginandreg_pos").click(function(){
	$.session.remove("user");
	window.location.href="";
});
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
function testNum(str){
   var reg = new RegExp("^[^0-9]*$");//从头到尾都不是数字
    if(reg.test(str)){
     alert("没有数字!");
    }else{//有数字
        var reg = new RegExp("^[0-9]*$");//从头到尾都是数字
        if(reg.test(str)){                //从头到尾都是数字
            alert("全是数字");
        }else{                            //有数字但是不全是
            alert("有但是不全是数字");
        }
    };
};
//将账号密码发送到服务器进行验证并判断返回消息
//如果服务器判断成功则计入 session 否则刷新
function login() {
    var account = $('#logInput1')[0].value;
    var password = $('#logInput2')[0].value;  

    //testNum(account)
    var reg=new RegExp("^[0-9]+$")
    if(reg.test(account)){
     
    }
    else{
      alert("账户需全为数字")
    }
  //"http://localhost/YB/front_end/main_page/Server/Controller/user_controller.php",
     $.ajax({
         type: "POST",
         url: "Server/Controller/user_controller.php",
         data: {"userId": account, "password": password, "purpose":0},
         dataType: "text",
         success: function(data)
         {   //返回值
             console.log("data2",data)
              var obj = JSON.parse(data);
              var response = obj.status;
             //var response = data['status'];
             console.log("response",response);
             if(response == "1")
             {   //登录成功
                 alert("success")
                 console.log("success log in!!");
                 $("#loginandreg_pos").text(obj.nickname);
                 sessionStorage.setItem('user', data);


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
function register(){
  //alert(444)
  let name=$("#regisNickname").children().val();
  let email=$("#regisEmail").children().val();
  let passwd=$("#regisPasswd").children().val();
  let passwd2=$("#regisPasswdAgain").children().val();
  if(name==""||email==""||passwd==""||passwd2==""){
    alert("不完整的输入！");
    return;
  }
  else if(passwd!=passwd2){
    alert("两次密码不一致")
    $("#regisPasswd").children().val("");
    $("#regisPasswdAgain").children().val("");
    return;
  }
  else if(!veriEmail(email)){
    return;
  }
  
  $.ajax({
     type: "POST",
     url: "Server/Controller/user_controller.php",
     data: {"nickname": name,"email":email, "password": passwd, "purpose":1},
     dataType: "text",
     success: function(data)
     {
       //返回值
       console.log("data",data);
       var datas = JSON.parse(data);
       if(datas.status==1){
         alert("注册成功！注册id为"+datas.userId);
         $("#registerID").text(datas.userId);
       }
       else{
         alert("注册失败！");
       }
       

     },
     error: function(jqXHR,textStatus,errorThrown)
     {
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorThrown)
     }
 })
  
}
function register_cancel() {
    //alert(555)
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
function veriEmail(str){
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
  if(str === ""){ //输入不能为空
    //alert("输入不能为空!");
    return false;
  }else if(!reg.test(str)){ //正则验证不通过，格式不对
    alert("请输入正确格式的邮箱!");
    return false;
  }else{
    //alert("通过！");
    return true;
  }
}
function verifyEmail(t){
  let str=t.value; //要验证的对象

}
function verifyPasswd(t){
  let str=t.value;
}