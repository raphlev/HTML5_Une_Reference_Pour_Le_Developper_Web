<?php

header('Content-type: text/event-stream');

$data = json_encode(
  array(
    'time'=>time(),
    'aleatoire'=>rand()
  )
);

echo 'data: '.$data.PHP_EOL.PHP_EOL;

?>