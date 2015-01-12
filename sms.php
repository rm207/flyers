<?php

$country = htmlspecialchars($_POST["country"]);
$phonenumber = preg_replace('/[^0-9]/', '', $_POST['phonenumber']);
$carrier = str_replace( '{number}', $phonenumber,  htmlspecialchars($_POST["carrier"]) );
$bib = htmlspecialchars($_POST["bib"]);

?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>sms test</title>
</head>

<body>
<pre>
<?php

echo "country     \t: " . $country . "\n";
echo "carrier     \t: " . $carrier . "\n";
echo "phonenumber \t: " . $phonenumber . "\n";
echo "bib         \t: " . $bib . "\n";
echo "HTTP_REFERER\t: " . $_SERVER['HTTP_REFERER'] . "\n";

$to = $carrier;
$subject = 'QL696.P7 R68 2013';
$body = 'http://flyers.udayton.edu/record=b' . $bib;
$from = '';

$result = mail($to, $subject, $body, $from);

?>
</pre>
</body>
</html>
