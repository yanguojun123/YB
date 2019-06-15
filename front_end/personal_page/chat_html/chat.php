<!DOCTYPE html>
<html class="chathtml">
<!-- 
下载nodejs-websocket
https://github.com/sitegui/nodejs-websocket 
npm install nodejs-websocket
但是报错了，说是缺少package.json

所以：
1、npm init       创建package.json
2、sudo npm install nodejs-websocket   就可以了
3、创建一个wsServer.js   是服务器文件
4、服务器端的代码可以先看https://github.com/sitegui/nodejs-websocket
上面的使用方法。
5、启动服务、node wsServer.js
-->

<head>
    <meta charset="utf-8" />
    <title>Webscoket</title>
    <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
    <script src="jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<!-- echo 把接受到的数据返回过去 -->
<body class="chatbody" >
   
    <!-- 导航 -->
    <div class="navigation">
        <h1 id="title">聊天界面</h1>
        <a href="javascript:history.go(-1);" id="back">返回</a>
 <?php   
 
 include('./model/user.php');
   $users=new Users();
  $userId=explode("to=",$_SERVER['REQUEST_URI'])[1];
  $usernickname=$users->selnickName($userId);
  //$usernickname="sds";
 ?>   
<script type="text/javascript">//修改文章题目

   //var usernickname=window.location.href.split('to=')[1];
   var h1=document.getElementById('title');
   h1.innerHTML="<?php echo $usernickname;?>";
