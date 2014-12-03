<!-- VERSION[] = "630@(#) common.js 630.3@(#) 01/02/13 15:07:20"; -->
function submitFormWithNewHiddenArg(formId, hiddenArg)
{
var patform = document.getElementById(formId);
var field = document.createElement("input");
field.setAttribute("type", "hidden");
field.setAttribute("value", "xxx");
field.setAttribute("name", hiddenArg);
patform.appendChild(field);
patform.submit();
}
/*
 * load a new page when the user selects something in a <select>
 */
function onSelectChange(obj, sSearchSuffix)
{
  var index = obj.selectedIndex;
  if (obj.options[index].value.substr(0,1) == '+')
      {
      location.replace(obj.options[index].value.substr(1));
      }
  else
      {
      if (navigator.appName == 'Microsoft Internet Explorer')
         {
         location.replace( encodeURI(
            "/search" + sSearchSuffix + "/" +
            obj.options[index].value.substr(0,1) + "?" +
            obj.options[index].value.substr(1)));
         }
      else
         {
         location.replace(
            "/search" + sSearchSuffix + "/" +
            obj.options[index].value.substr(0,1) + "?" +
            obj.options[index].value.substr(1));
         }
      }
}
/*
 * support for export / bookcart:
 */
function process_save(saveall) {
    obj = getObj('save_func');
    if (saveall)
        obj.value = 'save_all_page';
    else
        obj.value = 'save_marked';
    obj.form.submit();
}
function removesome(myform, oldURL, doall)
{
var i;
var newURL = oldURL;
for (i = 0; i < myform.elements.length; i++)
	{
	if (myform.elements[i].type != 'checkbox')
	    continue;
	newURL += '&' + myform.elements[i].name + '=';
	if (!doall)
		newURL += (myform.elements[i].checked ? '1' : '0');
	else
		newURL += '1';
	}
replace_or_redraw(newURL);
return false;
}
function removesomeconfirm(myform, oldURL, doall, msg, framed)
{
var i;
var newURL = oldURL;
if (confirm(msg))
	{
    for (i = 0; i < myform.elements.length; i++)
    {
    	if (myform.elements[i].type != 'checkbox')
    	    continue;
    	newURL += '&' + myform.elements[i].name + '=';
    	if (!doall)
    		newURL += (myform.elements[i].checked ? '1' : '0');
    	else
    		newURL += '1';
	}
   if (framed)
       replace_or_redraw_parent(newURL);
   else
       replace_or_redraw(newURL);
	}
return false;
}
function removecheckedconfirm(myform, oldURL, msg, framed)
{
var i;
var newURL=oldURL;
var cnt = 0;
if (confirm(msg))
	{
    for (i = 0; i < myform.elements.length; i++)
    {
       if (cnt >= 200)
            break;
    	if (myform.elements[i].type != 'checkbox')
    	    continue;
       if (myform.elements[i].checked)
	   {
    	    newURL += '&' + myform.elements[i].name + '=1';
	    cnt++;
	   }
    }
   if (framed)
       replace_or_redraw_parent(newURL);
   else
       replace_or_redraw(newURL);
	}
return false;
}
function removechecked(myform, oldURL, framed)
{
var i;
var ie=0;
var newURL = oldURL;
if (navigator.appName.indexOf("Explorer")>-1)
    ie=1;
for (i = 0; i < myform.elements.length; i++)
{
   if (ie && i >= 200)
        break;
	if (myform.elements[i].type != 'checkbox')
	    continue;
	if (myform.elements[i].checked)
        newURL += '&' + myform.elements[i].name + '=1';
   else
        newURL += '&' + myform.elements[i].name + '=0';
}
if (framed)
   replace_or_redraw_parent(newURL);
else
   replace_or_redraw(newURL);
return false;
}
function removeallconfirm(myform, newURL, msg, framed)
{
if (confirm(msg))
	{
	if (framed)
       replace_or_redraw_parent(newURL);
	else
       replace_or_redraw(newURL);
	}
return false;
}
function open_new_htpatpay_window( new_URL )
{
var w = (window.open(new_URL, 'patwin', 'width=760,height=550,status=yes,scrollbars=yes,resizable'));
w.focus();
return false;
}
function onClickProcessAll( new_URL, action, msg )
{
if (confirm(msg)) {
	new_URL = new_URL + "?" + action + "all";
	replace_or_redraw( new_URL );
	return false;
	}
}
function onClickMoveList(myform, currentURL, msg)
{
var i;
var newURL = currentURL;
for( i = 0; i < myform.elements.length; i++ )
{
  if( myform.elements[i].type != "checkbox" )
    continue;
  if( !myform.elements[i].checked )
    continue;
  newURL = newURL + "&" + myform.elements[i].name + "=1";
}
if( currentURL == newURL )
{
  alert(msg);
  newURL = newURL + "&moveListErr";
}
replace_or_redraw( newURL );
return false;
}
function onClickMoveListSubmit(myform, currentURL, arg)
{
var newURL = currentURL;
var newname = document.getElementById("newlistname");
var newdesc = document.getElementById("newlistdesc");
var selector = document.getElementById("listname");
if( selector )
{
  selectedTag = selector.options[selector.options.selectedIndex].value;
  newURL = newURL + "&" + arg + "=" + selectedTag;
}
if( newname )
  newURL = newURL + "&" + newname.name + "=" + newname.value;
if( newdesc )
  newURL = newURL + "&" + newdesc.name + "=" + newdesc.value;
replace_or_redraw( newURL );
return false;
}
function onClickRenameList(myform, currentURL, curListName, msg)
{
var newURL = currentURL;
var lname = document.getElementById("listname");
var ldesc= document.getElementById("listdesc");
if( lname && lname.value == "" )
{
  alert(msg);
}
else
{
  if( lname && (lname.value != "") && (curListName != lname.value) )
    newURL = newURL + "&" + lname.name + "=" + encodeURIComponent(lname.value);
  if( ldesc )
    newURL = newURL + "&" + ldesc.name + "=" + encodeURIComponent(ldesc.value);
}
replace_or_redraw( newURL );
return false;
}
function onClickSubmitCheckedList( current_form, old_URL, action, value )
{
var i;
var n;
new_URL = old_URL + "?" + action + "=" + value;
for (i = 0; i < current_form.elements.length; i++ )
    {
    if( current_form.elements[ i ].type != "checkbox" )
			continue;
    if (! current_form.elements[ i ].checked )
        continue;
    element_name = current_form.elements[ i ].name;
    element_value = current_form.elements[ i ].value;
    new_URL = new_URL + "&" + element_name + "=1";
    }
replace_or_redraw( new_URL );
return false;
}
function onClickProcessSome( current_form, old_URL, action )
{
var i;
var n;
new_URL = old_URL + "?" + action + "some=TRUE";
for (i = 0; i < current_form.elements.length; i++ )
    {
    if( current_form.elements[ i ].type != "checkbox" )
            continue;
    if (! current_form.elements[ i ].checked )
        continue;
    element_name = current_form.elements[ i ].name;
    element_value = current_form.elements[ i ].value;
    new_URL = new_URL + "&" + element_name + "=" + element_value;
    }
replace_or_redraw( new_URL );
return false;
}
function onClickProcessSomeHolds( current_form, old_URL, action )
{
var i;
var n;
new_URL = old_URL + "?" + action + "some=TRUE";
for (i = 0; i < current_form.elements.length; i++ )
	{
	if( current_form.elements[ i ].type == "checkbox" ) {
		if( current_form.elements[ i ].checked )
		element_value = "1";
		else continue;
		}
	else if( current_form.elements[ i ].type == "select-one" ){
	     element_value = current_form.elements[ i ].options[current_form.elements[ i ].selectedIndex].value;
	     }
	else continue;
	element_name = current_form.elements[ i ].name;
    new_URL = new_URL + "&" + element_name + "=" + element_value;
	}
replace_or_redraw( new_URL );
return false;
}
//SORT FUNCTIONS
function sortBrowse()
{
if( document.searchtool.searchtype != null && savedTag != null )
	document.searchtool.searchtype.options.selectedIndex = savedTag;
if( document.searchtool.searcharg != null && savedSearch != null )
	document.searchtool.searcharg.value = savedSearch;
if( document.searchtool.searchscope != null && savedScope != null )
	document.searchtool.searchscope.options.selectedIndex = savedScope;

document.searchtool.submit();
}

