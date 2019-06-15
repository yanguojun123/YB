<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/19
 * Time: 14:12
 */

require "connect_to_mysql.php";

$sql = "select *  from lostproperty";
$result = $conn->query($sql);

if ($result->num_rows > 0){
    $answer = array();
    while ($row = $result->fetch_assoc()){
        unset($row['Picture1']);
        unset($row['Picture2']);
        unset($row['Picture3']);
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