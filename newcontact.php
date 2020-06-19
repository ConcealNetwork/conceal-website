<?php

session_start();
session_regenerate_id();

function hashCreate($name) {
	return $_SESSION[$name] = bin2hex(random_bytes(24));
} // hashCreate

function hashExists($name, $hash) {
	return isset($_SESSION[$name]) && ($_SESSION[$name] == $hash);
} // hashExists

function isValidEmail($address) {

	if (filter_var($address, FILTER_VALIDATE_EMAIL) == FALSE) return false;
	
	// explode out local and domain
	list($local,$domain)=explode('@',$address);
	
	$localLength = strlen($local);
	$domainLength = strlen($domain);
	
	return
		// check for proper lengths
		($localLength > 0 && $localLength < 65) &&
		($domainLength > 3 && $domainLength < 256) &&
		// and if it's a valid domain
		( checkdnsrr($domain, 'MX') || checkdnsrr($domain, 'A') );
		
} // isValidEmail

function postNotMailHeaderSafe($indexes) {
	foreach ($indexes as $index)
		if (array_key_exists($index, $_POST) && (
			strpos($_POST[$index], "\n") || strpos($_POST[$index], "\r")
		)) return true;
	return false;
} // postNotMailHeaderSafe

function mailCleanPost($index) {
	return str_replace(["\r", "\n", ';'], ' ', $_POST[$index]);
} // mailCleanPost

function formMail() {

	$subject = mailCleanPost('subject');
	$email = mailCleanPost('email');
	$from = mailCleanPost('name');
		
	$header =
		'From: ' . $from . ' <' . $email . ">\r\n" .
		'Reply-To: ' . $email . "\r\n" . 
		'X-Mailer: PHP/' . phpversion() . "\r\n" .
		'Content-Type: text/plain';
		
    $message = htmlspecialchars($_POST['message']) . '
    
Logged IP: ' . $_SERVER['REMOTE_ADDR'] . '
UA String: ' . $_SERVER['HTTP_USER_AGENT'];

	return mail(
		'ccx@conceal.network',
		$subject, 
		$message,
		$header
	);

} // formMail

if (
	!empty($_POST['contactHash']) && hashExists('contactHash',$_POST['contactHash'])) {
    if (postNotMailHeaderSafe(['name', 'email', 'subject']) || !isValidEmail($_POST['email'])) {
      header('Content-Type: application/json');
      header('HTTP/1.0 403 Forbidden');
      echo json_encode([
          'title'     => 'Error - Invalid Input',
          'content'   => 'Oops!  You\'ve encountered an error.',
          'newHash'   => hashCreate('contactHash')
      ]);
    } else if (isset($_POST['agreeTerms'])) {
      echo json_encode([
        'title'     => 'Message Sent Successfully',
        'content'   => 'Thank you for contacting us.',
        'newHash'   => hashCreate('contactHash')
      ]);
    } else if (formMail()) {
      header('Content-Type: application/json');
      header('HTTP/1.0 200 Successful');
      echo json_encode([
        'title'     => 'Message Sent Successfully',
        'content'   => 'Thank you for contacting us.',
        'newHash'   => hashCreate('contactHash')
      ]);
    } else {
      ob_clean();
      header('Content-Type: application/json');
      header('HTTP/1.0 500 Internal Server Error');
      echo json_encode([
        'title'     => 'Error - Unable to Contact Us',
        'content'   => 'Uh oh!  It looks like we are having a problem.  Please email us at <a href="mailto:ccx@conceal.network">ccx@conceal.network</a> and let us know!',
        'newHash'   => hashCreate('contactHash')
      ]);
    }
} else {
  header('Content-Type: application/json');
  header('HTTP/1.0 403 Forbidden');
  echo json_encode([
    'title'     => 'Error - Invalid Request',
    'content'   => 'Oops!  You\'ve encountered an error.',
    'newHash'   => hashCreate('contactHash')
  ]);
}

?>