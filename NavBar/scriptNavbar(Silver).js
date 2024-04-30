/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  // Get the element with the ID "myTopnav"
  var x = document.getElementById("myTopnav");

  // Check if the class attribute of the element is "topnav"
  if (x.className === "topnav") {
    // If it is, add the "responsive" class
    x.className += " responsive";
  } else {
    // If it's not, set the class attribute to "topnav"
    x.className = "topnav";
  }
}

 document.addEventListener("DOMContentLoaded", function() {
    // Function to load external navbar content
    function loadExternalNavbar(url, targetElement) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    targetElement.innerHTML = xhr.responseText;
                } else {
                    console.error('Failed to load external navbar: ' + url);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    // Example usage: Load external navbar content into the element with ID "navbar-container"
    var navbarContainer = document.getElementById('navbar-container');
    loadExternalNavbar('NavBar/NavBar(Silver).html', navbarContainer);
});

document.addEventListener("DOMContentLoaded", function() {
	const buttons = document.querySelectorAll('.btn');
	const sideMenu = document.querySelector('.side-menu');
	const settingsButton = document.querySelector('.settings-button');
	const navButtons = document.querySelectorAll('.dropbtn');
	const allTextElements = document.querySelectorAll('p, h1, h2, h3, .topnav, .dropdown-content');

	let isMouseOverButton = false;
	let isMouseOverMenu = false;

	// Function to toggle folded class on side menu
	function toggleSettingsMenu() {
		sideMenu.classList.toggle('folded');
	}

	// Event listener to toggle menu on mouse enter and leave settings button
	settingsButton.addEventListener('mouseenter', function() {
		isMouseOverButton = true;
		toggleSettingsMenu();
	});

	settingsButton.addEventListener('mouseleave', function() {
		isMouseOverButton = false;
		setTimeout(checkMenuState, 200);
	});

	// Event listener to keep the menu open when hovering over the menu
	sideMenu.addEventListener('mouseenter', function() {
		isMouseOverMenu = true;
		sideMenu.classList.remove('folded');
	});

	sideMenu.addEventListener('mouseleave', function() {
		isMouseOverMenu = false;
		setTimeout(checkMenuState, 200);
	});

	// Function to check whether to keep the menu open or close it
	function checkMenuState() {
		if (!isMouseOverButton && !isMouseOverMenu) {
			sideMenu.classList.add('folded');
		}
	}

	// Additional code for settings functionality (updating styles)
	const backgroundColorInput = document.getElementById('backgroundColor');
	const textColorInput = document.getElementById('textColor');
	const fontFamilySelect = document.getElementById('fontFamily');
	const fontSizeInput = document.getElementById('fontSize');

	backgroundColorInput.addEventListener('input', updateBackgroundColor);
	textColorInput.addEventListener('input', updateTextColor);
	fontFamilySelect.addEventListener('change', updateFontFamily);
	fontSizeInput.addEventListener('input', updateFontSize);

	function updateBackgroundColor() {
		document.body.style.backgroundColor = backgroundColorInput.value;
		allTextElements.forEach(element => {
			element.style.backgroundColor = backgroundColorInput.value;
		});
	}

	function updateTextColor() {
		document.body.style.color = textColorInput.value;
		buttons.forEach(button => {
			button.style.color = textColorInput.value;
		});
		navButtons.forEach(button => {
			button.style.color = textColorInput.value;
		});
		allTextElements.forEach(element => {
			element.style.color = textColorInput.value;
		});
	}

	function updateFontFamily() {
		document.body.style.fontFamily = fontFamilySelect.value;
		buttons.forEach(button => {
			button.style.fontFamily = fontFamilySelect.value;
		});
		navButtons.forEach(button => {
			button.style.fontFamily = fontFamilySelect.value;
		});
		allTextElements.forEach(element => {
			element.style.fontFamily = fontFamilySelect.value;
		});
	}

	function updateFontSize() {
		buttons.forEach(button => {
			button.style.fontSize = fontSizeInput.value + 'px';
		});
		allTextElements.forEach(element => {
			element.style.fontSize = fontSizeInput.value + 'px';
		});
	}
});