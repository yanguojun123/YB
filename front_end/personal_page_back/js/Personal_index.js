var obj=JSON.parse($.session.get("user"));
var userId=obj.userId;
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
       jsonLength++;
    }
    return jsonLength;
}
//编辑个人信息框
$("#Bianji").click(function(){
	$("#information").css("visibility","visible");
	var ele=document.getElementById("Bianji");
	var PAGE_CONTENT=document.getElementById("Form");
	PAGE_CONTENT.removeChild(ele);
	document.getElementById("nickname").value= obj.nickname;
	document.getElementById("sex").value= obj.sex;
	document.getElementById("age").value= obj.age;
	document.getElementById("phoneNumber").value= obj.phoneNumber;
	document.getElementById("QQ").value= obj.QQ;
	document.getElementById("WeChat").value= obj.WeChat;
	document.getElementById("address").value= obj.address;
});

//个人信息提交
$("#submit").click(function(){
	var nickname=document.getElementById("nickname").value;
	var sex=document.getElementById("sex").value;
	var age=document.getElementById("age").value;
	var phoneNumber=document.getElementById("phoneNumber").value;
	var QQ=document.getElementById("QQ").value;
	var WeChat=document.getElementById("WeChat").value;
	var address=document.getElementById("address").value;
	$.ajax({ url: 'control.php',
	    type: 'post',
	    data:obj, 
	    dataType:'json',
	    success: function(res)
	    {
	    	var bianji=document.createElement("p");
	    	bianji.id="Bianji";
	    	bianji.innerHTML="编辑信息";
	    	$("#information").css("visibility","hidden");
	    }
	});
});

$("#messageHistory").click(function(){
	var PAGE_BUTTON=document.getElementById('PAGE_BUTTON');
	PAGE_BUTTON.innerHTML="";
	$("#PAGE_CONTENT").load("../chat_html/login.html");
})
//购物车
$("#shoppingCar").click(function(){
	var items=8;
	var PAGE_CONTENT=document.getElementById("PAGE_CONTENT");
	var PAGE_BUTTON=document.getElementById('PAGE_BUTTON');
	PAGE_BUTTON.innerHTML="";
	//动态显示界面的函数
	var showPage=function(which,data,length){
		PAGE_CONTENT.innerHTML="";
		for(var i=which*items;i<length&&i<which*items+items;i++){
			var messageDiv=document.createElement("div");
			messageDiv.className="messageDiv";
			var message=document.createElement("tr");
			message.className="message";
			var td1=document.createElement("td");
			td1.className="td1";
			var td2=document.createElement("td");
			td2.className="td2";
			var td3=document.createElement("td");
			td3.className="td3";
			var td4=document.createElement("td");
			td4.className="td4";
			/**************td1*************/
			var img=document.createElement("img");
			img.src="../picture/jiepin.png";
			td1.appendChild(img);
			/**************td2**************/
			var bookname=document.createElement("p");
			bookname.innerHTML=data[i].bookName+"<br/>";
			bookname.style.fontSize="22px";
			bookname.style.fontWeight="800";
			var author=document.createElement("p");
			author.innerHTML="作者："+data[i].author+"<br/>"
			var publishingHouse=document.createElement("p");
			publishingHouse.innerHTML="出版社："+data[i].publishingHouse;
			td2.appendChild(bookname);
			td2.appendChild(author);
			td2.appendChild(publishingHouse);
			/**************td3*************/
			var price=document.createElement("p");
			price.innerHTML="<br/>￥ "+data[i].price;
			price.style.fontSize="20px";
			var button=document.createElement("button");
			button.className="buyButton";
			button.innerHTML="购买";
			button.value=data[i].bookId;
			button.onclick=function(){
				$.session.set("testKey",this.value);
				window.location.href="stuffmessage.html";
			};
			td3.appendChild(price);
			td3.appendChild(button);
			/*************td4***************/
			var deleteButton=document.createElement("button");
			deleteButton.className="deleteButton";
			deleteButton.value=data[i].bookId;
			deleteButton.innerHTML="删除";
			deleteButton.onclick=function(){
				$.ajax({ url: '../php/deleteShoppingCar.php',
					type: 'post',
					data:{"userId":userId,"bookId":this.value}, 
					dataType:'json',
					success: function(res){}
			    });
			};
			td4.appendChild(deleteButton);
			/************************/
			message.appendChild(td1);
			message.appendChild(td2);
			message.appendChild(td3);
			message.appendChild(td4);
			messageDiv.appendChild(message)
			PAGE_CONTENT.appendChild(messageDiv);
		}
	}

	$.ajax({ url: '../php/get_secondhand_book_data.php',
		type: 'post',
		data:{"userId":userId}, 
		dataType:'json',
		success: function(res)
		{	
			var length=getJsonLength(res);
			showPage(0,res,length);
			for(var i=0;i<parseInt((length-1)/items)+1;i++){
				var pageButton=document.createElement("button");
				pageButton.className="pageButton";
				pageButton.value=i;
				pageButton.innerHTML=i;
				pageButton.onclick=function(){
					showPage(this.value,res,length);
				}
				PAGE_BUTTON.appendChild(pageButton);
			}
		}
    });
});

