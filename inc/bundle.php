<?php
error_reporting(E_ERROR);
// see http://web.archive.org/web/20071211140719/http://www.w3.org/2005/MWI/BPWG/techs/CachingWithPhp
// $lastModifiedDate must be a GMT Unix Timestamp
// You can use gmmktime(...) to get such a timestamp
// getlastmod() also provides this kind of timestamp for the last
// modification date of the PHP file itself
function cacheHeaders($lastModifiedDate) {
  if ($lastModifiedDate) {
    if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $lastModifiedDate) {
      if (php_sapi_name()=='CGI') {
          Header("Status: 304 Not Modified");
      } else {
          Header("HTTP/1.0 304 Not Modified");
      }
      exit;
    } else {
      $gmtDate = gmdate("D, d M Y H:i:s \G\M\T",$lastModifiedDate);
      header('Last-Modified: '.$gmtDate);
    }
  }
}

// This function uses a static variable to track the most recent
// last modification time
function lastModificationTime($time=0) {
  static $last_mod ;
  if (!isset($last_mod) || $time > $last_mod) {
    $last_mod = $time ;
  }
  return $last_mod ;
}

function joinPaths() {
  $args = func_get_args();
  $paths = array();
  foreach ($args as $arg) {
      $paths = array_merge($paths, (array)$arg);
  }

  $paths = array_map(create_function('$p', 'return trim($p, "/");'), $paths);
  $paths = array_filter($paths);
  return join('/', $paths);
}

// recursive create dir
function mkpath($path)
{
  if(@mkdir($path) or file_exists($path)) return true;
  return (mkpath(dirname($path)) and mkdir($path));
}
  
lastModificationTime(filemtime(__FILE__));
cacheHeaders(lastModificationTime());
header("Content-type: " . $_GET['mime'] . "; charset: UTF-8");

ob_start ("ob_gzhandler");
$cached_file = dirname(__DIR__) . '/cache/' . $_GET['build'];

if (file_exists("$cached_file") === false) {
  // make sure that directory exists
  mkpath(dirname(__DIR__) . '/cache');
  // create a new cache file in the cache directory
  $cached_file_handle = fopen($cached_file, 'a+');

  if ($cached_file_handle) {
    // read the content of the file into the lines array
    $lines = file($_GET['load'], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line_num => $value) {
      $real_path = realpath(dirname(__DIR__) . '/' . $value);
      
      if (is_file("$real_path")) {
        lastModificationTime(filemtime("$real_path"));
        $content_file = file_get_contents("$real_path");
        fwrite($cached_file_handle, $content_file);
        fwrite($cached_file_handle, "\n");
      }
    }

    // close the file handle
    fclose($cached_file_handle);
  }
}

// returned cached file
include("$cached_file");
?>