
    function removeChilds(id){

        var childs = document.getElementById(id).childNodes;//这一行代码和紧跟的下面的for循环用于清除原来日的下拉列表的select中的对节点

        for(var i=childs.length-1;i>=0;i--) {

            document.getElementById(id).removeChild(childs[i]);

        }

    }

function setDay(){

    var yearToDate=document.getElementById("year").value;

    var monthToDate=document.getElementById("month").value;

    //alert(yearToDate+":"+monthToDate);

    var days=new Array(28,29,30,31);

    var nowDate=new Date();

    if(monthToDate==1||monthToDate==3||monthToDate==5||monthToDate==7||monthToDate==8||monthToDate==10||monthToDate==12){

        removeChilds("day");

        for( i=1; i<=days[3]; i++ ){

            if(yearToDate==nowDate.getFullYear()&&monthToDate==(nowDate.getMonth()+1)&&i==nowDate.getDate()){//如果是当前系统时间则设置默认的日

                var newOption = document.createElement("option");newOption.setAttribute("value",i);newOption.setAttribute("selected","selected");

                var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                document.getElementById("day").appendChild(newOption);

            }else{

                var newOption = document.createElement("option");newOption.setAttribute("value",i);

                var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                document.getElementById("day").appendChild(newOption);

            }

        }

    }

    if(monthToDate==4||monthToDate==6||monthToDate==9||monthToDate==11){

        removeChilds("day");

        for( i=1; i<=days[2]; i++ ){

            if(yearToDate==nowDate.getFullYear()&&monthToDate==(nowDate.getMonth()+1)&&i==nowDate.getDate()){//如果是当前系统时间则设置默认的日

                var newOption = document.createElement("option");newOption.setAttribute("value",i);newOption.setAttribute("selected","selected");

                var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                document.getElementById("day").appendChild(newOption);

            }else{

                var newOption = document.createElement("option");newOption.setAttribute("value",i);

                var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                document.getElementById("day").appendChild(newOption);

            }

        }

    }

    if(monthToDate==2){

        removeChilds("day");

        if(yearToDate%400==0||yearToDate%100!=0&&yearToDate%4==0){//闰年

            for( i=1; i<=days[1]; i++ ){

                if(yearToDate==nowDate.getFullYear()&&monthToDate==(nowDate.getMonth()+1)&&i==nowDate.getDate()){//如果是当前系统时间则设置默认的日

                    var newOption = document.createElement("option");newOption.setAttribute("value",i);newOption.setAttribute("selected","selected");

                    var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                    document.getElementById("day").appendChild(newOption);

                }else{

                    var newOption = document.createElement("option");newOption.setAttribute("value",i);

                    var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                    document.getElementById("day").appendChild(newOption);

                }

            }

        }

        else{

            for( i=1; i<=days[0]; i++ ){

                if(yearToDate==nowDate.getFullYear()&&monthToDate==(nowDate.getMonth()+1)&&i==nowDate.getDate()){//如果是当前系统时间则设置默认的日

                    var newOption = document.createElement("option");newOption.setAttribute("value",i);newOption.setAttribute("selected","selected");

                    var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                    document.getElementById("day").appendChild(newOption);

                }else{

                    var newOption = document.createElement("option");newOption.setAttribute("value",i);

                    var textToNewOption=document.createTextNode(i);newOption.appendChild(textToNewOption);

                    document.getElementById("day").appendChild(newOption);

                }

            }

        }

    }

}

function getMonth(){

    var m;

    for(m=1;m<=12;m++) {

        if((new Date().getMonth()+1)==m){

            document.write("<option value="+m+" selected=\"selected\">"+m+"</option>");

        }else{

            document.write("<option value="+m+">"+m+"</option>");

        }

    }

}

function getYear(){

    var y;

    var date=new Date();

    var fullYear=date.getFullYear();

    for(y=fullYear-60;y<=fullYear;y++){

        if(y==fullYear){

            document.write("<option value="+y+" selected=\"selected\">"+y+"</option>");

        }else{

            document.write("<option value="+y+" >"+y+"</option>");

        }

    }

}
