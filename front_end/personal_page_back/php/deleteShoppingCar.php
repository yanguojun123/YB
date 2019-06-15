<?php
 //一定要加，因为没加导致错误

require "connect_to_mysql.php";
// 创建连接
$conn = mysqli_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$res=mysqli_select_db($conn,"test");
if ($res==0)
echo "选择数据库出错";
$uId=$_POST['userId'];
$bookId=$_POST['bookId'];
  $sql="DELETE FROM shoppingtrolley WHERE userId=$uId and bookId=$bookId";
  $result=$this->conn->query($sql);
    if(!$result)
    {
          echo ("错误描述："+mysqli_error($conn));
    }
    mysqli_close($con);
  ?>