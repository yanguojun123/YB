<?php
$servername ="localhost";
$username = "root";
$password = "wyc19980221";
// 创建连接
$conn = mysqli_connect($servername, $username, $password);
// 检测连接
if (!$conn) 
{
    die("Connection failed: " . mysqli_connect_error());
}
$res=mysqli_select_db($conn,"test");
if ($res==0)
echo "选择数据库出错";
$temp=$_POST['content'];
$time=$_POST['time'];
$toUser=$_POST['toUser'];
$User=$_POST['user'];
$tt="INSERT INTO message (content,time,user,toUser) VALUES ('".$temp."','".$time."','".$User."','".$toUser."')";
//$sql = "SELECT content FROM blog where lookNum=43";
if ($conn->query($tt) === TRUE) { 
    echo "New record created successfully"; 
} 
else { 
     echo "Error: " . $conn . "<br>" . $conn->error; 
}
//header("心情随笔.php");
$conn->close($conn);		
?>