function sortExactBrowse()
{
var new_url;

var k = sortExactBrowseURL.lastIndexOf("indexsort=");
var selector = document.searchtool.sortdropdown;
var sortopt = selector.options[ selector.selectedIndex ].value;
if( k == -1)
	{
	new_url = sortExactBrowseURL + "/indexsort=" + sortopt;
	}
else
	{
	new_url = sortExactBrowseURL.substring(0, k) + "indexsort=" + sortopt;
	}
window.location = new_url;
}

function initSort()
{
if( document.searchtool.searchtype != null )
    savedTag = document.searchtool.searchtype.options.selectedIndex;
else savedTag = null;
if( document.searchtool.searcharg != null )
    savedSearch = document.searchtool.searcharg.value;
else savedSearch = null;
if( document.searchtool.searchscope != null )
    savedScope = document.searchtool.searchscope.options.selectedIndex;
else savedScope = null;

if( !document.getElementById("sortdropdown") )
	{
	var anchorPlacement = document.getElementById("sort_cell");
	//create sort select and add it to the DOM
	var newSortSelect = createSelect(
			"sortdropdown",sortTypes, sortLabels, sortSelectedValue);
	addContent(newSortSelect, anchorPlacement );
	if( sortButtonText != null)
		{
		var newSortButton = createButton(sortButtonText,"sortbutton");
		newSortButton.onclick = eval(sortButtonEvent);
		addContent(newSortButton, anchorPlacement);
		}
	}
toggleSort();
}

