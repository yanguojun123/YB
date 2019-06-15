<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/19
 * Time: 14:12
 */

require "connect_to_mysql.php";
$uId=$_POST['userId'];
$pickedPropertyId=$_POST['pickedPropertyId'];
$sql="DELETE FROM pickedproperty WHERE pickedPropertyId=$pickedPropertyId";
$result = $conn->query($sql);
echo($uId);
?>