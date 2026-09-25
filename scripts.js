// Get menu button
const menuBtn = document.getElementById("menuBtn");

// Get navigation
const nav = document.getElementById("nav");


// Open / close mobile menu
menuBtn.addEventListener("click", function () {

    nav.classList.toggle("open");

});



const navLinks = document.querySelectorAll("#nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("open");

    });

});