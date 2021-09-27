<?
function goback()
{
    header("Location: {$_SERVER['HTTP_REFERER']}");
    exit;
}
  
if(isset($_POST['username']) && isset($_POST['usermail']) && isset($_POST['pd-agreement'])){
   $username= $_POST['username'];
   $usermail=$_POST['usermail'];
   $pettype=$_POST['pet-type'];
   $breed=$_POST['breed'];
   $agreement=$_POST['pd-agreement'];
   $client=$_POST['client'];
    function postMail($username,$usermail,$pettype='-',$breed= '-',$agreement,$client){
        $mail_headers="content-type:text/html; charset=utf8";
        $message="<b><h4>Время-".date('d-m-Y (H:i:s)')."</h4></b><br>";
        $message.="<table style='margin:auto; border-collapse:collapse; color:#686461;' width='100%' border='1'>
        <tr> <caption>отзыв</caption>
        <th style='border-bottom:3px solid #B9B29F; padding: 10px;text-align:center'>Имя</th>
            <th style='border-bottom:3px solid #B9B29F; padding: 10px;text-align:center' >Почта</th>
        <th style='border-bottom:3px solid #B9B29F; padding: 10px;text-align:center' >Тип животного</th>
        <th style='border-bottom:3px solid #B9B29F; padding: 10px;text-align:center' >Порода</th>
        <th  style='border-bottom:3px solid #B9B29F; padding: 10px;text-align: center'>Обработка ПД</th></tr>
        <th  style='border-bottom:3px solid #B9B29F; padding: 10px;text-align: center'>Тип клиента</th></tr>
        <tr style='font-size:12px;background:#f4f4e7'>
        <td style='padding:5px;'>$username</td>
        <td style='padding:5px;'>$usermail</td>
        <td style='padding:5px;'>$pettype</td>
        <td style='padding:5px;'>$breed</td>
        <td style='padding:5px;'>$agreement</td>
        <td style='padding:5px;'>$client</td>
        </tr>
        </table>";
        mail('breederas@gmail.com','Отзыв',$message,$mail_headers);
}
postMail($username,$usermail,$pettype,$breed,$agreement,$client);
goback();

}
else{
    goback();
}

?>