<?php

header('Content-type: text/event-stream');

echo 'id: '.time().PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s'.PHP_EOL;

// Délai de reconnexion en ms
$retry = rand(1000,1500);
echo 'retry: '.$retry.PHP_EOL;

?>