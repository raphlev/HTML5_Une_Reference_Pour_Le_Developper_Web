<?php

header('Content-type: text/event-stream');

echo 'data: '.time().PHP_EOL;

?>