<?php
    $lang = "";

    if(!isset($_COOKIE["CCX_Language"])) {
      $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    } else {
      $lang = $_COOKIE["CCX_Language"];
    }
    
    $acceptLang = ['ru','en']; 
    $lang = in_array($lang, $acceptLang) ? $lang : 'en';
    echo json_encode($lang);
?>