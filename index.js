const submit = document.getElementById('submit')
const link = document.getElementById('link')
const result = document.getElementById('result')
const toggleSwitch = document.querySelector("#toggleSwitch");
const switchStateText = document.querySelector("#switchStateText");
const localItemToggle = 'localItemToggle';

// Get the state of the local storage preference. if it doesnt exist, default to true
let isSmbToWindows = JSON.parse(localStorage.getItem(localItemToggle)) === null ?  true : JSON.parse(localStorage.getItem(localItemToggle));

// Run on load
setCheckboxAndText(isSmbToWindows)

function setCheckboxAndText(isSmbToWindows) {
  // Set to be opposite of isSmbToWindows since we want the defeault chackbox to NOT be checked
  toggleSwitch.checked = !isSmbToWindows
  switchStateText.textContent = isSmbToWindows ? "SMB to Windows" : "Windows to SMB";
}

function copiedTextMsg(text) {
	
	result.innerHTML=''
	result.innerHTML+= `<span class="copy">copied to clipboard: </span>${text}`
}

function smbToWindows(text) {
	return text
        .split("/")
        .join("\\$")
        .replace("smb:", "")
        .replace("Smb:", "")
        .replace("$", "")
        .replaceAll("\$", "")
}

function windowsToSmb(text) {
	return text
        .replace(/\\\\/g, 'smb://')
        .replace(/\\/g, '/')
}

function convertText(text, callback) {
/* 	text = "smb://10.100.10.5/baby-shark/Mili/HBHD Website/List of HBHD Requirements Outline V4 MN.docx" */

	text = isSmbToWindows ? smbToWindows(text) : windowsToSmb(text)
   navigator.clipboard.writeText(text);

  if (typeof callback == "function") {
  	callback(text)
  }
  
}

toggleSwitch.addEventListener("change", function() {
  isSmbToWindows = !isSmbToWindows;
  localStorage.setItem(localItemToggle, JSON.stringify(isSmbToWindows))
  setCheckboxAndText(isSmbToWindows)
});

submit.addEventListener('click', () => {
  if(link.value === '') {
    return
  }
	convertText(link.value, copiedTextMsg)
  // Reset input form
  link.value = ''
})



/* "smb://10.100.10.5/baby-shark/Mili/HBHD Website/List of HBHD Requirements Outline V4 MN.docx" */