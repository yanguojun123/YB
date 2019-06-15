<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/19
 * Time: 14:12
 */

require "connect_to_mysql.php";
$uId=$_POST['userId'];
$lostPropertyId=$_POST['lostPropertyId'];
$sql="DELETE FROM lostproperty WHERE lostPropertyId=$lostPropertyId";
$result = $conn->query($sql);
echo($uId);
?>