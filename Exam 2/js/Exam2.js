
function ListCatelog()
{
    var objRequest = new XMLHttpRequest();
    var url ="https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";


objRequest.onreadystatechange = function()
{
    if (objRequest.readyState == 4 && objRequest.status == 200)

{
    var output = JSON.parse(objRequest.responseText);
    GenerateOutput(output);
}
};

objRequest.open("GET", url, true);
objRequest.send();

function GenerateOutput(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
{
    displaytext += "<tr><td> "+"<br>"+ result.GetAllCategoriesResult[count].CID + "</td><td>"+ "<tr><td> "+ result.GetAllCategoriesResult[count].CName +"</td><td>" +"<tr><td> "+ result.GetAllCategoriesResult[count].CDescription+"</td><td>";
}
    document.getElementById("result").innerHTML = displaytext;
}
}

function AddCategory()
{
var objRequest = new XMLHttpRequest();
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";

var name = document.getElementById("catname").value;
var description = document.getElementById("catdes").value;

var newcat = '{"CName":"' + name + '","CDescription":"' + description +'"}';
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
    {
        var result = JSON.parse(objRequest.responseText);
        OperationResult(result);
    }
};

objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(newcat);


function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
    document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}
}



function UpdateDescription()
{
var objRequest = new XMLHttpRequest();
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";


var CatID = document.getElementById("catID").value;
var CatDes = document.getElementById("catdes2").value;

var updatecat='{"CID":"'+ CatID +'","CDescription":"'+ CatDes +'"}'; 


objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
    {
        var result = JSON.parse(objRequest.responseText);
        OperationResult(result);
    }
};

objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(updatecat);


function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
    document.getElementById("result3").innerHTML = "The operation was successful!";
    }
    else if (output.WasSuccessful == 0)
    {
        document.getElementById("result3").innerHTML = "Operation failed with an unspecified error" + "<br>" + output.Exception;
    }
    else if (output.WasSuccessful == -2)
    {
        document.getElementById("result3").innerHTML = "The data couldnt be deserialized" + "<br>" + output.Exception;
    }
    else if (output.WasSuccessful == -3)
    {
        document.getElementById("result3").innerHTML = "The record of Category ID couldnt be found" + "<br>" + output.Exception;
    }
}
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();  
    var url ="https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("deletecatid").value;


objRequest.onreadystatechange = function()
{
    if (objRequest.readyState == 4 && objRequest.status == 200)
    {
    var result = JSON.parse(objRequest.responseText);
    OperationResult(result);
    }
};

objRequest.open("GET", url, true);
var check = confirm("Are you sure you wish to delete this category?");
if (check == true)
{
objRequest.send();
}


function OperationResult(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
    document.getElementById("result4").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result4").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}
}



function MenuChoice()
{
    if (document.getElementById("menu").value == "Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add Product")
    {
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "visible";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value== "Change Description")
    {  
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "visible";
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value== "Delete Category")
    {  
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section4").style.visibility = "visible";
    document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value== "About Me")
    {  
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section5").style.visibility = "visible";
    }
    else
    {
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section5").style.visibility = "hidden";
    
    }
}
