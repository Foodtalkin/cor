<?php
  $post_date = file_get_contents("php://input");
  $data = json_decode($post_date);

  $mbody = $data->mail;
  
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.sendgrid.com/v3/mail/send",
  CURLOPT_POST => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $mbody,
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer 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",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

// if ($err) {
//   echo "cURL Error #:" . $err;
// } else {
//   echo $response;
// }
?>