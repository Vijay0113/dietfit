
    //menu card
 // Shopping Cart 
 var shoppingCart = (function () {
      
      var cart = [];

      function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
      }

      function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
      }

      function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
      }

      if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
      }

      // Public methods and properties
      var obj = {};

      obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
          if (cart[item].name === name) {
            cart[item].count++;
            saveCart();
            return;
          }
        }
        var newItem = new Item(name, price, count);
        cart.push(newItem);
        saveCart();
      }

      obj.setCountForItem = function (name, count) {
        for (var i in cart) {
          if (cart[i].name === name) {
            cart[i].count = count;
            break;
          }
        }
        saveCart();
      };

      obj.removeItemFromCart = function (name) {
        for (var item in cart) {
          if (cart[item].name === name) {
            cart[item].count--;
            if (cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
        }
        saveCart();
      }

      obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
          if (cart[item].name === name) {
            cart.splice(item, 1);
            break;
          }
        }
        saveCart();
      }

      obj.clearCart = function () {
        cart = [];
        saveCart();
      }

      obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
          totalCount += cart[item].count;
        }
        return totalCount;
      }

      obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
          totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
      }

      obj.listCart = function () {
        var cartCopy = [];
        for (var i in cart) {
          var item = cart[i];
          var itemCopy = {};
          for (var p in item) {
            itemCopy[p] = item[p];
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy);
        }
        return cartCopy;
      }

      return obj;
    })();

    // Event handlers
$(document).ready(function () {
displayCart();


      // Add item from menu to cart
      $('.add-to-cart-btn').click(function(event) {
    event.preventDefault();
    console.log('Button clicked');
    var menuCard = $(this).closest('.menu_card');
    var name = menuCard.find('h2').text();
    var price = parseFloat(menuCard.find('h3').text().replace('₹', ''));
    console.log('Name:', name);
    console.log('Price:, price');
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
    });

      $('.clear-cart').click(function () {
        shoppingCart.clearCart();
        displayCart();
      });

      $('.show-cart').on("click", ".delete-item", function (event) {
        var name = $(this).data('name');
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
      })

      $('.show-cart').on("click", ".minus-item", function (event) {
        var name = $(this).data('name');
        shoppingCart.removeItemFromCart(name);
        displayCart();
      })

      $('.show-cart').on("click", ".plus-item", function (event) {
        var name = $(this).data('name')
        shoppingCart.addItemToCart(name);
        displayCart();
      })

      $('.show-cart').on("change", ".item-count", function (event) {
        var name = $(this).data('name');
        var count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
      });
    });


          // Event handler for showing the cart modal

  $('#cartBtn').click(function () {
    $('#cartModal').css('display', 'block');
  });

  // Event handler for closing the cart modal
  $('.close').click(function () {
    $('#cartModal').css('display', 'none');
  });

  

    
  function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";

  for (var i in cartArray) {
    output += "<tr>" +
      "<td>" + cartArray[i].name + "</td>" +
      "<td>(" + cartArray[i].price + ")</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
      //"<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
      " = " +
      "<td>₹" + cartArray[i].total + "</td>" +
      "</tr>";
  }

  $('.show-cart').html(output);
  $('.total-cart').html("₹" + shoppingCart.totalCart().toFixed(2)); // Change the currency symbol here
  $('.total-count').html(shoppingCart.totalCount());
}

// details for delivery

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
  }

  function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
  }

  function openDeliveryModal() {
    closeCartModal();
    document.getElementById('deliveryModal').style.display = 'block';
  }

  function closeDeliveryModal() {
    document.getElementById('deliveryModal').style.display = 'none';
  }

  function confirmOrder() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var specialRequest = document.getElementById('specialRequest').value;
    
    

    // Assuming a successful order, show the success message
    showSuccessMessage();
    

    // Simulate some additional actions (you can replace this with your actual logic)
    setTimeout(function() {
      closeDeliveryModal();
      resetForm();
    }, 3000);
  }
  

  function showSuccessMessage() {
    var successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    successMessage.innerHTML = 'Order placed successfully! Thank you for your order.';
  }

  function resetForm() {
    // Reset the form fields for the next order
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('specialRequest').value = '';

    // Hide the success message
    document.getElementById('successMessage').style.display = 'none';
  }




