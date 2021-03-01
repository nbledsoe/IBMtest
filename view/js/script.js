const addButton = document.querySelector("#submit")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const mobileInput = document.querySelector("#mobile")
const error = document.querySelector("#error")
const nameButton = document.querySelector("#nameColumn")
const tableBody = document.querySelector("#summaryTable tbody")
const letter = /^[A-Za-z ]+$/
var index = 1
var toggleSorting = 1
tableBody.querySelector("tr").style.background = "#f2f2f2";

error.innerHTML = ""

var contacts = [window.contactList[0]]

function validateInput(name,email,mobile)
{
       if(name.length===0)
       {
           error.innerHTML = "Name is required"
           return false
       }
       else if(mobile.length===0)
       {
       error.innerHTML = "Mobile Number is required"
       return false
       }
       else if(email.length===0)
       {
       error.innerHTML = "Email is required"
       return false
       }
       else if(name.length>20)
       {
       error.innerHTML = "Name should contain 20 or less characters."
       return false
       }
       else if(!name.match(letter))
       {
       error.innerHTML = "Name should conatin only letters and spaces."
       return false
       }
       else if(mobile.length!==10)
       {
       error.innerHTML = "Mobile should contain 10 digits."
       return false
       }
       else if(email.length>=40)
       {
       error.innerHTML = "Email should contain less than 40 characters in length."
       return false
        }
       else
       {
           error.innerHTML = ""
           return true;
       }
      
}

function createCell(value)
{
var node = document.createTextNode(value)
var cell = document.createElement("td")
cell.appendChild(node)
return cell;
}
function insertValid(name,email,mobile)
{
console.log(name,email,mobile)
var row = document.createElement("tr")
row.appendChild(createCell(name))
row.appendChild(createCell(mobile))
row.appendChild(createCell(email))
tableBody.appendChild(row)
index+=1
var details = {
   name: name,
   email: email,
   mobile: mobile}
contacts.push(details)
if(index%2!==0)
{
row.style.background = "#f2f2f2";  
}
nameInput.value = ""
emailInput.value = ""
mobileInput.value = ""
}

addButton.addEventListener("click", function() {
   if(!mobileInput.validity.valid)
   {
       error.innerHTML = "Mobile Number should contain numbers only"
   }
   else if(!emailInput.validity.valid)
   {
       error.innerHTML = "Enter a valid Email ID"
   }
   else{
   if(validateInput(nameInput.value,emailInput.value,mobileInput.value))
   {
       insertValid(nameInput.value,emailInput.value,mobileInput.value)
   }
   }
   })

nameButton.addEventListener("click",function(){
   console.log(contacts)
   var sorted_contacts = contacts.sort((a, b) => (a.name > b.name) ? toggleSorting : -1*toggleSorting)
   toggleSorting*=-1
   var trs = tableBody.querySelectorAll("tr")
   for(var i = 0;i<sorted_contacts.length;i++)
   {
   var tds = trs[i].querySelectorAll("td")
   tds[0].innerHTML = sorted_contacts[i].name
   tds[1].innerHTML = sorted_contacts[i].mobile
   tds[2].innerHTML = sorted_contacts[i].email
   }
   })