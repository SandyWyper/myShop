# Issue

The idea is to navigate to a blank template page where I'll be able to display whatever item has been selected.
* click event on an item
* if item has class of 'item-link' 
* take 'id' from item clicked
* go to template html document 'product.html'
* fetch more info on the desired item using the id.

If you go to `function fetchThisItem` you will see that there's a call to the shopify api and `displayThisItem()` is run on success.  After that it goes a bit weird.  The console.log of the result doesn't expand in the console window, but i can still access it to get info.  See the console log for price.  But i can't getElementById() on ths new page....

Tried to make the changing of the page asycronous but not sure it has made any difference. 