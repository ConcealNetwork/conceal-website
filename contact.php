<?php
	require_once("/home/concanhq/public_html/forms/modules/swift_mailer/vendor/autoload.php");
	require_once("/home/concanhq/public_html/forms/global/api/API.class.php");
	
	function template( $file ){
		// ensure the file exists
		if ( !file_exists( $file ) ) {
			return '';
		}

		$page = file_get_contents($file);
		$page = str_replace('{contact_name}', $_POST['contact_name'], $page);
		$page = str_replace('{contact_email}', $_POST['contact_email'], $page);
		$page = str_replace('{contact_subject}', $_POST['contact_subject'], $page);
		$page = str_replace('{contact_message}', $_POST['contact_message'], $page);
		$page = str_replace('{SUBMISSIONDATE}', date("M,d,Y h:i:s A"), $page);		

		return $page;	
	}

	$api = new FormTools\API();
	$fields = $api->initFormPage("2", "live", "contact_form");

	$params = array(
		"submit_button" => "contact_submit",
		"namespace" => "contact_form",
    	"form_data" => $_POST,
		"finalize" => true
	);		

	$response = $_POST["g-recaptcha-response"];
	$url = 'https://www.google.com/recaptcha/api/siteverify';
	$data = array(
		'secret' => '6LcKY5kUAAAAANGZuO2BAbdSUArwGZtZsN96z21H',
		'response' => $_POST["g-recaptcha-response"]
	);
	$options = array(
		'http' => array (
			'method' => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$verify = file_get_contents($url, false, $context);
	$captcha_success=json_decode($verify);

	if ($captcha_success->success==false) {
		$result["exitCode"] = 1;
		$result["exitDesc"] = "Captha is not valid! Please solve the captcha in order to send the data...";
 	    echo json_encode($result);
	} else if ($captcha_success->success==true) {
		$returnValue = $api->processFormSubmission($params);
		
		if ($returnValue[0] == 1) {
			try {
				$outputHTML = template( __DIR__ . '/templates/mailHTML.php' );
				$outputPLAIN = template( __DIR__ . '/templates/mailPLAIN.php' );
				
				// Create the SMTP Transport
				$transport = (new Swift_SmtpTransport('conceal.network', 25))
					->setUsername('no-reply@conceal.network')
					->setPassword('SnfcC-Rr![@K');
			 
				// Create the Mailer using your created Transport
				$mailer = new Swift_Mailer($transport);
			 
				// Create a message
				$message = new Swift_Message();		 
				$message->setSubject('Contact Form: ' . $_POST['contact_subject']);		 
				$message->setFrom(['no-reply@conceal.network' => 'Conceal Team']);
				$message->addTo('ccx@conceal.network','CCX Team');
				$message->setBody($outputPLAIN);
				$message->addPart($outputHTML, 'text/html');
			 
				// Send the message
				$mailResult = $mailer->send($message);
				
				$result["exitCode"] = 0;
				$result["exitDesc"] = "Your information has been send to the team. They will contact you shortly. Thank you.";
				
				echo json_encode($result);
			} catch (Exception $e) {
			   $result["exitCode"] = 2;
			   $result["exitDesc"] = "Failed to send your mail to the team! Please try again...";
			   echo json_encode($result);			
			}		
		} else {
			   $result["exitCode"] = $returnValue[1];
			   $result["exitDesc"] = "Failed to store the data into database, pleae try again...";
			   echo json_encode($result);
		}
	}
?>