// login and signup
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = document.querySelector(".navbar .close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const mobileMenuItems = document.querySelectorAll(".navbar .links a");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => {
  navbarMenu.classList.remove("show-menu");
});

// Add click event listener to each menu item
mobileMenuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    navbarMenu.classList.remove("show-menu");
  });
});

// Additionally, close the mobile menu when the user clicks outside of it
document.addEventListener("click", (event) => {
  const isClickInsideMenu = navbarMenu.contains(event.target);
  const isClickOnHamburger = hamburgerBtn.contains(event.target);

  if (!isClickInsideMenu && !isClickOnHamburger) {
    navbarMenu.classList.remove("show-menu");
  }
});


// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
}); 

// end of all ready here 

// Simulated login function
         
function simulateLogin() {
                // Get values from the email and password fields
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;

                // Check if both fields are filled
                if (email && password) {
                    // Validate the email domain
                    if (email.endsWith('@gmail.com') || email.endsWith('@email.com')) {
                        // Validate the password
                        if (/[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                            // Simulate a successful login without revealing email and password
                            alert('Login successful');

                            // Reset the form after successful login
                            document.getElementById('loginform').reset();

                             // Close the login popup
                            document.body.classList.remove("show-popup");

                                                        
                        } else {
                            alert('Password must contain at least one uppercase letter, one number, and one symbol.');
                        }
                    } else {
                        alert('Only emails with domains "@gmail.com" or "@email.com" are allowed.');
                    }
                } else {
                    alert('Please enter both email and password.');
                }
                // Set focus on the password field to ensure it's visible after clicking login
                document.getElementById('password').focus();
            }


            // Simulated signup function

        function simulateSignup() {
    // Get values from the email and password fields in the signup form
    var signupEmail = document.getElementById('signup-email').value;
    var signupPassword = document.getElementById('signup-password').value;
    var policyCheckbox = document.getElementById('policy');

    // Check if all required fields are filled
    if (signupEmail && signupPassword && policyCheckbox.checked) {
        // Validate the email domain
        if (signupEmail.endsWith('@gmail.com') || signupEmail.endsWith('@email.com')) {
            // Validate the password
            if (/[A-Z]/.test(signupPassword) && /\d/.test(signupPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(signupPassword)) {
                // Simulate a successful signup without revealing email and password
                alert('Signup successful!\nYou are now registered.');

                // Reset the signup form after successful signup
                document.getElementById('signupform').reset();

                // Switch to the login section
                document.getElementById('login-link').click();


                // Prevent the default form submission
                return false;
            } else {
                alert('Password must contain at least one uppercase letter, one number, and one symbol.');
            }
        } else {
            alert('Only emails with domains "@gmail.com" or "@email.com" are allowed.');
        }
    } else {
        alert('Please enter your email, password, and agree to the terms.');
    }

    // Prevent the default form submission
    return false;
}

function showTerms() {
    var termsModal = document.querySelector('.terms-modal');
    termsModal.style.display = 'block';
}

function closeTermsModal() {
    var termsModal = document.querySelector('.terms-modal');
    termsModal.style.display = 'none';
}


//home slide

 // JavaScript for automatic sliding
 let currentIndex = 0;

function showNext() {
    const carousel = document.querySelector('.carousel-inner');
    const totalItems = document.querySelectorAll('.carousel-item').length;

    currentIndex = (currentIndex + 1) % totalItems;
    const translateValue = -100 * currentIndex + '%';
    
    // Move both image and text content
    carousel.style.transform = 'translateX(' + translateValue + ')';
}

setInterval(showNext, 5000); // Change slide every 5 seconds


// service feedback

function toggleAnswer(element) {
            var answer = element.nextElementSibling;
            answer.classList.toggle('show');
        }
// commend of feedback
const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})
//submit button
     function submitFeedback() {
        // You can add code here to send feedback to a server or perform other actions
        alert('Feedback submitted successfully!');
        document.getElementById('feedbackform').reset();
        }
