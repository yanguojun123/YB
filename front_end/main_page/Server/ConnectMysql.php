<?php
/**
 * Created by PhpStorm.
 * User: 34205
 * Date: 2019/3/13
 * Time: 0:23
 */
$hostname="localhost";
$name="root";
$password="123456";
$dbname="YiBa";
$connect=mysqli_connect($hostname,$name,$password,$dbname)
or die("数据库连接失败!");
echo "连接"
?>
