<?php
/**
 * Created by PhpStorm.
 * User: 34205
 * Date: 2019/3/20
 * Time: 9:50
 */
include('ConnectMysql.php');
mysqli_query($connect,'SET names UTF8');
$title=$_POST['biaoti'];
/*$userId=$_POST['userID'];*/
$userId='20190001';
$lostTimeStart=$_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
$lostRange= $_POST['s_province'].$_POST['s_city'];//.$_POST['s_country'];
$keyword=$_POST['biaoqian'];
$propertyDescribe=$_POST['miaoshu'];
$color=$_POST['color'];
$releaseTime=date('Y-m-d h:i:s', time());

if ($_FILES["image"]["error"] ==4) {
    $picture1=NULL;
}
else{
    $fp    = fopen($_FILES['image']['tmp_name'], 'rb');
    if (!$fp)  {showInfo('读取图片失败！');}
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
if($_POST['leibie']=="shiwu"){
    $count_result=mysqli_query($connect,"select lostItem from count");
    $count_row=mysqli_fetch_row($count_result);
    $count=$count_row[0]+1;
    $count_result=mysqli_query($connect,"update count set lostItem='$count'");

    $query="insert into lostproperty values('$count','$title', '$userId','$lostTimeStart','$lostRange',
    '$keyword','$releaseTime','$propertyDescribe','$picture1','$picture2','$picture3','$color')";
    $result=mysqli_query($connect,$query);
    header("Location:../ShiWuZhaoLing.html?lost_or_pick=lost");
}
if($_POST['leibie']=="zhaoling"){
    $count_result=mysqli_query($connect,"select pickItem from count");
    $count_row=mysqli_fetch_row($count_result);
    $count=$count_row[0]+1;
    $count_result=mysqli_query($connect,"update count set pickItem='$count'");

    $query="insert into pickedproperty values('$count','$title', '$userId','$lostTimeStart','$lostRange',
    '$keyword','$releaseTime','$propertyDescribe','$picture1','$picture2','$picture3','$color')";
    $result=mysqli_query($connect,$query);
    header("Location:../ShiWuZhaoLing.html?lost_or_pick=pick");
}
?>