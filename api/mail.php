<?php
	$post_date = file_get_contents("php://input");
	$data = json_decode($post_date);

	$to = $data->email;
	$subject = $data->subject;
	$message = $data->message;
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
	$headers .= 'From: richa@foodtalkindia.com' . "\r\n" .
			    'Reply-To: richa@foodtalkindia.com' . "\r\n" ;
	$sender = mail($to, $subject, $message, $headers);
	echo $sender;
?>