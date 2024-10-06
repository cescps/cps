 function setupTabs() {
  // Add event listeners to all nav-items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Stop the page from jumping
      const tabId = this.textContent.trim().toLowerCase(); // Get the text and convert it to lowercase
      switchTab(tabId); // Call switchTab with the right ID
    });
  });
} 

function switchTab(tabId) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
      });
      // Show the selected tab
      document.getElementById(tabId).classList.remove('hidden');
      // Update navbar underline
      document.querySelectorAll('.nav-item').forEach(item => {
        item.style.textDecoration = item.getAttribute('href').substring(1) === tabId ? 'underline red' : 'none';
      });
    }
    // Initialize the default tab
    switchTab('inici');

function switchTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });

  // Show the selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
  } else {
    console.error('Tab not found:', tabId);
  }

  // Update active class for all nav-items
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.textContent.trim().toLowerCase() === tabId) {
      item.style.textDecoration = 'underline';
      item.style.textDecorationColor = 'red';
    } else {
      item.style.textDecoration = 'none';
    }
  }); 
}

// Initialize tabs and set the default view
document.addEventListener('DOMContentLoaded', function() {
  setupTabs(); // Setup tabs on page load
  switchTab('inici'); // Set 'inici' as the default tab
});

  function toggleMode() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  }

  // Change greeting every 3 seconds
  setInterval(changeGreeting, 3000);


 document.addEventListener('DOMContentLoaded', function() {
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          const allTabs = document.querySelectorAll('.tab-content');
          const targetTab = document.getElementById(this.getAttribute('data-target'));
          
          allTabs.forEach(tab => {
            tab.classList.add('hidden'); // Hide all tabs
          });
          targetTab.classList.remove('hidden'); // Show the clicked tab

          navItems.forEach(nav => {
            nav.classList.remove('active'); // Remove active from all nav items
          });
          this.classList.add('active'); // Add active to the clicked nav item
        });
      });
    });


 const greetings = ['Hola', 'Hello', 'Bonjour', 'Ciao', 'Hallo', 'Olá', 'Hej', 'Salut', 'Konnichiwa'];
    let index = 0;
    
    function changeGreeting() {
        const greetingElement = document.getElementById('greeting');
        greetingElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            index = (index + 1) % greetings.length;
            greetingElement.textContent = greetings[index];
            greetingElement.style.opacity = 1; // Fade in
        }, 1000); // Wait 1 second before changing text
    }
    
    setInterval(changeGreeting, 3000); // Change greeting every 3 seconds
