//在这里实现登录注册功能
WIDTH = 0;
HEIGHT = 0;

posx = 0;
posy = 0;
var total=20;//初始测试总页数
//从数据库异步获取最新热度的内容展示到右侧面板
function rightget(){
  $("#heat").empty();
  for(let i=0;i<10;i++){
    $("#heat").append("<li id='right"+i+"'><span><a>信</a></span></li>");
    $("#right"+i+"").xs999(Math.round(Math.random()*30));
    $("#right"+i+"").hover(function(){
      $(this).children().children().css({"font-size":"28px","color":"#2bae85","transition":"0.2s"});
    },function(){
      $(this).children().children().css({"font-size":"18px","color":"#ffffff"});
    });
  }

  
}	 
//从数据库异步获取最新热度的内容展示到右侧面板
function middleget(){

  $("#content").empty();
  $("#content").append(" <div class='subcontent'><div class='subcon_photo'><img  src='image/book_test/童年.png'><ul class='social'><li title='收藏'><a href='#' data-tip='Add to Cart'  onclick='addtocart(this)'><i class='fas fa-shopping-cart'></i></a></li><li><a href='#' data-tip='Wishlist'  onclick='purchase(this)'><i class='far fa-heart'></i></a></li><li><a href='#' data-tip='Quick View'  onclick='view(this)'><i class='fas fa-search'></i></a></li></ul></div><div title='童年' class='subcon_name'><a href='#'>童年</a></div><div title='高尔基' class='subcon_author'>高尔</div><div class='subcon_price'>￥20</div><div class='subcon_seller'><a href='#'>kaim</a></div></div>");
  
}


//收藏按钮点击事件函数
function addtocart(a){
  var p = a.parentNode.parentNode.parentNode.parentNode.children[1];
  var q = p.innerHTML;
  alert(p.title)
  alert(p.getAttribute("title"))
  
}
//购买按钮点击事件函数
function purchase(a){
  var p = a.parentNode.parentNode.parentNode.parentNode.children[1];
  var q = p.innerHTML;
  alert(p.title)
  //alert(p.getAttribute("title"))
}
//查看按钮点击事件函数
function view(a){
  var p = a.parentNode.parentNode.parentNode.parentNode.children[1];
  var q = p.innerHTML;
  alert(p.title)
  //alert(p.getAttribute("title"))
} 

//分页参数设置函数
 function setoptions(totalpages,currentpage,data){
      var options={
        bootstrapMajorVersion:3,
        currentPage: currentpage,
        totalPages: totalpages,
        numberOfPages: 5,
        shouldShowPage:function(type, page, current){
            switch (type) {
                case "first":
                    return true;
                case "prev":
                    return true;
                case "next":
                    return true;
                case "last":
                    return true;
                case "page":
                    return true;
            }
        },
        tooltipTitles: function(type, page, current) {//设置操作按钮的title属性。
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },
        itemTexts : function(type, page, current) {//控制每个操作按钮的显示文字。
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },
        onPageChanged: function (event, oldPage, newPage){
          alert(newPage)
          if(newPage==5){
            total=11;
            $('#example').bootstrapPaginator("setOptions",setoptions(11,newPage,""))
          }


          //middleget(newPage);

//              $.ajax({
//                url: '../../interface/xw_zxdt_list.php',
//                type: 'post',
//                data: {page: page},
//                dataType: 'json',
//                success: function (data) {
//                 //tplData(data);//处理成功返回的数据
//                  //传过来一页的数据，总页数
//                  //如果总页数不变则不调用setpages
//                  //否则调用setpages
//              }

        }
    };
    return options;
}
    
function setpage(){
    $("#example").bootstrapPaginator(setoptions(total,1,"")); 
    $("#pbutton").click(function(){
      let page=$("#pinput").val();
      let reg=/^[0-9]*$/;
      if(page){
        //如果获取到了非空
        if(reg.test(page)){
          if(page>total)
            alert("页数过大")
          else
            $('#example').bootstrapPaginator("show",page)// 调用show命令
        }
        else
          alert("输入不合法")
      }
      else
        alert("你没有输入")
      $("#pinput").val("");

    })
}
    
/////////////////////////////////////////////////////

window.onload = function () {
  
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight;
  
    rightget();
    middleget();
       
    setpage();




  

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
    registerWindow.css('width',regisWindowWidth + 'px');
    registerWindow.css('height',regisWindowHeight + 'px');
    registerWindow.css('left',(WIDTH/2 - regisWindowWidth/2) + 'px');
    registerWindow.css('top',(HEIGHT/2 - regisWindowHeight/2) + 'px');

    var grayBackground = $('#grayBackground');
    grayBackground.css('width',WIDTH);
    grayBackground.css('height',HEIGHT);
    grayBackground.css('background','black');
    grayBackground.css('opacity','0.5');
    grayBackground.css('top',0);
    grayBackground.css('left',0);
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
    //这里将账号密码发送到服务器

    // var xhr = new XMLHttpRequest;
    // xhr.open('post', 'C:/xampp/htdocs/get_secondhand_book_data.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send();
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
    //         //响应完成并且响应码为200或304
    //         JSON_data = JSON.parse(xhr.responseText);
    //         console.log(JSON_data);
    //         var length = getJsonlength(JSON_data);
    //         alert("出问题了")
    //         var father = document.getElementById('content');
    //         document.getElementById("content").innerHTML = "";

    //         for (var i = 0; i < items; i++) {
    //             var newdiv = document.createElement('div');
    //             newdiv.innerHTML = JSON_data[i].bookName;
    //             newdiv.className = 'message';
    //             father.appendChild(newdiv);
    //         }
    //         for (var i = 0; i < (length / items + 1); i++) {
    //             var newbutton = document.createElement('button');
    //             newbutton.className = "page_button";
    //             newbutton.innerHTML = "第" + (i + 1) + "页";
    //             newbutton.value = i;
    //             father.appendChild(newbutton);
    //         }
    //     }
    // };


    //登录成功返回 true
    // var condition = true;
    // if (condition) {
    //     $.session.set(account, password);
    //     var input = getForm(account, password);
    // } else {
    //     $.session.remove(account);
    // }
}

//注册按钮点击函数
function registerBTN() {
    regisWindow = $('#register_window');
    if (regisWindow.css('display') == 'none')
    {
        $('#grayBackground').css('display','block');
        regisWindow.css('display', "block");
        $('#login_window').css('display','none');
    }
    else
        regisWindow.css('display', "none");
}

function register_cancel()
{
    $('#register_window').css('display','none');
    $('#grayBackground').css('display','none');
}

function getForm(account, password) { //这里可以引入 md5 加密
    var tempInput = document.createElement('form');
    tempInput.type = 'hidden';
    tempInput.name = account;
    tempInput.value = password;
    return tempInput;
}