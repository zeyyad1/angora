
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var tbody = document.getElementById('tbody');
var addBtn = document.getElementById("addBtn");
var UpdateBtn = document.getElementById("UpdateBtn");
var productSearch=document.getElementById("productSearch");
var nameRegexError = document.getElementById("nameRegexError");
var nameRequiredError = document.getElementById("nameRequiredError");
var priceRegexError = document.getElementById("priceRegexError");
var priceRequiredError = document.getElementById("priceRequiredError");
var catRegexError = document.getElementById("catRegexError");
var catRequiredError=document.getElementById("catRequiredError");
//var globalIndex;
var productList;

//CONDITION THE LOCAL STORAGE SO WHEN I REFRESH, IT DOES'NT CLEAR THE DISPLAYED PRODUCTS
if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProducts(productList);
}
else {
  productList = [];
}





function addProducts() { 

if(requiredProductName() && requiredProductPrice() && requiredProductCat()){
  if(validatProductName() && validateProductPrice() && validateCategoryField()){
var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    img: productImage.files[0].name,
  };


  productList.push(product);
  displayProducts(productList);
  saveToLocal(productList);
  clearForm();
}
else{
  console.error("There Is A Validation Error")
}

  }

  

}

//function toDisplay

function displayProducts(pList, term='') {
  if(pList.length > 0){
    var box = "";
  for (var i = 0; i < pList.length; i++) {
    box += `<tr>
    <td>${i + 1}</td >
    <td><img src="./images/images/${pList[i].img}" alt=""></td>
  <td>
    <p>${term ? pList[i].name.toLowerCase().replace(term , `<span class='text-warning fw-bold'>${term}</span>`)    :pList[i].name}</p>
  </td>
  <td><p>${pList[i].price}Egp</p></td>
  <td> <p>${term ? pList[i].category.toLowerCase().replace(term , `<span class='text-warning fw-bold'>${term}</span>`)    :pList[i].category}</p></td>
  <td> <p>${term ? pList[i].description.toLowerCase().replace(term , `<span class='text-warning fw-bold'>${term}</span>`)    :pList[i].description}</p></td>
  <td>
    <span onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can text-danger mx-2"></i></span>
    <span onclick="setFormToUpdate(${i})"><i class="fa-solid fa-pen-to-square text-warning mxz-2"></i></span>
  </td>
  </tr> `
  };

  tbody.innerHTML = box;
  }
  else{
    tbody.innerHTML = "<tr><td colspan=7 class='text-center text-danger'>NO MATCH FOUND</td></tr>";
  }
}

//function to clear the form 


function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productImage.value = "";

}

//save to local storage

function saveToLocal(pList) {
  localStorage.setItem('productList', (JSON.stringify(pList)))
}


//ffunction to delete product

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProducts(productList);
saveToLocal(productList);
}




//function to set form to update

function setFormToUpdate(index) {
  
productName.value= productList[index].name;
productPrice.value= productList[index].price;
productCategory.value= productList[index].category;
productDescription.value= productList[index].description;




//2btns submit
  addBtn.classList.add("d-none");
  UpdateBtn.classList.remove("d-none");

//update global Index
//globalIndex=index;

//custom attribute
UpdateBtn.setAttribute("data-index",index);

}

function updateProduct(){
var index=UpdateBtn.getAttribute("data-index")
    productList[index].name=productName.value;
    productList[index].price=productPrice.value;
    productList[index].category=productCategory.value;
    productList[index].description=productDescription.value;

    displayProducts(productList);
    saveToLocal(productList);
    clearForm();
    
//2btns submit
  addBtn.classList.remove("d-none");
  UpdateBtn.classList.add("d-none");


}

function searchOnProducts(){
console.log(productSearch.value);
  var searchValue = productSearch.value.toLowerCase();
  var searchList=[];
for(var i=0; i < productList.length; i++){
if (
  productList[i].name.toLowerCase().includes(searchValue) ||
  productList[i].category.toLowerCase().includes(searchValue) ||
  productList[i].description.toLowerCase().includes(searchValue)

){

  searchList.push(productList[i]);

  console.log(searchList);
}

displayProducts(searchList, searchValue);
}


}


//Function For Product Name Regex

function validatProductName(){
  var regex = /^[A-Z][a-z]{3,}$/
  if(regex.test(productName.value)){
    nameRegexError.classList.replace("d-block", "d-none")
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    nameRequiredError.classList.replace("d-block", "d-none");
    return true;
  } 
  else{
    
      nameRegexError.classList.replace("d-none", "d-block");
         productName.classList.remove("is-valid")
    productName.classList.add("is-invalid")
    nameRequiredError.classList.replace("d-block", "d-none");
    return false;
  }
}

//empty Name Validation Function
function requiredProductName(){
  if(productName.value===""){
    nameRequiredError.classList.replace("d-none", "d-block");
    nameRegexError.classList.replace("d-block", "d-none");
   return false;
  }
    else{
    nameRequiredError.classList.replace("d-none", "d-block");
nameRegexError.classList.replace("d-block", "d-none");
return true;
  }
}

//Function For Product Price Regex
function validateProductPrice(){
  var regex = /^[0-9]{2,6}/
  if(regex.test(productPrice.value)){
    priceRegexError.classList.replace("d-block","d-none");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
     priceRequiredError.classList.replace("d-block", "d-none");
    return true;
  }
  else{
    priceRegexError.classList.replace("d-none","d-block");
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceRequiredError.classList.replace("d-block", "d-none");
    return false;
  }

}
 
//empty price validation range function
function requiredProductPrice(){
  if(productPrice.value === ""){
    priceRequiredError.classList.replace("d-none","d-block");
    priceRegexError.classList.replace("d-block","d-none");
    return false;
  }
    
  else{
    priceRequiredError.classList.replace("d-none","d-block");
    priceRegexError.classList.replace("d-block","d-none");
    return true;
  }
}

//function for category regex
function validateCategoryField(){
  var regex = /^[A-Z][a-z]{1,}$/ 
  if(regex.test(productCategory.value)){
  catRegexError.classList.replace("d-block","d-none");
  productCategory.classList.add("is-valid")
  productCategory.classList.remove("is-invalid");
  catRequiredError.classList.replace('d-block','d-none');
  return true;
  }
  else{
    catRegexError.classList.replace("d-none","d-block");
  productCategory.classList.remove("is-valid");
  productCategory.classList.add("is-invalid");
  catRequiredError.classList.replace("d-block",'d-none')
  return false;
  }

}
function requiredProductCat(){
if(productCategory.value===""){
  catRequiredError.classList.replace("d-none","d-block");
  catRegexError.classList.replace('d-block','d-none');
  return false;
}
else{
  catRequiredError.classList.replace("d-block",'d-none');
  catRegexError.classList.replace('d-none','d-block');
  return true;
}
 
}