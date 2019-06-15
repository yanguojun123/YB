<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/3/15
 * Time: 20:29
 */
global $conn;

// 数据库参数
$server_name = "localhost";
$user_name = "root";
$password = "123456";
$db_name = "yiba";

// 创建连接
$conn = new mysqli($server_name, $user_name, $password, $db_name);

// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}