<?php
/**
 * Created by PhpStorm.
 * User: 23670
 * Date: 2019/5/28
 * Time: 9:41
 */
include "../Model/user_model.php";
include "../Util/user_error_code.php";

header("Access-Control-Allow-Origin:*");
header("Content-Type: text/html;charset=utf-8"); 

//header('Content-Type: text/xml');
//header("Cache-Control: no-cache, must-revalidate");
class UserContoller
{
    var $userModel;

    function __construct()
    {
        $this->userModel = new UserModel();
    }

    function login($userId, $password)
    {
        $result = $this->userModel->getAllInfo($userId);
		//echo $result[0];
      if ($result != null){
        $row = $result->fetch_array();
        //echo "<number>".$row['userId']."</number>";
        //echo $row[0].$row[1];
   //echo "</person>";
        if ($row['password'] == $password){
            $row['status'] = SUCCESS;
            $response = json_encode($row);
        }
        else{   // 密码错误
            $tmp['status'] = WRONG_PASSWORD_ERROR;
            $response = json_encode($tmp);
        }
        echo $response;
      }
	     else{
		    $tmp = [];
            $tmp['status'] = ACCOUNT_NOT_EXISTED_ERROR;// 账户不存在
            $response = json_encode($tmp);
            echo $response;
	     }    
    }
  
  function signIn($nickname, $email, $password){
      
      $userId = $this->userModel->insertNewUser($nickname, $email, $password);
      if ($userId > 0){
        $tmp = [];
            $tmp['status'] = SUCCESS;
            $tmp['userId'] = $userId;
            $response = json_encode($tmp);
            echo $response;
      }
      else{
        $tmp = [];
            $tmp['status'] = INSERT_ERROR;
            $response = json_encode($tmp);
            echo $response;
      }
    }

    function  businessLogic(){
        switch ($_POST['purpose']){
            case 0: // 登陆
                $this->login($_POST['userId'], $_POST['password']);
                break;
            case 1: // 注册
                
                $this->signIn($_POST['nickname'], $_POST['email'], $_POST['password']);
                break;
            default:
                break;
        }
    }
}
//echo "sd";
$userController = new UserContoller();
$userController->businessLogic();