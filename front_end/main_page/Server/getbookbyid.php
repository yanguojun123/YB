<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/19
 * Time: 14:12
 */

require "ConnectMysql.php";

$bookId=$_POST['bookId'];
$sql = "select *  from secondhandbook where bookId=$bookId";
$result = $connect->query($sql);

if ($result->num_rows > 0){
    $answer = array();
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