<?PHP
//本类用于保存对表Users的数据库访问操作
//表的每个字段对应类的一个成员变量
class Users  
{
    public $bookId;        // 用户名
    public $bookName;    // 密码
    public $author;        // 姓名
    public $publishingHouse;        // 性别
    public $version;    // 地址
    public $ISBN;   // 邮编
    public $price;        // 电子邮件
    public $publishingDate;    // 电话
    public $classification;        // 手机
    public $format;    // 用户类型
    public $paper;//个人描述
    var $conn;

  function __construct() {
    // 连接数据库
    $this->conn = mysqli_connect("localhost", "root", "123456", "yb"); 
   // mysqli_query($this->conn, "SET NAMES gbk");
   
  }
       
  function __destruct() {
    // 关闭连接
    mysqli_close($this->conn);
  }


  //获取个人信息
  function GetAllInfo($bookid)
  {
    $sql="SELECT * FROM secondhandbook WHERE bookId='".$bookid."'";
    $results = $this->conn->query($sql);
    if($row = $results->fetch_row())  {
      $this->bookId=$bookid;
      $this->bookName=$row[1];
      $this->author=$row[2];
      $this->publishingHouse=$row[3];
      $this->version=$row[4];
      $this->ISBN=$row[5];
      $this->price=$row[6];
      $this->publishingDate=$row[7];
      $this->classification=$row[8];
      $this->format=$row[9];
      $this->paper=$row[10];
    }
    else
      $this->UserId = "";
  } 

  //获取所有个人信息，返回结果集
  function GetBookslist()
  {
    //设置查询的SELECT语句
    $sql="SELECT * FROM sencondhandbook";
    //打开记录集
    $results = $this->conn->query($sql);
    return $results;
  } 

  function GetTopnActiveUser($n)
  {
    //设置查询的SELECT语句
    $sql="SELECT u.UserId, u.Name, Count(g.GoodsId) AS cc "
    ." FROM Users u INNER JOIN Goods g ON u.UserId=g.OwnerId "
    ." GROUP BY u.UserId, u.Name "
    ." ORDER BY Count(g.GoodsId) DESC LIMIT 0," . $n;
    //打开记录集
    $results = $this->conn->query($sql);
    return $results;
  } 

  // 判断指定用户名是否存在
  function HaveUsers($uid)
  {
    //设置查询的SELECT语句
    $sql="SELECT * FROM Users WHERE UserId='".$uid."'";
    //打开记录集
    $results = $this->conn->query($sql);
    if($row = $results->fetch_row()) 
      $exist=true;
    else
      $exist=false;
    return $exist;
  } 

  // 判断指定用户名和密码是否存在
  function CheckUser()
  {
    //设置查询的SELECT语句
    $sql="SELECT * FROM Users WHERE UserId='".$this->UserId."' AND UserPwd='".$this->UserPwd."'";
    //打开记录集
    $results = $this->conn->query($sql);
    if($row = $results->fetch_row()) 
      $exist=true;
    else
      $exist=false;
    return $exist;
  } 

  //添加个人信息
  function insert()
  {
    $sql="INSERT INTO Users VALUES ('" . $this->UserId . "','" . $this->UserPwd
     . "','" . $this->Name . "'," . $this->Sex . ",'" . $this->Address . "','" . $this->Postcode . "','" . $this->Email . "','" . $this->Telephone . "','" . $this->Mobile . "'," . $this->UserType . ")";
    //执行SQL语句
    return $this->conn->query($sql);
    
  } 

  //修改个人信息
  function update($uid)
  {
    $sql="UPDATE Users SET Name='" . $this->Name . "', Sex=" . $this->Sex . ", Address='" . $this->Address . "', Postcode='" . $this->Postcode . "', Email='" . $this->Email . "', Telephone='" . $this->Telephone . "', Mobile='" . $this->Mobile . "' WHERE UserId='" . $uid . "'";
    //执行SQL语句
    $this->conn->query($sql);
  } 

  function setpwd($uid)
  {
    $sql="UPDATE Users SET UserPwd='" . $this->UserPwd . "' WHERE UserId='" . $uid . "'";
    $this->conn->query($sql);
  } 

  //删除个人信息
  function delete($uid)
  {
    $sql="DELETE FROM Users WHERE UserId='".$uid."'";
    $this->conn->query($sql);
  } 

  function selUserid($nickname)
  {
      $sql="SELECT userId from user where nickname='".$nickname."'";
      return $this->conn->query($sql);
  }
  function selnickName($uid)
  {
      $sql="SELECT * from user where userId=".$uid;
      //echo "sdssd";
      $result=$this->conn->query($sql);
      if($row = $result->fetch_row())
      {
          $this->nickName=$row[2];
      }
     echo $this->nickName;
  }
  function showSecondHandBook($page)
  {
    $sql="SELECT * from sencondhandbook" ;
    $count1=0;
    $count2=0;
    $result=$this->conn->query($sql);
    var $res;
    $table=array();
    $res->number=$result->$num_rows;
    while($row=$result->fetch_row())
     {
       if($count2>=($page-1)*4)
       {
         $res->table[$count1]=array($row);
         $count1++;
       } 
       $count2++;
       if($count1=4)
        break;
     }
     return $res;
  }
   
}
?>