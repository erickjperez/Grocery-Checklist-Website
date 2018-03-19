var buttonPressed = document.querySelector("#button1");
var homePressed = document.querySelector("#homeBtn");
var deletePressed = document.querySelector("#deleteBtn");
var listUpdate = document.querySelector("#list1");
var realListUpdate = document.querySelector("#realList");
var totalPrice = document.querySelector("#totalPrice");
var listItems = document.getElementsByClassName("listItem");
var buttons = document.getElementsByTagName("button");
var grocery = listUpdate.textContent;
var grocery1 = "";
var price = "";
var groceryList1 = [];
var groceryPrices1 = [];

updateData();
updateTotal();
updateList();

//updates local storage on browswer
function updateStorage()
{
    localStorage.setItem("wholeGroceriesSaved", JSON.stringify(groceryList1));
    localStorage.setItem("wholePricesSaved", JSON.stringify(groceryPrices1));

}

/*
update local lists in js file
first tries to pull data from browser history
if none is available it creates empty array to be edited
*/
function updateData()
{
    var retrievedData3 = localStorage.getItem("wholeGroceriesSaved");
    if (retrievedData3 != null)
    {
    	groceryList1 = JSON.parse(retrievedData3); 
    } else{
    	groceryList1 = [];
    }
    var retrievedData4 = localStorage.getItem("wholePricesSaved");
    if (retrievedData4 != null)
    {
    	groceryPrices1 = JSON.parse(retrievedData4); 
    } else{
    	groceryPrices1 = [];
    }
       
}

/*
sums up total at the bottom of table for groceries
*/
function updateTotal(){
	var total = 0;
	for(var i = 0; i < groceryPrices1.length; i++) {
		total += Number(groceryPrices1[i]);
	}

	totalPrice.textContent = "$" + total.toFixed(2);
}

/*
Updates webpage with current list
used when starting application and deleting from list
*/
function updateList(){
	realListUpdate.innerHTML = "";
	for(var i = 0; i < groceryPrices1.length; i++)
	{
		realListUpdate.innerHTML +="<tr class = \"listItem\"><td align = \"center\">" + (i+1) + "</td><td align = \"center\">" + groceryList1[i] + "</td><td align = \"center\">"+groceryPrices1[i]+"</td></tr>";
	}
	addListener();
}

/*
adds listener to crossout grocery items
need because dynamically created elements need to
	have event listeners added
*/
function addListener(){
	listItems = document.getElementsByClassName("listItem");
	console.log(listItems);
	for (var i = 0; i < listItems.length; i++)
	{
		console.log(listItems[i]);
		listItems[i].addEventListener("click", function(){
			this.classList.toggle("clicked");
		})
	}
}

homePressed.addEventListener("mouseover", function(){
	this.classList.toggle("selected");
})
homePressed.addEventListener("mouseout", function(){
	this.classList.toggle("selected");
})

for(var i = 0; i < buttons.length; i++)
{
	buttons[i].addEventListener("mouseover", function(){
		this.classList.toggle("selected");
	})
	buttons[i].addEventListener("mouseout", function(){
		this.classList.toggle("selected");
	})
}

/*
when add more is pressed it will prompt user for grocery and price
then check if the fields are valid and then add it to the html and
update local storage and add a listener to it
*/
buttonPressed.addEventListener("click", function(){
	grocery1 = prompt("enter in new grocery");
	price = prompt("enter in a price");
	price = Number(price);
	if(price !== null && grocery1 != "")
	{
		groceryList1.push(grocery1);
		groceryPrices1.push(price.toFixed(2));
		if(grocery != "")
		{
			realListUpdate.innerHTML += "<tr class = \"listItem\"><td align = \"center\">" + groceryList1.length + "</td><td align = \"center\">" + groceryList1[groceryList1.length -1] + "</td><td align = \"center\">$"+groceryPrices1[groceryPrices1.length -1]+"</td></tr>";
		}
		updateTotal();
	} else{
		alert("Unable to Add. Invalid Field.");
	}
    updateStorage();
    updateData();
    addListener();
});

/*
when delete is pressed it will prompt user for an item to delete
it will check if it is valid then delete it and update the totals and update
the storage and list
*/
deletePressed.addEventListener("click", function(){
	if (groceryPrices1.length > 0)
	{
		var numDelete = prompt("Please Enter the Item Number You Would Like to Delete");
		if(numDelete > 0 && numDelete<=groceryPrices1.length)
		{
			groceryPrices1.splice(numDelete-1, 1);
			groceryList1.splice(numDelete-1, 1);
			updateList();
			updateTotal();
			updateStorage();
		} else{
			alert("Unable to Delete Item #"+numDelete);
		}
	} else{
		alert("List Empty. Nothing to Delete")
	}

});