function searchtoolSubmitAction()
{
//document.searchtool.sortdropdown.value = '-'; c1195275 note 28, don't clear
document.searchtool.searchlimits.value = '';
return true; //tell the submit button to perform the submit
}

function toggleSort()
{
//* added get element by id */
var selector = document.getElementById("searchtype");
selectedTag = selector.options[selector.options.selectedIndex].value;

//* removed test for nn4 since we don't support it */
//* added global var for sort tags */
var sortSelect = document.getElementById("sortdropdown");
if(sortSelect)
	{
	if(nonSortTags.search(selectedTag) != -1 )
		{
		sortSelect.className = "hideElem";
		}
	else
		{
		sortSelect.className = "showInlineElem";
		}
	sortSelect.options.selectedIndex = sortSelectedValue;
	}
var sortButton = document.getElementById("sortbutton");
if( sortButton )
	{
	if(nonSortTags.search(selectedTag) != -1 )
		{
		sortButton.className = "hideElem";
		}
	else
		{
		sortButton.className = "showInlineElem";
		}
	}
}

/*
 * Support for srchhelp_X:
 *
 */
/*
 * support for "clear form" button:
 * note: the form name and the element names correspond to the js in
 * websrchhelp.c:srchhelp_x_advancesearchformbegin().
 * form.reset() does not work like we would like... have to
 * explicitly clear the fields.
 */
