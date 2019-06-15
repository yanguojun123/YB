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
  $res->number=ceil($result->num_rows/4);
  header('content-type:text/json');
  echo json_encode($res);
}
else if($code==2)
{
	$booktheme=$_POST['booktheme'];
	$bookname=$_POST['bookname'];
	$bookauthor=$_POST['bookauthor'];
	$bookpublishhouse=$_POST['bookpublishhouse'];
	$bookprice=$_POST['bookprice'];
  
  //echo "test";
  //echo $_POST['image'];
  //echo "test";
  
  if ($_FILES["image"]["error"]==4) {
    $picture1=NULL;
    
  }
  else{
      $fp    = fopen($_FILES['image']['tmp_name'], 'rb');
      if (!$fp)  {//showInfo('读取图片失败！');}
      }
      else       {$picture1 = addslashes(fread($fp, filesize($_FILES['image']['tmp_name'])));}
  }
  if ($_FILES["image1"]["error"] ==4) {
      $picture2=NULL;
  }
  else{
      $fp    = fopen($_FILES['image1']['tmp_name'], 'rb');
      if (!$fp)  {showInfo('读取图片失败！');}
      else       {$picture2 = addslashes(fread($fp, filesize($_FILES['image1']['tmp_name'])));}
  }
  if ($_FILES["image2"]["error"] ==4) {
      $picture3=NULL;
  }
  else{
      $fp    = fopen($_FILES['image2']['tmp_name'], 'rb');
      if (!$fp)  {showInfo('读取图片失败！');}
      else       {$picture3 = addslashes(fread($fp, filesize($_FILES['image2']['tmp_name'])));}
  }
//  if($_POST['leibie']=="shiwu"){
//      $count_result=mysqli_query($connect,"select lostItem from count");
//      $count_row=mysqli_fetch_row($count_result);
//      $count=$count_row[0]+1;
//      $count_result=mysqli_query($connect,"update count set lostItem='$count'");
//
//      $query="insert into lostproperty values('$count','$title', '$userId','$lostTimeStart','$lostRange',
//      '$keyword','$releaseTime','$propertyDescribe','$picture1','$picture2','$picture3','$color')";
//      $result=mysqli_query($connect,$query);
//      header("Location:../ShiWuZhaoLing.html?lost_or_pick=lost");
//  }
  
  

	//$booktheme=$_POST['booktheme'];
	$sql="select count(*) from secondhandbook";
	$result = $conn->query($sql);
	$number=$result->fetch_array()[0];
  //$sql = "insert into user (userId, password, nickname, mail) values ('$t', '$password', '$nickname', '$email')";
	$sql="insert into secondhandbook values($number+1,'$bookname','$bookauthor','$bookpublishhouse',null,24434,$bookprice,null,'$booktheme',null,null,null,null,null,'$picture1',null,null,0)";
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
else if($code==3)//搜索
{
  
    $attribute=$_POST['value'];
    $page=$_POST['page'];
    $sql="SELECT * from secondhandbook where author like '%$attribute%' or ISBN like '%$attribute%' or bookName like '%$attribute%'
          or publishingHouse like '%$attribute%'" ;
    $count1=0;
    $count2=0;
    $result=$conn->query($sql);
    $res='';
    $number=0;
    if($result!=null)
    {
      //$res->number=$result->$num_rows;
      $table=array();
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
      $res->number=ceil($result->num_rows/4);
      header('content-type:text/json');
      echo json_encode($res);
    } 


  
}

?>