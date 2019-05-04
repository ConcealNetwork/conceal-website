<?php
	require_once("/home/concanhq/public_html/forms/modules/swift_mailer/vendor/autoload.php");
	 
	try {
		// Create the SMTP Transport
		$transport = (new Swift_SmtpTransport('conceal.network', 25))
			->setUsername('no-reply@conceal.network')
			->setPassword('SnfcC-Rr![@K');
	 
		// Create the Mailer using your created Transport
		$mailer = new Swift_Mailer($transport);
	 
		// Create a message
		$message = new Swift_Message();
	 
		// Set a "subject"
		$message->setSubject('Demo message using the SwiftMailer library.');
	 
		// Set the "From address"
		$message->setFrom(['no-reply@conceal.network' => 'Conceal Team']);
	 
		// Set the "To address" [Use setTo method for multiple recipients, argument should be array]
		$message->addTo('iztok.kacin@gmail.com','My name');
		
		// Set the plain-text "Body"
		$message->setBody("This is the plain text body of the message.\nThanks,\nAdmin");
	 
		// Set a "Body"
		$message->addPart('This is the HTML version of the message.<br>Example of inline image:<br><img src="blabla" width="200" height="200"><br>Thanks,<br>Admin', 'text/html');
	 
		// Send the message
		$result = $mailer->send($message);
		echo $result;
	} catch (Exception $e) {
	  echo $e->getMessage();
	}
?>