$("#translateHistory").click(function(){
	var items=8;
	var PAGE_CONTENT=document.getElementById("PAGE_CONTENT");
	var PAGE_BUTTON=document.getElementById('PAGE_BUTTON');
	PAGE_BUTTON.innerHTML="";
	//动态显示界面的函数
	var showPage=function(which,data,length){
		PAGE_CONTENT.innerHTML="";
		for(var i=which*items;i<length&&i<which*items+items;i++){
			var messageDiv=document.createElement("div");
			messageDiv.className="transMessageDiv";
			var message=document.createElement("tr");
			message.className="transMessage";
			var td1=document.createElement("td");
			td1.className="td1";
			var td2=document.createElement("td");
			td2.className="td2";
			var td3=document.createElement("td");
			td3.className="td3";
			var td4=document.createElement("td");
			td4.className="td4";
			/**************td1*************/
			var img=document.createElement("img");
			img.src="../picture/jiepin.png";
			td1.appendChild(img);
			/**************td2**************/
			var bookname=document.createElement("p");
			bookname.innerHTML=data[i].bookName+"<br/>";
			bookname.style.fontSize="22px";
			bookname.style.fontWeight="800";
			var author=document.createElement("p");
			author.innerHTML="作者："+data[i].author+"<br/>"
			var publishingHouse=document.createElement("p");
			publishingHouse.innerHTML="出版社："+data[i].publishingHouse;
			td2.appendChild(bookname);
			td2.appendChild(author);
			td2.appendChild(publishingHouse);
			/**************td3*************/
			var price=document.createElement("p");
			price.innerHTML="订单金额：￥ "+data[i].price;
			var orderId=document.createElement("p");
			orderId.innerHTML="订单号：￥ "+data[i].transactedHistoryId;
			var transTime=document.createElement("p");
			transTime.innerHTML="交易时间："+data[i].time;
			td3.appendChild(price);
			td3.appendChild(orderId);
			td3.appendChild(transTime);
			/*************td4***************/
			var deleteButton=document.createElement("button");
			deleteButton.className="deleteButton";
			deleteButton.value=data[i].bookId;
			deleteButton.innerHTML="删除";
			deleteButton.onclick=function(){
				$.ajax({ url: '../php/delete_transHistory.php',
					type: 'post',
					data:{"userId":userId,"bookId":this.value}, 
					dataType:'json',
					success: function(resdata){}
			    });
			}
			td4.appendChild(deleteButton);
			/************************/
			message.appendChild(td1);
			message.appendChild(td2);
			message.appendChild(td3);
			message.appendChild(td4);
			messageDiv.appendChild(message)
			PAGE_CONTENT.appendChild(messageDiv);
		}
	}

	$.ajax({ url: '../php/get_transHistory.php',
		type: 'post',
		data:{"userId":userId}, 
		dataType:'json',
		success: function(resdata)
		{
			var length=getJsonLength(resdata);
			showPage(0,resdata,length);
			for(var i=0;i<parseInt((length-1)/items)+1;i++){
				var pageButton=document.createElement("button");
				pageButton.className="pageButton";
				pageButton.value=i;
				pageButton.innerHTML=i;
				pageButton.onclick=function(){
					showPage(this.value,resdata,length);
				}
				PAGE_BUTTON.appendChild(pageButton);
			}
		}
    });
});

