<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/19
 * Time: 14:12
 */

require "connect_to_mysql.php";
$uId=$_POST['userId'];
$bookId=$_POST['bookId'];
$sql="DELETE FROM shoppingtrolley WHERE bookId=$bookId";
$result = $conn->query($sql);
echo($bookId);
?>