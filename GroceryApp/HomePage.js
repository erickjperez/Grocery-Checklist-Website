var buttonPressed = document.querySelector("#button1");
var anchors = document.getElementsByTagName("a");


//adds listener to grocery stores so when hovered over they glow
for (var i = 0; i < anchors.length; i++)
{
	anchors[i].addEventListener("mouseover", function(){
		this.classList.toggle("selected");
	});
	anchors[i].addEventListener("mouseout", function(){
		this.classList.toggle("selected");
	});
}