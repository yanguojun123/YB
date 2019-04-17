
<html>
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


这里使用的是nodejs_websocket. 这个可以通过socket.io 进行改造的。

-->


<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webscoket</title>
    <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
    <script src="jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<!-- echo 把接受到的数据返回过去 -->
<!-- 这里是小明的聊天列表 
   定义了他进入的是聊天室，还是单聊。
   告诉了服务器，我是要进入那个聊天室。
   或者是我要和谁聊天。
-->

<body>
    <div class="navigation"><h1>小明好友列表</h1></div>
    <ul class="fridenslist" id='u'>
    </ul>
<script type="text/javascript">
window.onload=function(){
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
              //这里把返回的数据以XML的格式存到变量中。
             //还有一种返回式以字符串的形式返回，responseText，这个可以用下标法逐个输出，但是注意，逐个输出的是字符，
             //也就是说，你想要的一个字符串会被拆成几份
              
             //这里的 getElementsByTagName("time")[0].childNodes[0].nodeValue; 是采用遍历数的方法逐个输出数据
               //getElementsByTagName 是通有的（"  "）这里写的是你链接的文件里面的标签名，等下介绍再详说，[0]也是要写的
             //.childNodes[0].nodeValue;  这块也是通有的，意思是获取值
            
             //var number1 = xmlDoc.getElementsByTagName("number1")[0].childNodes[0].nodeValue;
            //进行插入
             var uu=document.getElementById("u");
		    // var time=new Date();
		    // alert(order1);
		        //var times=order[number]['time'];
               var number = xmlDoc.getElementsByTagName("number")[0].childNodes[0].nodeValue;
		     for (var i=0;i<4;i++)
		        {   
		        	var temp=xmlDoc.getElementsByTagName("friendld")[i].childNodes[0].nodeValue;
		        	//var times=xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue;
			        //var times=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
				    var li=document.createElement("li");
				    li.innerHTML='<a href="chat.html?name=1&to='+temp+'">'+temp+'</a>';
				    uu.append(li); 
			    }
            }
         }
	xmlhttp.open("GET","selFriend.php?userId=1",true);
	xmlhttp.send();
}
</script>
</body>
</html>