</script>


    </div>
    <!-- 会话列表 -->
    <div class="chatDiv">
        <div id="entername"></div>
        <ul id="chatlist">
        </ul>
    </div>
    <!-- 发送消息的输入框和按钮 -->
    <div class="sendMessage">
        <input id="sendText" type="text" />
        <button id="sendBtn">发送</button>
    </div>
    <script type="text/javascript">
    // 第一步   检测是否支持websocket  如果支持就创建websocket
    var websocket = null;
    var user = {};

    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://62.234.18.202:3000/");
        //websocket = new WebSocket("ws://localhost:3000/");
    } else {
        alert('当前浏览器不支持websocket')
    }

    // 创建节点
    function createChatNode(obj, ismine) {
        var $li = '';
        var $d='';
        $li = document.createElement('li');
        $d=document.createElement('div');
        //$d.className='reply';
        //$d.setAttribute("class","speech-bubble");
        if (ismine == true) {
            $li.setAttribute("class", "mine");
        } else {
            $li.setAttribute("class", "other");
        }
        var $dataspan = document.createElement('span');
        var $data = document.createTextNode(obj.data);
        $dataspan.appendChild($data);
        var $namespan = document.createElement('span');
        var $name = '';
        if (ismine == true) {
            //$name = document.createTextNode('我：');
            $d.className="speech-bubble-right";
        } else {
           // $name = document.createTextNode(obj.name + ':');
            $d.className="speech-bubble-left";
        }
       // $namespan.appendChild($name);
        
        $d.appendChild($namespan);
        $d.appendChild($dataspan);
        $li.appendChild($d);
        var $list = document.getElementById('chatlist');
        $list.appendChild($li);
    }

    // 接受到的信息的展示
    function showMessage(obj) {

        var div = document.getElementById('entername');

        // 如果接受到的消息中群聊的id不是空的，并且这个群聊和当前我所在的群是一致的，那么我们就是在一个群里
        if (obj.groupnumber != undefined && obj.groupnumber == user.group) {
             
            if (user.name == obj.name) {
                 // 这里说明是自己发的消息
                if (obj.data == undefined) {
                    return;
                }
               //createChatNode(obj, true);

            } else {
                 // 是好友发送的消息
                createChatNode(obj, false);
            }
        } else {

            // 如果不是群聊的是时候
            if (user.name == obj.name) {
                // 自己发送的消息
                if (obj.data == undefined) {
                    return;
                }
               // createChatNode(obj, true);

            } else {
                // 好有发送的消息，这里的判断是要判断要发送的是人是不是给我的
                if (obj.toname == user.name) {
                    createChatNode(obj, false);
                }
            }
        }
    }

    // 进入会话的人的信息

    // 连接成功建立的回调方法
    websocket.onopen = function(e) {
        // 建立连接后，要根据页面的url得知发起会话的人是想给谁发，或者在那个群里发
        var url = window.location.href;
        var splitobj = spliturl(url);

        user.name = splitobj.username;
        user.group = splitobj.groupnumber;

        if (user.group == undefined) {
            user.lineType = 1; //单聊
        } else {
            user.lineType = 0; //群聊
        }
        user.type = "enter";
        user.toname = splitobj.toname;
  
        websocket.send(JSON.stringify(user));
        // 这里是把发起会话的人的信息告诉服务器
        //显示历史消息
         show();
         init();//初始化键盘监听
        // 发送消息
        document.getElementById("sendBtn").onclick = function() {
            var txt = document.getElementById("sendText").value;
            document.getElementById('sendText').value = '';
            if (txt) {
                user.type = "message";
                user.data = txt;
                websocket.send(JSON.stringify(user));
                createChatNode(user,true);
                //alert('baocun');
                insert(txt,user.name,user.toname);
                
            }
        }
    }

    // 查分字符串
    function spliturl(url) {
        var obj = {};
        var array = url.split('name=');
        if (array[1].indexOf('&group=') > -1) {
            //如果包含group  说明是群聊
            var group = array[1].split('&group=');
            obj.groupnumber = group[1];
            obj.username = group[0];
        } else {
            if (array[1].indexOf('&to=') > -1) {
                var toArray = array[1].split('&to=');
                obj.username = toArray[0];
                obj.toname = toArray[1];//选择要单聊的目标
            } else {
                obj.username = array[1];
            }
        }

        return obj;

    }
    //window.setInterval(function(){
    //var ping = {"type":"ping"}; 
   // websocket.send(JSON.stringify(ping)); },5000);//自动连接避免断开
    //接收到消息的回调方法
    websocket.onmessage = function(e) {
        // if (e == '好友在忙碌') {
        //     console.log('e', e);
        //     websocket.close();
        //     return;
        // }
        var mes = JSON.parse(e.data);
        showMessage(mes);
        
    }

    //连接关闭的回调方法
    websocket.onclose = function() {
        console.log("websocket close");
    }


    //连接发生错误的回调方法
    websocket.onerror = function() {
        alert("Webscoket连接发生错误");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        websocket.close();
    }

    function insert(contents,users,toUsers)
{
	var time=new Date();
    var times=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
    //alert(times);
	$.ajax({ url: 'insert.php',
		type: 'post',
		data:{"content":contents,"time":times,"user":users,"toUser":toUsers}, 
		dataType:'text',
		success: function()
		{	
			///alert('保存成功');										  
					}});
}

  //显示历史信息
  function show(){
      
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		     xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
        xmlhttp.onreadystatechange=function ff()
         {
           if (xmlhttp.readyState==4 && xmlhttp.status==200)
           {
             var xmlDoc = xmlhttp.responseXML; 
             var number = xmlDoc.getElementsByTagName("number")[0].childNodes[0].nodeValue;
               var messageNumber=20;
               var startIndex=0;//消息的起始下标
               if(number>messageNumber)
                   startIndex=number-messageNumber;  
		     for (var i=startIndex;i<number;i++)
		        {   
		        	var temp=xmlDoc.getElementsByTagName("content")[i].childNodes[0].nodeValue;
                    var times=xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue;
                    var users=xmlDoc.getElementsByTagName("user")[i].childNodes[0].nodeValue;
                    var toUsers=xmlDoc.getElementsByTagName("touser")[i].childNodes[0].nodeValue;
                    var userTemp={};
                    userTemp.type="message";
                    userTemp.data=temp;
                    userTemp.name=users;
                    userTemp.toname=toUsers;
                    if(users==user.name)
                    {
                        createChatNode(userTemp,true);
                    }
                    else
                    {
                        createChatNode(userTemp,false);
                    }
			      
				    
                }
                
            }
         }
	xmlhttp.open("GET","selMessage.php?user="+user.name,true);
	xmlhttp.send();
}
function init(){
    //页面键盘点击时触发
    document.onkeydown=showKeyDown;
}

    function showKeyDown(evt){
        evt = (evt) ? evt : window.event ;

        if(evt.keyCode==13){
            var txt = document.getElementById("sendText").value;
            document.getElementById('sendText').value = '';
            if (txt) {
                user.type = "message";
                user.data = txt;
                websocket.send(JSON.stringify(user));
                createChatNode(user,true);
                //alert('baocun');
                insert(txt,user.name,user.toname);
        }
        
    }
}

    </script>
</body>

</html>