function iiiDoReset_1()
{
obj = getObj("search");
/* if (obj) obj.reset(); C987846 */

for (var i = 0; i < obj.elements.length; i++)
	{
	var x = obj.elements[i];
	if (!x.name) continue;
	if (x.name.substr(0,10) == "fieldLimit") x.selectedIndex = 0;
	else if (x.name.substr(0,7) == "boolean") x.selectedIndex = 0;
	else if (x.name == "SORT") x.selectedIndex = 0;
	else if (x.name == "sortdropdown") x.selectedIndex = 0;
	else if (x.name == "searchscope")
			x.selectedIndex = (savedScopeIndex - 1);
	else if (x.type == "text") x.value = "";
	else if (x.type == "select-one") x.selectedIndex = 0; /* C987846 */
	else if (x.type == "select-multiple") x.selectedIndex = 0; /* C987846 */
	else if (x.type == "checkbox") x.checked = false;
	}
}
//method of AdvancedSearchForm is called by the createSearchString
//and createLimitString methods
//utf8 encodes values to be passed to webpac
function prepHTMLValue(value)
{
if(value != "" )
	{
	newvalue = encodeURIComponent(value);
	escvalue = escape(value);

	if(escvalue.indexOf("%u") != -1 && encode != "UTF-8")
		return value;
	else
		return newvalue;
	}
return "";
}
//method of AdvancedSearchForm creates the search string for the search request
function createSearchString()
{
//start at one because the arrays are created by extracting the numeric portion of the form element's name
//for example: searchText1, searchText2
for(var i=1; i < this.searchTextArray.length; i++)
	{
	var searchVal = this.prepHTMLValue(this.getValue(this.searchTextArray[i]));
	var searchSlice = this.getValue(this.fieldLimitArray[i]);
	if( searchVal != "" )
		{
		if(i != 1 )
			{
			this.searchString +=this.getValue(this.booleanArray[i-1]);
			}
		this.searchString += searchSlice+"("+searchVal+")";
		}
	}
}
//method of AdvancedSearchForm creates the limit string for the search request
function createLimitString()
{
for( var i in this.limitArray)
	{
	var elemName = new String(this.limitArray[i].name);
	var elemValue = this.getValue(this.limitArray[i]);
	if( elemValue != "" )
		{
		if(elemName.indexOf("Db") != -1 || elemName.indexOf("Da") != -1)
			{
			this.limitString += "&"+elemName+"="+this.prepHTMLValue(elemValue);
			}
		else
			{
			this.limitString += "&"+elemName+"="+elemValue;
			}
		}
	}
}
//AdvancedSearchFrom is a javascript object
function AdvancedSearchForm(form)
{
//methods
this.getValue = getValue;
this.prepHTMLValue = prepHTMLValue;
this.createSearchString = createSearchString;
this.createLimitString = createLimitString;

//members
//	initialize limit members
this.limitString = new String("");
this.limitArray = new Array();
this.limitArray.scope = ( form.elements["searchscope"] ) ? form.elements["searchscope"] : "";
this.limitArray.dateafter = (form.elements["Da"]) ? form.elements["Da"] : "";
this.limitArray.datebefore = (form.elements["Db"]) ? form.elements["Db"] : "";
this.limitArray.sortby =  (form.elements["SORT"]) ? form.elements["SORT"] : "";
this.limitArray.limitavail =  (form.elements["availlim"]) ? form.elements["availlim"] : "";
this.limitArray.circhistlimit =  (form.elements["circhistlimit"]) ? form.elements["circhistlimit"] : "";

//initialize rest of limitArray - webpac creates the next func at runtime
AdvancedSearchForm_initLimits(this, form);

//	initialize search members
this.searchString = new String("");
this.fieldLimitArray = new Array();
this.searchTextArray = new Array();
this.booleanArray = new Array();
this.fieldPattern = /fieldLimit(\d+)/;
this.searchPattern = /searchText(\d+)/;
this.booleanPattern = /boolean(\d+)/;
for(var i=0; i < form.elements.length; i++)
	{
	if (!form.elements[i].name) continue;
	if( form.elements[i].name.indexOf("fieldLimit") != -1)
		{
		var matches = this.fieldPattern.exec(form.elements[i].name)
		this.fieldLimitArray[matches[1]] = form.elements[i];
		}
	if( form.elements[i].name.indexOf("searchText") != -1)
		{
		var matches = this.searchPattern.exec(form.elements[i].name)
		this.searchTextArray[matches[1]] = form.elements[i];
		}
	if( form.elements[i].name.indexOf("boolean") != -1)
		{
		var matches = this.booleanPattern.exec(form.elements[i].name)
		this.booleanArray[matches[1]] = form.elements[i];
		}
	}
}
function submitSearch(form, pathname, use_nosrch)
{
//create a new AdvancedSearchForm with the form as the parameter
var thisForm = new AdvancedSearchForm(form);

thisForm.createLimitString();
thisForm.createSearchString();
var nosrchstring = "SEARCH";
var subkeystring = "";

if (use_nosrch)
	{
	nosrchstring = "NOSRCH";
	subkeystring = "&SUBKEY=" . thisForm.searchString;
	}

form.action = location.protocol+ "//" + location.host + pathname
	+ "?" + nosrchstring + "=" +  thisForm.searchString
	+ thisForm.limitString + subkeystring;

window.location.href = location.protocol+ "//" + location.host + pathname
	+ "?" + nosrchstring + "=" +  thisForm.searchString
	+ thisForm.limitString + subkeystring;

//return false because we're sending the form using window.location.href. returning true will send the form in the traditional way
return false;
}
function strip_surrounding_parens(buf)
/*
 * strip the leading and trailing parentheses from the search string
 * only if they balance each other, e.g.:
 * (apple pie) ==> apple pie
 *   MODIFIED because the trailing paren balances the trailing paren
 * (apple pie) and (peach cobbler) ==> (apple pie) and (peach cobbler)
 *   NOT MODIFIED because the paren after "pie" balances the leading paren
 * ((apple pie) and (peach cobbler)) ==> (apple pie) and (peach cobbler)
 *   MODIFIED because the trailing paren balances the trailing paren
 *
 * Compare to c version in httpuchars.c:strip_surrounding_parens()
 * for interesting reading.
 */
{
var p;
var n;

if (buf.substring(0, 1) != "(" ||
	buf.substring(buf.length - 1, buf.length) != ")")
	{
    return buf; /* no leading and trailing parentheses == no modification */
	}

for (n = 0, p = 0; p < buf.length; p++)
    if (buf.substring(p, p + 1) == "(") n++;
    else if (buf.substring(p, p + 1) == ")")
        {
        if (!(--n) && p < buf.length - 1)
			{
            return buf;  /* matching paren not at end == no modification */
			}
        }
/* made it through the loop but might have unbalanced parens */
if (n) return buf; /* unbalanced parentheses - no modification */

/* return without leading and trailing parens */
return buf.substring(1, buf.length - 1);
}
//function used to populate the form when modifySearch is requested
//if SUBKEY is not present we will fall back to using SEARCH, which is
//the query in raw format (this fallback is necessary for the case when the
//request has "no entries found").  If neither arg is in the string, we
//will alert user that search information could not be processed
function modifySearch(string)
{
var form = document.search;
if (!form) return; /* it is OK if the form is not on the page */
var modifyString = string;

//grab utf-8 encoded SUBKEY field and remove it from the string
if( modifyString.indexOf("&SUBKEY=") == -1 )
	{
	if (modifyString.indexOf("?SEARCH=") == -1)
	    {
	    if( modifyString.indexOf("searcharg=") == -1 )
           	{
				/* no prior search term - not an error */
                return;
	        }
	    else
		{
		var searchPattern = /searcharg=([^&]+)/;
		}
	    }
	else
	    {
	    var searchPattern = /\\?SEARCH=([^&]+)/;
	    }
	}
else
	{
	var searchPattern = /&SUBKEY=([^&]+)/;
	}

var searchTextArray = searchPattern.exec(modifyString);
var searchText = searchTextArray[1].replace(/\+/g," ");
modifyString = modifyString.replace(/&SUBKEY=(.+)&{0,1}/,"");

var modifyArray = modifyString.split("&");

//remove the first element from the array leaving only limit fields in the
//modify array
//the first element is the original search term and will display diacritics
//which we can't process on the client-side
modifyArray.shift();

/*
 * Logic to break the search query into the individual search
 * args may be found in versions prior to 450.1.  See c1110254
 * for why this logic has been removed.
 */
form.elements["searchText1"].value =
		strip_surrounding_parens(decodeURIComponent(searchText));

//update limit elements using setValue()
for(var i=0; i < modifyArray.length; i++)
	{
	var pairArray = modifyArray[i].split("=");
	var key = pairArray[0];
	var value = decodeURIComponent(pairArray[1]);
	if(form.elements[key])
		setValue(form.elements[key], value);
	}
}
/**
 * srchmod.c javascript used to submit limform
 * @param {Object} val
 */
