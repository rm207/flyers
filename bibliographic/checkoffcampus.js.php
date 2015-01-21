<?php 

header('Content-Type: text/javascript');

//This function will check to see if the client is in the IP range for on campus.
function oncampus() {

//get Client IP address as reported by the server.
$client_ip = ip2long($_SERVER['REMOTE_ADDR']);
//$client_ip = ip2long("131.238.108.187");

//array with valid campus IP ranges listed as low, high, low, high, etc. (must be in pairs, low followed by high)
$campus_ips = array(
        '131.238.0.0',
	'131.238.255.255'
	//add more in pairs if needed.
        );

$count = 0;

//on campus to start
$on_campus = 1;

foreach ($campus_ips as $value) {

	$count++;

	if (($count % 2) == 0) {
		$high_ip = ip2long($value);
		//echo "high_ip = " . $high_ip . " -- ". $client_ip . " -- low_ip = " . $low_ip . "<br />";
		if($client_ip <= $high_ip && $low_ip <= $client_ip){
		  	//echo "in range <br />";
			$on_campus = 1;
		}
		else {
			//echo "not in range <br />";
			$on_campus = 0;
		}
	}
	else {
		$low_ip = ip2long($value);
	}
}

return $on_campus;

} //end function oncampus()

//set the variable telling us we are on campus. 
$oncampus = oncampus();

?>

function CheckOffCampus() {

var oncampus = <?php echo $oncampus?>;

if(oncampus) {
return;
}

//check for the "checkoffcampus" div ID ...
var oc = document.getElementById("checkoffcampus");

//look for the anchor tags within our div tags (if oc exists, then fill our array, else empty array.
var a_ary = oc ? oc.getElementsByTagName("a") : [];

//prepend our proxy url onto the first link url.
if(a_ary.length >= 1) {
a_ary[0].href = "http://libproxy.udayton.edu/login?url=" + a_ary[0].href;
a_ary[0].innerHTML = "Resource from Off-Campus with Your UD Credentials";
a_ary[0].class = "offcampus_hover";

//make sure that the onclick is blanked, so we don't take the user to the other link.
a_ary[0].onclick = "";
}

//If more than one link, connect via ohiolink proxy.
if(a_ary.length > 1) {
a_ary[1].innerHTML = "Alternative Link to Resource from Off-Campus";
}

else {
//alert("no links!");
return;
}
//end of function CheckOffCampus
}
