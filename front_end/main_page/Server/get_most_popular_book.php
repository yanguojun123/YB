<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/6/13
 * Time: 20:17
 */
require "ConnectMysql.php";

$sql = "select bookname from secondhandbook order by popularity desc limit 5";
$result = $connect->query($sql);

if ($result->num_rows > 0){
    $answer = array('state'=>true);
    while ($row = $result->fetch_assoc()){
        array_push($answer, $row);
    }
    $answer_json = json_encode($answer);
    echo ($answer_json);
}
else {
    $answer = array('state'=>false);
    $answer_json = json_encode($answer);
    echo ($answer_json);
}