function submit_limform_lo(val)
{
	var act = val.substring(0, 1);
	var url = val.substring(1);
	if (act == '0')
    {
		document.location.href = url;
    }
	else
    {
    	document.limform.action = url;
		document.limform.submit();
    }
}
/**
 * srchmod.c javascript used to get value of
 * select input - iiiresetscopewidget
 */
function submit_limform()
{
	var r = document.getElementById('iiiresetscopewidget');
	if (r)
    {
		var val = r.options[r.selectedIndex].value;
		submit_limform_lo(val);
    }
	else
    {
    	document.limform.submit();
    }
}
/**
 * Generic DOM functions
 */
function getObj(name) {
    if (document.getElementById)
        obj = document.getElementById(name);
    else if (document.all)
        obj = document.all[name];
    else if (document.layers)
        obj = document.layers[name];
    return obj;
}
function showElement( id )
{
	var obj = getObj( id );
	if( obj )
    {
		obj.style.display = "";
	}
}
function createSelect(sName,sTypes, sLabels, sSelectedValue)
{
    var newSelect = document.createElement("SELECT");
    newSelect.setAttribute("name", sName);
    //toggleSort is predicated on this id
    newSelect.setAttribute("id", sName);
    for(var i=0; i < sTypes.length; i++)
    {
        if (sSelectedValue != null && sSelectedValue == sTypes[i])
        {
            newSelect.selectedIndex= i;
        }
        newSelect.options[i] = new Option(sLabels[i],sTypes[i]);
    }
    return newSelect;
}
function createButton(sValue,sName)
{
    var newButton = document.createElement("INPUT");
    newButton.setAttribute("type","button");
    newButton.setAttribute("value",sValue);
    newButton.setAttribute("name",sName);
    newButton.setAttribute("id",sName);
    return newButton;
}
function addContent(nodeObj,parentNode)
{
    parentNode.appendChild(nodeObj);
}
/**
 * Generic Form functions
 */
//generic function to clear forms
function clearForm(form)
{
	//loop through all of the form elements for the submitted form
	for(var f=0; f < form.elements.length; f++)
	{
		var formObj = form.elements[f];
		var objType = form.elements[f].type;
		//if the form object is a text input
		if(objType == 'text')
		{
			formObj.value = "";
		}
		//if the form object is a radio button or checkbox
		else if(objType == 'radio' || objType == 'checkbox')
		{
			formObj.checked= false;
		}
		//if the form object is a single select box
		//this test is predicated on the first element of a combo box (select) being empty
		else if(objType == 'select-one' || objType == 'select-multiple')
		{
			for( var i = 0; i < formObj.options.length; i++ )
			{
				formObj.options[i].selected = false;
			}
			formObj.options[0].selected = true;
		}
	}
	return true;
}
//Helper function to set the form element object's value
function setValue(element,value)
{
if( element.type == 'select-one' && element.selectedIndex >= 0)
	{
	if( element.options[element.selectedIndex].value == value )
		element.options.selected=true;
	}
else if( element.type == 'select-multiple' )
	{
	for (var m = 0; m < element.options.length; m++)
		{
		if(element.options[m].value == value)
			{
			element.options[m].selected=true;
			return;
			}
		}

	}
else if( element.type == 'text' || element.type == 'radio' )
	{
	element.value = value;
	}
else if( element.type == 'checkbox' )
	{
	if( element.value == value )
		element.checked = true;
	}

}
//method of AdvancedSearchForm retrieve the form element object's value
function getValue(element)
{
if( element.type == 'select-one' && element.selectedIndex >= 0)
	{
	return element.options[element.selectedIndex].value;
	}
else if( element.type == 'select-multiple' )
	{
	var selectedValues = '';
	var countSelected = 0;
	for (var m = 0; m < element.options.length; m++)
		{
		if (element.options[m].selected)
			{
			if(countSelected != 0)
				selectedValues += "&"+element.name+"=";
			selectedValues += element.options[m].value;
			countSelected++;
			}
		}
	return selectedValues;
	}
else if( element.type == 'text' || element.type == 'radio' )
	{
	return element.value;
	}
else if( element.type == 'checkbox' )
	{
	if( element.checked )
		return element.value;
	}
return "";
}
/**
 * Generic Time functions
 */
