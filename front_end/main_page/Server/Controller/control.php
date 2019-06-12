<?php 
include('../Model/secondhandbook.php');
$sec=new Users();
$code=$_POST['code'];
$conn = new mysqli("localhost", "root", "123456", "yiba");
	if ($conn->connect_error) {
		die("连接失败: " . $conn->connect_error);
	} 
if($code==1)
{
	$page=$_POST['page'];
    //$res=$sec->showSecondHandBook();
	
	 
	$sql = "SELECT * from secondhandbook";
	$result = $conn->query($sql);
	$count1=0;
	$count2=0;
	$res='';
	
    $table=array();
	$number=0;
    //$res->number=$result->$num_rows;
    while($row=$result->fetch_array())
     {
       if($count2>=($page-1)*4)
       {
         $res->table[$count1]=$row;
         $count1++;
       } 
       $count2++;
       if($count1==4)
        break;
     }
	 //$res->table[$count1]=
	 $res->number=ceil($result->num_rows/4);
     //echo $res;
     header('content-type:text/json');
     echo json_encode($res);
}
if($code==2)
{
	$booktheme=$_POST['booktheme'];
	$bookname=$_POST['bookname'];
	$bookauthor=$_POST['bookauthor'];
	$bookpublishhouse=$_POST['bookpublishhouse'];
	$bookprice=$_POST['bookprice'];
	//$booktheme=$_POST['booktheme'];
	$sql="select count(*) from secondhandbook";
	$result = $conn->query($sql);
	$number=$result->fetch_array()[0];
	//echo $bookauthor,$bookname,$bookprice,$bookpublishhouse,$booktheme;
	//$sql="insert into secondhandbook values('".($number+1)."','".$bookname."',"."'$bookauthor','$bookpublishhouse',null,3456789,'$bookprice',null,'$booktheme',null,null,null,null,null)";
	$sql="insert into secondhandbook values($number+1,'$bookname','$bookauthor','$bookpublishhouse',null,24434,$bookprice,null,'$booktheme',null,null,null,null,null)";
	$result = $conn->query($sql);
	if($result)
	{
		echo "1";
		header("Location:../../mainadd.html");
	}
  else
  {
    echo "0";
  }
		
}

?>