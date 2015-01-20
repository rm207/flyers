<?php
header("Content-Type: text/plain");

$dom = new DOMDocument;
$dom->loadHTMLFile('http://flyers.udayton.edu/search?/Xparrots&SORT=D/Xparrots&SORT=D&SUBKEY=parrots/1%2C32%2C32%2CB/marc&FF=Xparrots&SORT=D&1%2C1%2C');

//http://library2.udayton.edu/bibliographic/test.html');
$preTags = $dom->getElementsByTagName('pre');

if ($preTags->length!=0) {

	foreach ($preTags as $preTag)
	{
		echo trim($preTag->nodeValue);

	}
}
?>
