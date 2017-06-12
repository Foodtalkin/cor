<?php
if($_GET['code']){
	$code = $_GET['code'];
}else{
	// $errarray = array('error_description' => $_GET['error_description'],'error_description' => $_GET['error_description'], 'error_description' => $_GET['error_description'] );
	// json_encode(array('status' => '401', 'fti' => $fti));
	echo json_encode($_GET['error_description']);
}

// Get cURL resource
$curl = curl_init();
// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://api.instagram.com/oauth/access_token',
    CURLOPT_POST => 1,
    CURLOPT_POSTFIELDS => array(
        client_id => '4fb089cf7e8b4244a17b8e3080ed4f20',
        client_secret => 'd013c905ec63411aa6651c369306ab50',
        grant_type => 'authorization_code',
        redirect_uri => 'http://batcave.foodtalk.in/api/instagramapi.php',
        code => $code
    )
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources
echo json_encode($resp);
curl_close($curl);

?>