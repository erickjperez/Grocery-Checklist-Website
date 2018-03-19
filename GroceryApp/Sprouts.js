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
var groceryList = [];
var groceryPrices = [];

updateData();
updateTotal();
updateList();

//updates local storage on browswer
function updateStorage()
{
    localStorage.setItem("sproutsGroceriesSaved", JSON.stringify(groceryList));
    localStorage.setItem("sproutsPricesSaved", JSON.stringify(groceryPrices));

}

/*
update local lists in js file
first tries to pull data from browser history
if none is available it creates empty array to be edited
*/
function updateData()
{
	var retrievedData1 = localStorage.getItem("sproutsGroceriesSaved");
    if (retrievedData1 != null)
    {
    	groceryList = JSON.parse(retrievedData1); 
    } else{
    	groceryList = [];
    }
    var retrievedData2 = localStorage.getItem("sproutsPricesSaved");
    if (retrievedData2 != null)
    {
    	groceryPrices = JSON.parse(retrievedData2); 
    } else{
    	groceryPrices = [];
    }
	/*
    var retrievedData1 = localStorage.getItem("sproutsGroceriesSaved");
    groceryList = JSON.parse(retrievedData1);
    var retrievedData2 = localStorage.getItem("sproutsPricesSaved");
    groceryPrices = JSON.parse(retrievedData2);    
    */
}

/*
sums up total at the bottom of table for groceries
*/
function updateTotal(){
	var total = 0;
	for(var i = 0; i < groceryPrices.length; i++) {
		total += Number(groceryPrices[i]);
	}

	totalPrice.textContent = "$" + total.toFixed(2);
}

/*
Updates webpage with current list
used when starting application and deleting from list
*/
function updateList(){
	realListUpdate.innerHTML = "";
	for(var i = 0; i < groceryPrices.length; i++)
	{
		realListUpdate.innerHTML +="<tr class = \"listItem\"><td align = \"center\">" + (i+1) + "</td><td align = \"center\">" + groceryList[i] + "</td><td align = \"center\">"+groceryPrices[i]+"</td></tr>";
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
	//console.log(listItems);
	for (var i = 0; i < listItems.length; i++)
	{
		//console.log(listItems[i]);
		listItems[i].addEventListener("click", function(){
			this.classList.toggle("clicked");
		})
	}
}


for(var i = 0; i < buttons.length; i++)
{
	buttons[i].addEventListener("mouseover", function(){
		this.classList.toggle("selected");
	})
	buttons[i].addEventListener("mouseout", function(){
		this.classList.toggle("selected");
	})
}

homePressed.addEventListener("mouseover", function(){
	this.classList.toggle("selected");
})
homePressed.addEventListener("mouseout", function(){
	this.classList.toggle("selected");
})


/*
when add more is pressed it will prompt user for grocery and price
then check if the fields are valid and then add it to the html and
update local storage and add a listener to it
*/
buttonPressed.addEventListener("click", function(){
	grocery1 = prompt("enter in new grocery");
	price = prompt("enter in a price");
	price = Number(price);
	if(price !== null && grocery1 !== "")
	{
		if (grocery1 == "")
		{
			console.log("grocery: " + grocery1);
		}
		
		console.log("price: " + price);
		groceryList.push(grocery1);
		groceryPrices.push(price.toFixed(2));
		if(grocery != "")
		{
			realListUpdate.innerHTML += "<tr class = \"listItem\"><td align = \"center\">" + groceryList.length + "</td><td align = \"center\">" + groceryList[groceryList.length -1] + "</td><td align = \"center\">$"+groceryPrices[groceryPrices.length -1]+"</td></tr>";
		}
		updateTotal();
	} else{
		alert("Unable to Add. Invalid Field");
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
	if (groceryPrices.length > 0)
	{
		var numDelete = prompt("Please Enter the Item Number You Would Like to Delete");
		if(numDelete > 0 && numDelete<=groceryPrices.length)
		{
			groceryPrices.splice(numDelete-1, 1);
			groceryList.splice(numDelete-1, 1);
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
