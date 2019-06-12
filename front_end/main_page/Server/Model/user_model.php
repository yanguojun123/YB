<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/28
 * Time: 9:44
 */


header("Access-Control-Allow-Origin:*");
header("Content-Type: text/html;charset=utf-8"); 

class UserModel
{
    var $userId;
    var $password;
    var $nickname;
    var $mail;
    var $phoneNumber;
    var $QQ;
    var $WeChat;
    var $age;
    var $sex;
    var $address;
    var $creditLevel;
    var $personalDescription;
    var $portraitPicture;
    var $conn;

    function __construct()
    {
        $this->conn = new mysqli("localhost", "root", "123456", "yiba");
        $userId = null;
        $password = null;
        $nickname = null;
        $mail = null;
        $phoneNumber = null;
        $QQ = null;
        $WeChat = null;
        $age = null;
        $sex = null;
        $address = null;
        $creditLevel = null;
        $personalDescription = null;
        $portraitPicture = null;
    }

    function getAllInfor($userId)
    {
        // sql语句
        $sql = "select * from user where userId = $userId";

        // 执行查询
        $result = $this->conn->query($sql);
		//echo $result->num_rows;
		if($result==null)
			return null;
        // 验证用户id和密码
        if ($result->num_rows != 0) {
            // var_dump($result, true);
            return $result;
        }
        else {

			
			return null;
        }
    }
}

// $ob = new UserModel();
// $ob->getAllInfor('178062283');