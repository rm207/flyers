<?php
//make sure the bib number is a number
if ( ! (is_numeric ($_GET["b"])) ) {
	echo "sorry ... no bib record id sent!";
	exit(1);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

<!-- font-awesome -->
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<!-- bootstrap -->
<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">

<!-- sms functions for the page -->
<script src="./sms.js"></script>
<script type="text/javascript">var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-1812745-2"]);_gaq.push(["_trackPageview"]);(function(){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})()</script>
</head>

<body>
<pre>
Text this to me!
</pre>

<div id="smsform">
	<form method="POST" action="http://library2.udayton.edu/bibliographic/sms.php">
		<!-- country ids go here -->
		<select name="country" id="smsform_country" onchange="sms_fill_carrier();">
			<!-- adding values here via javascript -->
		</select><script>sms_fill_countries();</script>
		<!-- carrier names go here -->
		<select name="carrier" id="smsform_carrier">
			<!-- adding values here via javascript -->
		</select><script>sms_fill_carrier();</script>
		
		<input name="phonenumber" type="text" id="smsform_phonenumber">
		
		<input type="hidden" name="b" value="<?php echo $_GET["b"]; ?>">
		
		<input type="submit">
	</form>

</div>

</body>
</html>