$("#lostLog").click(function(){
	var items=8;
	var PAGE_CONTENT=document.getElementById("PAGE_CONTENT");
	var PAGE_BUTTON=document.getElementById('PAGE_BUTTON');
	PAGE_BUTTON.innerHTML="";
	//动态显示界面的函数
	var showPage=function(which,data,length){
		PAGE_CONTENT.innerHTML="";
		for(var i=which*items;i<length&&i<which*items+items;i++){
			var messageDiv=document.createElement("div");
			messageDiv.className="lostMessageDiv";
			var message=document.createElement("tr");
			message.className="lostMessage";
			var td1=document.createElement("td");
			td1.className="td1";
			var td2=document.createElement("td");
			td2.className="td2";
			var td3=document.createElement("td");
			td3.className="td3";
			var td4=document.createElement("td");
			td4.className="td4";
			/**************td1*************/
			var img=document.createElement("img");
			img.src="../picture/jiepin.png";
			td1.appendChild(img);
			/**************td2**************/
			var title=document.createElement("p");
			title.innerHTML=data[i].title+"<br/>";
			title.style.fontSize="22px";
			title.style.fontWeight="800";
			var lostTime=document.createElement("p");
			lostTime.innerHTML="丢失时间："+data[i].lostTimeStarted+"<br/>"
			var lostRange=document.createElement("p");
			lostRange.innerHTML="丢失范围："+data[i].lostRange;
			td2.appendChild(title);
			td2.appendChild(lostTime);
			td2.appendChild(lostRange);
			/*************td4***************/
			var deleteButton=document.createElement("button");
			deleteButton.className="deleteButton";
			deleteButton.value=data[i].lostPropertyId;
			deleteButton.innerHTML="删除";
			deleteButton.onclick=function(){
				$.ajax({ url: '../php/delete_lostLog.php',
					type: 'post',
					data:{"userId":userId,"lostPropertyId":this.value}, 
					dataType:'json',
					success: function(resdata){}
			    });
			}
			td4.appendChild(deleteButton);
			/************************/
			message.appendChild(td1);
			message.appendChild(td2);
			message.appendChild(td4);
			messageDiv.appendChild(message)
			PAGE_CONTENT.appendChild(messageDiv);
		}
	}

	$.ajax({ url: '../php/get_lostLog.php',
		type: 'post',
		data:{"userId":userId}, 
		dataType:'json',
		success: function(resdata)
		{
			var length=getJsonLength(resdata);
			showPage(0,resdata,length);
			for(var i=0;i<parseInt((length-1)/items)+1;i++){
				var pageButton=document.createElement("button");
				pageButton.className="pageButton";
				pageButton.value=i;
				pageButton.innerHTML=i;
				pageButton.onclick=function(){
					showPage(this.value,resdata,length);
				}
				PAGE_BUTTON.appendChild(pageButton);
			}
		}
    });
});

$("#pickedLog").click(function(){
	var items=8;
	var PAGE_CONTENT=document.getElementById("PAGE_CONTENT");
	var PAGE_BUTTON=document.getElementById('PAGE_BUTTON');
	PAGE_BUTTON.innerHTML="";
	//动态显示界面的函数
	var showPage=function(which,data,length){
		PAGE_CONTENT.innerHTML="";
		for(var i=which*items;i<length&&i<which*items+items;i++){
			var messageDiv=document.createElement("div");
			messageDiv.className="pickedMessageDiv";
			var message=document.createElement("tr");
			message.className="pickedMessage";
			var td1=document.createElement("td");
			td1.className="td1";
			var td2=document.createElement("td");
			td2.className="td2";
			var td3=document.createElement("td");
			td3.className="td3";
			var td4=document.createElement("td");
			td4.className="td4";
			/**************td1*************/
			var img=document.createElement("img");
			img.src="../picture/jiepin.png";
			td1.appendChild(img);
			/**************td2**************/
			var title=document.createElement("p");
			title.innerHTML=data[i].title+"<br/>";
			title.style.fontSize="22px";
			title.style.fontWeight="800";
			var pickedTime=document.createElement("p");
			pickedTime.innerHTML="拾到时间："+data[i].pickedTimeStarted+"<br/>";
			var release=document.createElement("p");
			release.innerHTML="归还时间："+data[i].releaseTime+"<br/>";
			var pickedRange=document.createElement("p");
			pickedRange.innerHTML="拾到地点："+data[i].pickedRange;
			td2.appendChild(title);
			td2.appendChild(pickedTime);
			td2.appendChild(release);
			td2.appendChild(pickedRange);
			/*************td4***************/
			var deleteButton=document.createElement("button");
			deleteButton.className="deleteButton";
			deleteButton.value=data[i].pickedPropertyId;
			deleteButton.innerHTML="删除";
			deleteButton.onclick=function(){
				$.ajax({ url: '../php/delete_pickedLog.php',
					type: 'post',
					data:{"userId":userId,"pickedPropertyId":this.value}, 
					dataType:'json',
					success: function(resdata){}
			    });
			}
			td4.appendChild(deleteButton);
			/************************/
			message.appendChild(td1);
			message.appendChild(td2);
			message.appendChild(td4);
			messageDiv.appendChild(message);
			PAGE_CONTENT.appendChild(messageDiv);
		}
	}

	$.ajax({ url: '../php/get_pickedLog.php',
		type: 'post',
		data:{"userId":userId}, 
		dataType:'json',
		success: function(resdata)
		{
			var length=getJsonLength(resdata);
			showPage(0,resdata,length);
			for(var i=0;i<parseInt((length-1)/items)+1;i++){
				var pageButton=document.createElement("button");
				pageButton.className="pageButton";
				pageButton.value=i;
				pageButton.innerHTML=i;
				pageButton.onclick=function(){
					showPage(this.value,resdata,length);
				}
				PAGE_BUTTON.appendChild(pageButton);
			}
		}
    });
});