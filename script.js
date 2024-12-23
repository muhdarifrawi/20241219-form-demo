let salutations = document.querySelectorAll("input[name='salutation']");
let username = document.querySelector("#username");
let items = document.querySelectorAll("input[name='items']");
let appleQty = document.querySelector("#apple-qty");
let bananaQty = document.querySelector("#banana-qty");
let cherryQty = document.querySelector("#cherry-qty");
let discounts = document.querySelectorAll("input[name='discounts']");
let comment = document.querySelector("#optional-comments");

let formOutput = document.querySelector("#form-output");

let appleCost = 2;
let bananaCost = 3.50;
let cherryCost = 4.50;

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let salutation = "";
  let itemCosts = 0;

  let appleTotal = 0;
  let bananaTotal = 0;
  let cherryTotal = 0;

  let appleChecked = false;
  let bananaChecked = false;
  let cherryChecked = false;

  for (each of salutations) {
    if (each.checked) {
      salutation = each.value.toUpperCase();
    }
  }

  let outputName = `${salutation} ${username.value.toUpperCase()}`;

  for (each of items) {
    if (each.checked) {
      if (each.value == "apple") {
        appleChecked = true;
        appleTotal = appleCost * parseFloat(appleQty.value);
        itemCosts += appleTotal;
      }
      if (each.value == "banana") {
        bananaChecked = true;
        bananaTotal = bananaCost * parseFloat(bananaQty.value);
        itemCosts += bananaTotal;
      }
      if (each.value == "cherry") {
        cherryChecked = true;
        cherryTotal = cherryCost * parseFloat(cherryQty.value);
        itemCosts += cherryTotal;
      }
    }
  }

  let gstDiscount = 0.09;
  let loyaltyDiscount = 0.05;

  let discountsTable = ``;

  for (each of discounts) {
    if (each.checked) {
      if (each.value == "gst-discount") {
        itemCosts = itemCosts - (itemCosts * gstDiscount);
        discountsTable += `<tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td>GST Discount</td>
          <td>${gstDiscount * 100}%</td>
        </tr>`;
      }
      if (each.value == "loyalty-discount") {
        itemCosts = itemCosts - (itemCosts * loyaltyDiscount);
        discountsTable += `<tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td>Loyalty Discount</td>
          <td>${loyaltyDiscount * 100}%</td>
        </tr>`;
      }
    }

  }

  console.log("item costs:", itemCosts);

  let invoiceOutput = `
    <h1>Invoice</h1>
    <p>Billed to: ${outputName}</p>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price per Item</th>
          <th scope="col">Total Cost</th>
        </tr>
      </thead>
      <tbody>
      ${parseFloat(appleQty.value) && appleChecked > 0 ? 
        `<tr>
          <th scope="row">1</th>
          <td>Apple</td>
          <td>${appleQty.value}</td>
          <td>${appleCost}</td>
          <td>${appleTotal}</td>
        </tr>`: ""
      }

      ${parseFloat(bananaQty.value) && bananaChecked > 0 ? 
        `<tr>
          <th scope="row">2</th>
          <td>Banana</td>
          <td>${bananaQty.value}</td>
          <td>${bananaCost}</td>
          <td>${bananaTotal}</td>
        </tr>`: ""
      }

      ${parseFloat(cherryQty.value) && cherryChecked > 0 ? 
        `<tr>
          <th scope="row">3</th>
          <td>Cherry</td>
          <td>${cherryQty.value}</td>
          <td>${cherryCost}</td>
          <td>${cherryTotal}</td>
        </tr>`: ""
      }
        
      ${discountsTable ? discountsTable : ""} 
        
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${itemCosts.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    ${comment.value ? 
      `<h2>Remarks</h2>
    <p>${comment.value}</p>`: ""
    }
    `

    formOutput.innerHTML = invoiceOutput;
});