<?php

session_start();

header('Content-type: text/event-stream');

if(!isset($_SESSION['sse_id'])) $_SESSION['sse_id'] = 0;

echo 'id: '.$_SESSION['sse_id'].PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s';

if(isset($_SERVER['HTTP_LAST_EVENT_ID'])) {
  echo ' ... et j\'ai recu Last-Event-ID : ';
  echo $_SERVER['HTTP_LAST_EVENT_ID'];
  if($_SERVER['HTTP_LAST_EVENT_ID']==($_SESSION['sse_id']-1)) {
    echo ' ... tout va bien.';
  } else {
    echo ' ... un message s\'est perdu !';
  }
}

echo PHP_EOL;

$_SESSION['sse_id']++;

?>