<?php
/**
 * Created by PhpStorm.
 * User: 34205
 * Date: 2019/3/20
 * Time: 8:43
 */
include('ConnectMysql.php');
mysqli_query($connect,'SET names UTF8');

$query="select *from pickedproperty  natural join (select userID,nickname,portraitPicture
                                                      from user)as picker
        order by releaseTime";
$result_pickshow=mysqli_query($connect,$query);
?>