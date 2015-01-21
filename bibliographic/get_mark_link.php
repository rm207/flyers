<?php

//make sure that the bib number is actually a number
if ( ! (is_numeric ($_GET["b"])) ) {
	exit(1);
}

$url = "http://flyers.udayton.edu:80/record=b" . $_GET["b"];

$dom = new DOMDocument;
$dom->loadHTMLFile($url);

$preTags = $dom->getElementsByTagName('pre');

if ($preTags->length!=0) {

	foreach ($preTags as $preTag)
	{
		echo trim($preTag->nodeValue);
	}
}
?>