var timeout_url = "";
function timeoutRedirect(){
if (timeout_url == "")
    timout_url = "/";
if( navigator.appVersion.charAt( 0 ) < '3' )
   location = timeout_url;
else
   location.replace( timeout_url );
return false;
}
var timer = null;
function startTimeout(time, url)
{
   if( timer != null )
       clearTimeout(timer);
   timeout_url = url;
   timer = setTimeout('timeoutRedirect()', time);
}
/**
 * Generic Window functions
 */
// patroninfo script
function close_it( )
{
	window.close();
	return false;
}
/*
 * support for patroninfo functions:
 */
function replace_or_redraw( new_URL )
{
//var oBase = document.all.tags('base');
//if (oBase && oBase.target) oBase.target = _self;
if( navigator.appVersion.charAt( 0 ) < '3' )
	location = new_URL;
else
	location.replace( new_URL );
return false;
}
function replace_or_redraw_parent( new_URL )
{
//var oBase = document.all.tags('base');
//if (oBase && oBase.target) oBase.target = _self;
if( navigator.appVersion.charAt( 0 ) < '3' )
	parent.location = new_URL;
else
	parent.location.replace( new_URL );
return false;
}
function open_new_window( new_URL )
{
var w = (window.open(new_URL, 'patwin', 'width=550,height=550,status=yes,scrollbars=yes,resizable'));
w.focus();
return false;
}
/**
 * Generic Cookie functions
 */
