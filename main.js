window.addEventListener("load", function() {

	var radioButton = document.getElementsByName("size");
	var checkButton = document.getElementsByClassName("toping");

	var okButton = document.getElementById("ok");
	var previous = document.getElementById("previous");
	var confirm = document.getElementById("confirm");

	for (var i = 0; i < radioButton.length; ++i) {
		radioButton[i].addEventListener("click", size);
	}
	
	for (var j = 0; j < checkButton.length; ++j) {
		checkButton[j].addEventListener("click", toping);
	}

	okButton.addEventListener("click", confirmation);
	previous.addEventListener("click", closeConfirmation);
	confirm.addEventListener("click", sendData);

	user_info.userName.addEventListener("change", checkUserName);
	user_info.phone.addEventListener("change", checkPhone);
	user_info.city.addEventListener("change", checkCity);
	user_info.street.addEventListener("change", checkStreet);
	user_info.flat.addEventListener("change", checkFlat);
	user_info.house.addEventListener("change", checkHouse);
});

var pizzaSize = "";
var user_name = false;
var user_phone = false;
var user_city = false;
var user_street = false;
var user_house = false;
var user_flat = false;

function size(e) {	
	var priceBlock = document.getElementById("price");
	var element = e.target.value.split("+")[0];

	if (pizzaSize == "") {
		pizzaSize = element;
	} else {
		priceBlock.innerHTML = parseInt(priceBlock.innerHTML) - parseInt(pizzaSize);	
		pizzaSize = element;
	}

	priceBlock.innerHTML = parseInt(priceBlock.innerHTML) + parseInt(element);
}

function toping(e) {
	var priceBlock = document.getElementById("price");
	var imgToping = e.target.value.split("+")[0];
	var priceToping = e.target.value.split("+")[1];

	var image = "";

	for (var i = 0; i < document.images.length; i++) {
		if(document.images[i].getAttribute("src") == imgToping) {
			image = document.images[i];
		}	
	}

	if (e.target.checked) {
		priceBlock.innerHTML = parseInt(priceBlock.innerHTML) + parseInt(priceToping);
		image.style.display = "block";
	} else {
		priceBlock.innerHTML = parseInt(priceBlock.innerHTML) - parseInt(priceToping);
		image.style.display = "none";
	}
}

function formValidation(element, pattern, tooltip) {
	var flag = false;

	if (element.value == "") {
		tooltip.style.visibility = "hidden";
		element.style.border = "2px solid red";
	} else if(pattern.test(element.value)==true && element.value!="") {
		tooltip.style.visibility = "hidden";
		element.style.border = "";
		flag = true;
	} else if(pattern.test(element.value)==false && element.value!="") {
		tooltip.style.visibility = "visible";
		element.style.border = "";
	}

	return flag;
}

function checkUserName() {
	var pattern = /^[а-щю-яА-ЩЮ-ЯіІєЄЇї]+ [а-щю-яА-ЩЮ-ЯіІєЄЇї]+$/;
	var tooltip = document.getElementById("userName_rule");
	user_name = formValidation(this, pattern, tooltip);
}

function checkPhone() {
	var pattern = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
	var tooltip = document.getElementById("phone_rule");
	user_phone = formValidation(this, pattern, tooltip);
}

function checkCity() {
	var cities = document.getElementById("city").options;
	var tooltip = document.getElementById("city_rule");
	var isValid = false;
	for (var i = 0; i < cities.length; i++) {
		if(this.value == cities[i].value) {
			isValid = true;
			this.style.border = "";
			tooltip.style.visibility = "hidden";
			user_city = true;
			return;
		}
	}

	if (isValid == false) {
		if(this.value == "") {
			this.style.border = "2px solid red";
			tooltip.style.visibility = "hidden";
		} else {
			tooltip.style.visibility = "visible";
		}
		
	}
}

function checkStreet() {
	var pattern = /^[А-Яа-я]+$/;
	var tooltip = document.getElementById("street_rule");
	user_street = formValidation(this, pattern, tooltip);

}

function checkFlat() {
	var pattern = /^\d{1,3}$/;
	var tooltip = document.getElementById("flat_rule");
	user_flat = formValidation(this, pattern, tooltip);
}

function checkHouse() {
	var pattern = /^\d{1,3}[а-щю-яА-ЩЮ-ЯіІєЄЇї]?$/;
	var tooltip = document.getElementById("house_rule");
	user_house = formValidation(this, pattern, tooltip);
}

function confirmation() {
	var name = document.getElementById("name_order");
	var phone = document.getElementById("phone_order");
	var street = document.getElementById("street_order");
	var size = document.getElementById("size_order");
	var toping = document.getElementById("toping_order");
	var price = document.getElementById("price_order");

	var radioButton = document.getElementsByName("size");
	var pizzaSize = "";
	for (var i = 0; i < radioButton.length; ++i) {
		if (radioButton[i].checked) {
			pizzaSize = radioButton[i].value.split("+")[1];
		}
	}

	var checkButton = document.getElementsByClassName("toping");
	var pizzaToping = "";
	for (var j = 0; j < checkButton.length; ++j) {
		if(checkButton[j].checked) {
			pizzaToping += checkButton[j].value.split("+")[2] + " ";
		}
	}

	if((user_name && user_phone && user_city && user_street && user_house && user_flat) == true && pizzaSize != "" && pizzaToping != "") {
		name.innerHTML += "Ваше ім'я: " + document.getElementById("userName").value;
		phone.innerHTML += "Ваш номер телефону: " + document.getElementById("phone").value;
		street.innerHTML += "Ваша адреса: м." + document.getElementById("city_value").value + " вул." + document.getElementById("street").value + ", " + document.getElementById("house").value + " кв. " + document.getElementById("flat").value;
		size.innerHTML += "Розмір піци: " + pizzaSize;
		toping.innerHTML += "Начинки: " + pizzaToping;
		price.innerHTML += "Ваша ціна: " + document.getElementById("price").innerHTML;
		document.getElementById("summary").style.visibility = "visible";

		
		var clonedNode = document.getElementById("pizza").cloneNode(true);
		var showing = document.getElementById("summary").appendChild(clonedNode);
		showing.style.left = "685px";
		showing.style.top = "155px";

	} else { 
	 	alert("Не всі дані введені або деякі з них мають помилки!");
	}
}

function closeConfirmation(){
	var name = document.getElementById("name_order");
	var phone = document.getElementById("phone_order");
	var street = document.getElementById("street_order");
	var size = document.getElementById("size_order");
	var toping = document.getElementById("toping_order");
	var price = document.getElementById("price_order");

	name.innerHTML = "";
	phone.innerHTML = "";
	street.innerHTML = ""; 
	size.innerHTML = ""; 
	toping.innerHTML = ""; 
	
	price.innerHTML = ""; 
	document.getElementById("summary").style.visibility = "hidden";
	document.getElementById("summary").removeChild(document.getElementById("summary").lastChild); 
}


function sendData() {
	alert("Дані успішно відправлені!");
	window.location.reload();
}