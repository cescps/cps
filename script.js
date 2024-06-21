const cet = document.querySelector('.cet .the-time');

  const animate = () => {
    const timeCET = moment().tz('Europe/Paris').format('HH:mm:ss');
    cet.innerHTML = `<span style="color: ${document.body.classList.contains('dark-mode') ? 'white' : 'black'};">${timeCET}</span>`;
  };

  setInterval(animate, 1000);
  animate();

  function toggleMode() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    animate();
  }

// // Select DOM elements
const showModalLinks = document.querySelectorAll(".underline-link");
const bottomSheets = document.querySelectorAll(".bottom-sheet");
const sheetOverlays = document.querySelectorAll(".sheet-overlay");
const dragIcons = document.querySelectorAll(".drag-icon");

// Global variables for tracking drag events
let isDragging = false, startY, startHeight, activeSheet;

// Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
const showBottomSheet = (sheet) => {
    sheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(sheet.querySelector(".content"), 50);
}

const updateSheetHeight = (content, height) => {
    content.style.height = `${height}vh`;
    content.parentElement.classList.toggle("fullscreen", height === 100);
}

// Hide the bottom sheet and show body vertical scrollbar
const hideBottomSheet = (sheet) => {
    sheet.classList.remove("show");
    document.body.style.overflowY = "auto";
}

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
const dragStart = (e, sheet) => {
    isDragging = true;
    activeSheet = sheet;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(activeSheet.querySelector(".content").style.height);
    activeSheet.classList.add("dragging");
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
    if(!isDragging || !activeSheet) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(activeSheet.querySelector(".content"), newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default 
// height based on the current height of the sheet content
const dragStop = () => {
    if(!isDragging || !activeSheet) return;
    isDragging = false;
    activeSheet.classList.remove("dragging");
    const sheetHeight = parseInt(activeSheet.querySelector(".content").style.height);
    sheetHeight < 25 ? hideBottomSheet(activeSheet) : sheetHeight > 75 ? updateSheetHeight(activeSheet.querySelector(".content"), 100) : updateSheetHeight(activeSheet.querySelector(".content"), 50);
    activeSheet = null;
}

dragIcons.forEach((dragIcon, index) => {
    dragIcon.addEventListener("mousedown", (e) => dragStart(e, bottomSheets[index]));
    dragIcon.addEventListener("touchstart", (e) => dragStart(e, bottomSheets[index]));
});

document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

sheetOverlays.forEach((sheetOverlay, index) => {
    sheetOverlay.addEventListener("click", () => hideBottomSheet(bottomSheets[index]));
});

showModalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        const sheetToShow = document.getElementById(target);
        if (sheetToShow) {
            showBottomSheet(sheetToShow);
        }
    });
});
 
