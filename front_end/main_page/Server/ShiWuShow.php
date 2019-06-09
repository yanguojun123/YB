<?php
/**
 * Created by PhpStorm.
 * User: 34205
 * Date: 2019/3/13
 * Time: 0:19
 */
include('ConnectMysql.php');
mysqli_query($connect,'SET names UTF8');

$query="select *from lostproperty  natural join (select userID,nickname,portraitPicture
                                                      from user)as loser
        order by releaseTime";
$result_shiwushow=mysqli_query($connect,$query);
?>