<?php
	$post_date = file_get_contents("php://input");
	$data = json_decode($post_date);

	$bcc = $data->email;
	$subject = $data->subject;
	$message = $data->message;
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
	$headers .= 'From: info@foodtalkindia.com' . "\r\n" .
			    'Reply-To: info@foodtalkindia.com' . "\r\n" ;
	$headers .= 'BCC: '. $bcc . "\r\n";
	$sender = mail(null, $subject, $message, $headers);
	echo $sender;
?>