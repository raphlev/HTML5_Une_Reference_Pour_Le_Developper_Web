<?php

header('Content-type: text/event-stream');

echo 'id: '.time().PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s';

// Si l�identifiant pr�c�dent a �t� transmis, il est affich�
if(isset($_SERVER['HTTP_LAST_EVENT_ID'])) {
  echo ' ... et j\'ai recu Last-Event-ID : ';
  echo $_SERVER['HTTP_LAST_EVENT_ID'];
}

echo PHP_EOL;

?>