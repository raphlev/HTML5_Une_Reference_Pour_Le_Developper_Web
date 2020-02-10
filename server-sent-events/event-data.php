<?php

header('Content-type: text/event-stream');

ob_start();

$id = 0;

echo 'event: bourse'.PHP_EOL;
echo 'retry: 5000'.PHP_EOL;
echo 'data: CAC40 '.rand(3000,4000).PHP_EOL;
echo 'data: DOWJONES '.rand(5000,6000).PHP_EOL;
echo 'data: NIKKEI '.rand(5000,6000).PHP_EOL;
echo 'data: NASDAQ '.rand(5000,6000).PHP_EOL;
echo 'id: '.($id++).PHP_EOL.PHP_EOL;

ob_end_flush();

?>