function setCookie( name, value, expires, path, domain, secure )
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	//expires in seconds
	if ( expires )
		expires = expires * 1000;
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" + value +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}
/* This function re-populate a dropdown with elements from an array */
function repopulateDropdown( selectName, selectVal, names, values )
{
var selectedIndex = 0;
var i = 0;
var dropdown = getObj( selectName );

if( dropdown.type != "select-one" )
	return;

var n = dropdown.options.length;
for( i = 0; i < n; i++)
    {
    dropdown.options[i] = null;
    }
for( i = 0; i < names.length; i++)
    {
    dropdown.options[i] =  new Option( names[i] );
    dropdown.options[i].value =  values[i];
    if( selectVal == values[i] )
		selectedIndex = i;
    }
dropdown.length = i;
dropdown.selectedIndex = selectedIndex;
}
/* Patreview -- External Content -- Program reg */
toggle = {
/* the onload handler that applies the toggle object to a page */
/* this method gathers an array of elements by specified attribute, seraching for a specific att value is optional */
attCheck : function(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var vReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if( oAttribute != null)
        {
			if(typeof oAttribute == "string" && oAttribute.length > 0){
				if( typeof strAttributeValue == "undefined" ||
					(oAttributeValue && oAttributeValue.test(oAttribute)))
				{
					vReturnElements.push(oCurrent);
				}
			}
		}
	}
	return vReturnElements;
},
addClass : function(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
},
pageHeight : function(){
	var yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){
		yScroll = document.body.scrollHeight;
	} else {
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) {
		windowHeight = document.body.clientHeight;
	}
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	return pageHeight;
},
position : function(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
},
scroller : function(obj) {
	if(obj <= "500") { scrollTo(0,0); }else{ scrollTo(0,obj);}
},
setAtts: function( dataStructure ){
	this.togAtts = dataStructure
},
getAtts: function(){
	if(this.togAtts)
		return this.togAtts.links;
},
/* creates an overlay div */
shade : function(){
	if( !document.getElementById("OverlayDiv"))
	{
		var overElem = document.createElement("div");
		overElem.setAttribute("id", "OverlayDiv");
		var myElem = document.body;
		try {
			myElem.appendChild(overElem);
			var tab = document.getElementById("OverlayDiv");
			tab.style.display = "none";
		} catch( ex ) {
			alert(ex);
		}
	}
	alert("exit toggle.shade()")
},
init: function(){
	var rels = toggle.attCheck(document.body, "a", "toggle");
	if(rels.length == 0) return false; // degrades gracefully if no "toggles" are present
	for (var j=0; j<rels.length; j++) {
			var togType = rels[j].getAttribute("TOGGLE");
			var targetID = rels[j].getAttribute("REL");
			var setup = document.getElementById(targetID);
			switch(togType){
 		case "brief":
			setup.className = "briefhide" ;
			rels[j].onclick =function()
			{
				var cont = this.getAttribute("REL");
				var elem = document.getElementById(cont);
				var togAtts = toggle.getAtts();
				if(togAtts){
					for (i=0;i<togAtts.length;i++){
						if(cont == togAtts[i].rel) {
							if(elem.className == "briefhide"){
								elem.className = "briefshow";
								this.innerHTML = togAtts[i].terminus;
								return false;
							}
							else {
								elem.className="briefhide";
								this.innerHTML = togAtts[i].init;
								return false;
							}
						}
					}
				}
				if(elem.className == "briefhide")
					elem.className = "briefshow";
				else
					elem.className="briefhide";
			return false;
			}
			break;
 		case "static":
			setup.className = "statichide" ;
			rels[j].onclick =function()
			{
			var cont = this.getAttribute("REL");
			var elem = document.getElementById(cont);
			var x =  elem.getElementsByTagName("A");
			var togAtts = toggle.getAtts();
				if(togAtts){
					for (i=0;i<x.length;i++){
						var orig = toggle.attCheck(document.body, "*", "toggle","static");
						for (l=0;l<orig.length;l++){
							if(x[i].getAttribute("REL") == orig[l].getAttribute("REL")){
								x[i].onclick = function(){
									elem.className = "statichide";
									for (n=0;n<orig.length;n++){
										if(this.getAttribute("REL") == orig[n].getAttribute("REL")){
											for (m=0;m<togAtts.length;m++){
												if(orig[n].getAttribute("REL") == togAtts[m].rel){
													orig[n].innerHTML = togAtts[m].init;
												}
											}
										}
									}
									return false;
								}
							}
						}
					}
					for (k=0;k<togAtts.length;k++){
						if(cont == togAtts[k].rel) {
							if(elem.className == "statichide"){
								elem.className = "staticshow";
								this.innerHTML = togAtts[k].terminus;
								return false;
							}else{elem.className="statichide"; this.innerHTML = togAtts[k].init; return false;}
						}
					}
				}
		  		else{
					for (i=0;i<x.length;i++){
						var orig = toggle.attCheck(document.body, "*", "toggle","static");
						for (l=0;l<orig.length;l++){
							if(x[i].getAttribute("REL") ==
										orig[l].getAttribute("REL"))
							{
								if(x[i].getAttribute("REL") ==
											orig[l].getAttribute("REL"))
								{
									x[i].onclick = function(){
										elem.className = "statichide";
										return false;
									}
								}
							}
						}
					}
				}
				if(elem.className == "statichide")
					elem.className = "staticshow";
				else
					elem.className="statichide";
			return false;
			}
			break;
		case "overlay":
			setup.className = "overlayhide" ;
			var linkElem = rels[j];
			linkElem.onclick = function()
			{
				var pos = toggle.position(this);
				var cont = this.getAttribute("REL");
				var elem = document.getElementById(cont);
				var x =  elem.getElementsByTagName("A");
				for (i=0;i<x.length;i++)
				{
					var orig = toggle.attCheck(document.body, "A", "toggle","overlay");
					for (l=0;l<orig.length;l++){
						if(x[i].getAttribute("REL") == orig[l].getAttribute("REL")){
							x[i].onclick = function(){
								elem.className = "overlayhide";
								var tab = document.getElementById("OverlayDiv");
								if(tab)
								{
									tab.style.display = "none";
									toggle.scroller(pos[1]);
								}
								return false;
							}
						}
					}
				}
				if(elem.className == "overlayhide")
				{
					elem.className = "overlayshow";
					var backgnd = document.getElementById("OverlayDiv");
					if(backgnd)
					{
						backgnd.style.display = "";
						backgnd.style.height = toggle.pageHeight();
						scrollTo(0,0);
						backgnd.onclick=function(){
							this.style.display = "none";
							elem.className = "overlayhide";
							toggle.scroller(pos[1]);
						}
					}
					else
					{
						var overElem = document.createElement("div");
						overElem.setAttribute("id", "OverlayDiv");
						overElem.onclick=function(){
							this.style.display = "none";
							elem.className = "overlayhide";
							toggle.scroller(pos[1]);
						}
						var myElem = document.body;
						try {
							myElem.appendChild(overElem);

						} catch( ex ) {
							alert(ex);
		}
					}
				}
				else
					elem.className="overlayhide";
			}
			break;
		case "default":
			setup.className = "default" ;
			toggle.addClass(rels[j].parentNode,"hide");
			break;
 		}
	}
}
}
/*
 * this is used to populate "progsearch" token (programs.html)
 * requires strip_surrounding_parens() elsewhere in this module.
 */
