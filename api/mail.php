<?php
	$to = $_GET['email'];
	$subject = $_GET['subject'];
	$message = $_GET['message'];
	$headers = 'From: richa@foodtalkindia.com' . "\r\n" .
			    'Reply-To: richa@foodtalkindia.com' . "\r\n" ;
	$sender = mail($to, $subject, $message, $headers);
	return $sender;
?>