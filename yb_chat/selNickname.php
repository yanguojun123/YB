<?php
 //一定要加，因为没加导致错误
header('Content-Type: text/xml');
header("Cache-Control: no-cache, must-revalidate");
$servername ="localhost";
$username = "root";
$password = "123456";
// 创建连接
$conn = mysqli_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$res=mysqli_select_db($conn,"test");
if ($res==0)
echo "选择数据库出错";

//$ttt='1';
$ttt="'".$_GET['userId']."'";
$tt="SELECT * FROM user WHERE userId=".$ttt;
$number=0;
//$sql = "SELECT content FROM blog where lookNum=43";
$result1=mysqli_query($conn,$tt);

if($result1==0)
 {
  printf("Error: %s\n", mysqli_error($conn));
  exit();
}
echo '<?xml version="1.0" encoding="ISO-8859-1"?><person>';
while($row=mysqli_fetch_array($result1))
{
    
    echo "<nickname>".$row['nickname']."</nickname>";
   // echo "<time>".$row['time']."</time>";
    //echo "<br>";
    $number++;
    //echo "<br>";
    //header("location:url地址");
}

echo '</person>';
  ?>