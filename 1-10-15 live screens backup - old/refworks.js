//start javascript code

var bibno

function open_refworks_win(url){
	url=url.replace('recordnum','recordnum='+bibno);
	new_refworks_win=window.open(url,"RefWorksMain",'toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=800,height=500');
	new_refworks_win.focus();
	}

function get_recordnum() { 
	var aTags = document.getElementsByTagName("a");
	var aTagsLen = aTags.length;
	for (var i=0; i < aTags.length; i++) {
		if (aTags[i].id == "recordnum") {
			bibno = aTags[i];
			bibno = bibno.toString();
			var start = bibno.lastIndexOf('b');
			bibno = bibno.substr(start,8);
			var newImg = new Image();
  			newImg.src = '/screens/refworks.gif';
			for (var m=0; m < document.images.length; m++) {
				if  (document.images[m].src == "http://flyers.udayton.edu/screens/blank.gif") 
				     {
					document.images[m].src=newImg.src;
					document.images[m].alt="Add to RefWorks";
				} // end if
			} // end for
		} // end if
	} // end for
} // end function

// end javascript code

