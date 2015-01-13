<?php

//make sure the bib number is a number
if ( ! (is_numeric ($_POST["b"])) ) {
	exit(1);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>text this record to me</title>
</head>

<body>
<pre>
<?php

function doQuery() {

	/* include file (bibliographic.php) supplies the following arguments as the example below illustrates :
		$username = "username";
		$password = "password";

		$dsn = "pgsql:"
			. "host=sierra-db.school.edu;"
			. "dbname=iii;"
			. "port=1032;"
			. "sslmode=require;"
			. "charset=utf8;"
	*/
	
	$b = (int) $_POST["b"];
	$country = htmlspecialchars($_POST["country"]);
	$phonenumber = preg_replace('/[^0-9]/', '', $_POST['phonenumber']);
	$carrier = str_replace( '{number}', $phonenumber,  htmlspecialchars($_POST["carrier"]) );

	//reset all variables needed for our connection
	$username = null;
	$password = null;
	$dsn= null;
	$connection = null;

	require_once($_SERVER['DOCUMENT_ROOT'] . '/../includes/bibliographic.php');

	//	debug
	//echo $dsn . "\n";

	//make our database connection
	try {
		$connection = new PDO($dsn, $username, $password);
	}

	catch ( PDOException $e ) {
		echo "problem connecting to database...\n";
		error_log('PDO Exception: '.$e->getMessage());
		exit(1);
	}

	//set output to utf-8
	$connection->query('SET NAMES UNICODE');

	//query
	$sql='
	select
	i.call_number_norm
	from
	sierra_view.record_metadata             r
	left outer JOIN
	sierra_view.bib_record_item_record_link l
			ON (r.id = l.bib_record_id)
	left outer JOIN
	sierra_view.item_record_property		i
			ON (l.item_record_id = i.item_record_id)
	where r.record_num = ' . $b . ' AND r.record_type_code = \'b\'
	';

	$call_number_norm = '';
	
	foreach ($connection->query($sql) as $row) {

		if ($call_number_norm == '') {
			$call_number_norm = strtoupper ( $row['call_number_norm'] );
		}

	}// /foreach
	
	//close our connection
	$connection = null;
	
	$to = $carrier;
	$subject = $call_number_norm;
	$body = 'http://flyers.udayton.edu/record=b' . $b;
	$from = '';

	
	echo "country     \t: " . $country . "\n";
	echo "carrier     \t: " . $carrier . "\n";
	echo "phonenumber \t: " . $phonenumber . "\n";
	echo "bib         \t: " . $b . "\n";
	echo "callnumber  \t: " . $call_number_norm . "\n";
	echo "link  	  \t: <a href=\"" . $body . "\">" . $body . "</a>\n";
	//echo "HTTP_REFERER\t: " . $_SERVER['HTTP_REFERER'] . "\n";

	if ( mail($to, $subject, $body, $from) ) {
		echo "message     \t: <b>sent!</b>\n";
	}
	else {
		echo "message     \t: <b>not sent (error) - please try again</b>\n";
	}
	
} // /doquery($bib)

	doQuery();
?>

		 <button type="button" onclick="window.open('', '_self', ''); window.close();">Close Window</button>

</pre>
</body>
</html>
