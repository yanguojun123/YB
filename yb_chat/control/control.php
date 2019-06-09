<?php 
include('./model/secondhandbook.php');
$sec=new Users();
$code=$_GET['code'];
if($code==0)
{
   $page=$_GET['page'];
    $res=$sec->showSeconHandBook($page);
    header('content-type:text/json');
    echo json_encode($res);
}




?>