<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/6/13
 * Time: 19:38
 */
require "connect_to_mysql.php";

$bookId = $_POST['bookId'];
$sql = "update secondhandbook set popularity = popularity + 1 where bookId = $bookId";

if ($result = $conn->query($sql)){
    echo (true);
}
else {
    echo (false);
}
