let salutations = document.querySelectorAll("input[name='salutation']");
let username = document.querySelector("#username");
let items = document.querySelectorAll("input[name='items']");
let appleQty = document.querySelector("#apple-qty");
let bananaQty = document.querySelector("#banana-qty");
let cherryQty = document.querySelector("#cherry-qty");
let discounts = document.querySelectorAll("input[name='discounts']");
let comment = document.querySelector("#optional-comments");

let formOutput = document.querySelector("#form-output");



let form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let salutation = "";
    let itemCosts = 0;

    for (each of salutations) {
        if (each.checked) {
            salutation = each.value.toUpperCase();
        }
    }

    let outputName = `${salutation} ${username.value.toUpperCase()}`;

    for (each of items) {
        if (each.checked) {
            if (each.value == "apple") {
                let appleTotal = 2 * parseFloat(appleQty.value);
                itemCosts += appleTotal;
            }
            if (each.value == "banana") {
                let bananaTotal = 3 * parseFloat(bananaQty.value);
                itemCosts += bananaTotal;
            }
            if (each.value == "cherry") {
                let cherryTotal = 4 * parseFloat(cherryQty.value);
                itemCosts += cherryTotal;
            }
        }
    }

    for (each of discounts) {
        if (each.checked) {
            if (each.value == "gst-discount") {
                itemCosts = itemCosts - (itemCosts * 0.09);
            }
            if (each.value == "loyalty-discount") {
                itemCosts = itemCosts - (itemCosts * 0.05);
            }
        }

    }

    console.log("item costs:", itemCosts);

    formOutput.innerHTML += outputName;
});