function init_progsearch()
{
var o = document.getElementById('progsearch_input');
if (!o) return; /* this input field not on the page is not an error */
if (location.search.indexOf('&SUBKEY=') != -1)
    var searchPattern = /&SUBKEY=([^&]+)/;
else if (location.search.indexOf('?SEARCH=') != -1)
    var searchPattern = /&SEARCH=([^&]+)/;
else if (location.search.indexOf('searcharg=') != -1)
    var searchPattern = /searcharg=([^&]+)/;
else return;
var searchTextArray = searchPattern.exec(document.location.search);
var searchText = searchTextArray[1].replace(/\+/g," ");
var searchText1 = strip_surrounding_parens(decodeURIComponent(searchText));
o.value = searchText1;
return;
}
function setEndDateTime(newEndDate)
{
    document.webbookform.webbook_end_n_Month.value = newEndDate.substr(0,2);
    document.webbookform.webbook_end_n_Day.value = newEndDate.substr(2,2);
    document.webbookform.webbook_end_n_Year.value = newEndDate.substr(4,4);

    if (document.webbookform.webbook_end_n_Hour)
    {
        document.webbookform.webbook_end_n_Hour.value = newEndDate.substr(8,2);
        document.webbookform.webbook_end_n_Min.value = newEndDate.substr(10,2);
        document.webbookform.webbook_end_n_AMPM.value = newEndDate.substr(12,2);
    }

    if (document.webbookform.webbook_duration_Hour)
    {
        document.webbookform.webbook_duration_Hour.value = newEndDate.substr(8,2);
        document.webbookform.webbook_duration_Min.value = newEndDate.substr(10,2);
        document.webbookform.webbook_duration_AMPM.value = newEndDate.substr(12,2);
    }

    if (document.webbookform.webbook_end_d_Month)
    {
        document.webbookform.webbook_end_d_Month.value = newEndDate.substr(0,2);
        document.webbookform.webbook_end_d_Day.value = newEndDate.substr(2,2);
        document.webbookform.webbook_end_d_Year.value = newEndDate.substr(4,4);

        document.webbookform.webbook_end_w_Month.value = newEndDate.substr(0,2);
        document.webbookform.webbook_end_w_Day.value = newEndDate.substr(2,2);
        document.webbookform.webbook_end_w_Year.value = newEndDate.substr(4,4);

        document.webbookform.webbook_end_m_Month.value = newEndDate.substr(0,2);
        document.webbookform.webbook_end_m_Day.value = newEndDate.substr(2,2);
        document.webbookform.webbook_end_m_Year.value = newEndDate.substr(4,4);
    }
}

/*
 * set webbook end date/time and an item recnum
 * Created via c1184970.
 */
function setEndDateTimeAndRecnum(newEndDate, newItemnum)
{
setEndDateTime(newEndDate);

if (document.webbookform.webbook_itemnum)
	{
	document.webbookform.webbook_itemnum.value = newItemnum;
	}
}

/*
 * get the form containing the hidden "iiiFormHandle_NNN" field
 */
function getFormHandleForm(seq)
{
var name = 'iiiFormHandle_' + seq;
var obj = getObj(name);
return obj.form;
}
/*
 * supports mylist
 */
function toggleCreateList() {
    if (document.newlistForm)
    {
        var list = document.newlistForm.listname;
        var listvalue = list.options[list.selectedIndex].value;
        var newlist = getObj('newlist');

        if (listvalue == '-1')
            newlist.style.display = 'inline';
        else
            newlist.style.display = 'none';
    }
}
function onClickSubmitCheckedList( current_form, old_URL, action, value, listNum )
{
    var i;
    var n;
    var list_args = "";
    if (listNum > 0)
    	list_args = "&listNum=" + listNum;

    new_URL = old_URL + "?" + action + "=" + value + list_args;
    for (i = 0; i < current_form.elements.length; i++ )
        {
        if( current_form.elements[ i ].type != "checkbox" )
                continue;
        if (! current_form.elements[ i ].checked )
            continue;
        element_name = current_form.elements[ i ].name;
        element_value = current_form.elements[ i ].value;
        new_URL = new_URL + "&" + element_name + "=1";
        }
    replace_or_redraw( new_URL );
    return false;
}
function save_to_mylist() {
    obj = getObj('save_func');
    obj.value = 'save_to_mylist';
    obj.form.submit();
}
function toggle_checkboxes(setAll)
{
    for (i = 0; i < document.forms.length; i++)
    {
        for (j = 0; j < document.forms[i].elements.length; j++)
        {
            element = document.forms[i].elements[j];
            if (element.type == "checkbox")
                element.checked = setAll;
        }
    }
}
function submitHold(buttonname, buttonvalue)
{
    var oHiddenID;
    oHiddenID = document.getElementById("holdpagecmd");

    oHiddenID.name = buttonname;
    oHiddenID.value = buttonvalue;

    document.getElementById("hold_form").submit();
    return true;
}
function submitCheckout(buttonname, buttonvalue)
{
     var oHiddenID;
     oHiddenID = document.getElementById("checkoutpagecmd");

     oHiddenID.name = buttonname;
     oHiddenID.value = buttonvalue;

     //c29364j/c1365070 - prevent the patron from submitting twice
     var oButtonSpan;
     oButtonSpan = document.getElementById("checkoutbuttons0");
     if (oButtonSpan) oButtonSpan.style.display = "none";
     oButtonSpan = document.getElementById("checkoutbuttons1");
     if (oButtonSpan) oButtonSpan.style.display = "none";

     document.getElementById("checkout_form").submit();
     return true;
}
function submitBooking(buttonname, buttonvalue)
{
     var oHiddenID;
     oHiddenID = document.getElementById("bookingpagecmd");

     oHiddenID.name = buttonname;
     oHiddenID.value = buttonvalue;

     document.getElementById("booking_form").submit();
     return true;
}
