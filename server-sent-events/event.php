<?php

header('Content-type: text/event-stream');

$r = rand(1,3);

if($r==1) {
  echo 'event: heure'.PHP_EOL;
  echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s'.PHP_EOL;
}

if($r==2) {
  echo 'event: bonjour'.PHP_EOL;
  echo 'data: Bonjour !'.PHP_EOL;
}

if($r==3) {
  echo 'data: Juste un message.'.PHP_EOL;
}

?>