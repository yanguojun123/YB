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
$res=mysqli_select_db($conn,"yiba");
if ($res==0)
echo "选择数据库出错";

//$ttt='1';
$ttt="'".$_GET['userId']."'";
$tt="SELECT * FROM friendship inner join user on friendship.friendId=user.userId where friendship.userId=".$ttt;
$number=0;
//$sql = "SELECT content FROM blog where lookNum=43";
$result1=mysqli_query($conn,$tt);

if(!$result1)
 {
  printf("Error: %s\n", mysqli_error($conn));
  exit();
}
echo '<?xml version="1.0" encoding="ISO-8859-1"?><person>';
while($row=mysqli_fetch_array($result1))
{
    
    echo "<friendld>".$row['nickname']."</friendld>";
    echo "<fid>".$row['userId']."</fid>";
   // echo "<time>".$row['time']."</time>";
    //echo "<br>";
    $number++;
    //echo "<br>";
    //header("location:url地址");
}
echo "<number>".$number."</number>";
echo '</person>';
  ?>