<?php

//make sure that the bib number is actually a number
if ( ! (is_numeric ($_GET["b"])) ) {
	exit(1);
}

else {
	//debug
	//echo $_GET["b"];

	$b = (int) $_GET["b"];
}

?>
<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>bibliographic info</title>

<!-- Bootstrap -->
<link href="style/css/bootstrap.min.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body>

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="style/js/bootstrap.min.js"></script>

	<div class="container">
		<div class="row clearfix">
			<div class="col-md-12 column">

				<h3>bibliographic record info</h3>
				<pre>
				<!-- PAGE CONTENT HERE -->
				
<?php
	//debug
	//echo $b;
	//echo "<br />";

	function doQuery($b) {
	
		//this is the mapping for the reference 
		$reference_type_indicator_tag = 
			array(
			"Abstract" => "Abstract",
			"Artwork" => "Artwork",
			"Bills/Resolutions" => "Bills/Resolutions",
			"Book, Section" => "Book, Section",
			"Book, Edited" => "Book, Edited",
			"Book, Whole" => "Book, Whole",
			"Case/Court Decisions" => "Case/Court Decisions",
			"Computer Program" => "Computer Program",
			"Conference Proceedings" => "Conference Proceedings",
			"Dissertation/Thesis" => "Dissertation/Thesis",
			"Dissertation/Thesis, Unpublished" => "Dissertation/Thesis, Unpublished",
			"Generic" => "Generic",
			"Grant" => "Grant",
			"Hearing" => "Hearing",
			"Journal Article" => "Journal Article",
			"Journal, Electronic" => "Journal, Electronic",
			"Laws/Statutes" => "Laws/Statutes",
			"Magazine Article" => "Magazine Article",
			"Map" => "Map",
			"Monograph" => "Monograph",
			"Motion Picture" => "Motion Picture",
			"Music Score" => "Music Score",
			"Newspaper Article" => "Newspaper Article",
			"Online Discussion Forum" => "Online Discussion Forum",
			"Patent" => "Patent",
			"Personal Communication", "Personal Communication",
			"Report" => "Report",
			"Sound Recording" => "Sound Recording",
			"Unpublished Material" => "Unpublished Material",
			"Video/ DVD" => "Video/ DVD",
			"Web Page" => "Web Page",
			);
		
		/*
		include file (bibliographic.php) supplies the following arguments as the example below illustrates :
			$username = "username";
			$password = "password";

			$dsn = "pgsql:"
				. "host=sierra-db.school.edu;"
				. "dbname=iii;"
				. "port=1032;"
				. "sslmode=require;"
				. "charset=utf8;"
		*/

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
p.material_code,
s.marc_tag,
s.tag,
s.content
from
sierra_view.record_metadata 		r
JOIN
sierra_view.subfield 			s
	ON (r.id = s.record_id)
JOIN
sierra_view.bib_record_property		p
ON (r.id = p.bib_record_id)
where r.record_num = ' . $b . ' AND r.record_type_code = \'b\' order by s.marc_tag
';
		//debug
		//echo $sql;

		echo "material_code\t";
		echo "marc_tag\t";
		echo "tag\t";
		echo "content\t\n";

		$row_count = 0;
		foreach ($connection->query($sql) as $row) {

			echo $row['material_code'] . "\t\t\t";
			echo $row['marc_tag'] . "\t";
			echo $row['tag'] . "\t";
			echo $row['content'] . "\t\n";

			$row_count++;
		}

		echo "\nNUMBER OF RESULTS: " . $row_count . "\n";

		//close our connection
		$connection = null;


	} //end function doQuery

	doQuery($b);

?>

				<!-- /PAGE CONTENT HERE -->
				</pre>
			</div>
		</div>
	</div>

</body>
</html>
