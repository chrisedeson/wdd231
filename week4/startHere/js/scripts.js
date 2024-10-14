const currentUrl = window.location.href;

// Divide the url into two halves
const everything = currentUrl.split('?')

// Grab just the second half & Break the form name value pairs into an array
let formData = everything[1].split('&')

const showInfo = document.querySelector("#results")
showInfo.innerHTML = formData[0] + formData[1]