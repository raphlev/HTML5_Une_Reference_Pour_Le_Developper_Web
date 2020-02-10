<?php

header('Content-type: text/event-stream');

ob_start();

$dt_limit = time()+5;

while(time()<$dt_limit) {
  echo 'data: '.time().PHP_EOL.PHP_EOL;
  ob_flush();
  flush();
  sleep(1);
}

ob_end_flush();

?>