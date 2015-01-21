<?php
/*
//example url for displaying marc data
//http://flyers.udayton.edu/search?/.b1094217/.b1094217/1%2C1%2C1%2CB/marc~b1094217

this script will take a url from sierra's MARC display page and return the 
plaintext display of the MARC record - useful for refworks direct import 
feature like the following example: 


<a href="http://www.refworks.com/express/ExpressImport.asp?vendor=University%20of%20Dayton&filter=MARC%20Format&encoding=65001&url=http%3A//library2.udayton.edu/bibliographic/refworks_test.php" target="RefWorksMain">Export to RefWorks</A>


*/

//make sure that the bib number is actually a number
if ( ! (is_numeric ($_GET["b"])) ) {
	exit(1);
}

$b = $_GET["b"];

//construct the URL ...
$url = "http://flyers.udayton.edu/search?/.b" . $b . "/.b" . $b . "/1%2C1%2C1%2CB/marc~b" . $b;

/* 
test url ...
http://flyers.udayton.edu/search?/Xparrots&SORT=D/Xparrots&SORT=D&SUBKEY=parrots/1%2C32%2C32%2CB/marc&FF=Xparrots&SORT=D&1%2C1%2C
*/

$dom = new DOMDocument;
$dom->loadHTMLFile($url);

$preTags = $dom->getElementsByTagName('pre');

if ($preTags->length!=0) {

	header("Content-Type: text/plain");
	
	foreach ($preTags as $preTag)
	{
		echo trim($preTag->nodeValue);
	}
}

else {
	exit(1);
}
?>