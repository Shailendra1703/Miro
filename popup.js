// Select the dark mode toggle checkbox and the body element
const darkModeToggle = document.getElementById('darkModeToggle');
const bodyElement = document.body;

// Add an event listener to the checkbox for toggle changes
darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    bodyElement.classList.add('dark-mode');
  } else {
    bodyElement.classList.remove('dark-mode');
  }
});
