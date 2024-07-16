document.addEventListener("DOMContentLoaded", function() {
  console.log("The document has finished loading");
  // https://github.com/burnsg74/mysba-poc/blob/main/sba-waffle-menu.css
  const observer = new MutationObserver((mutationsList, observer) => {
    // Look through all mutations that just occurred
    for (let mutation of mutationsList) {
      // If the addedNodes property has one or more nodes
      if (mutation.addedNodes.length) {
        let sbaWaffleMenu = document.getElementById("sbaWaffleMenu");
        console.log('SVG',sbaWaffleMenu)
        if (sbaWaffleMenu) {

          while (sbaWaffleMenu.firstChild) {
            sbaWaffleMenu.removeChild(sbaWaffleMenu.firstChild);
          }

          // Create a new SVG element
          let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "24");
          svg.setAttribute("height", "24");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.addEventListener("click", function() {
            // Create a new div
            let newDiv = document.createElement('div');

            // Define style for div to float over other content
            newDiv.style.position = 'absolute';
            newDiv.style.zIndex = '999';
            newDiv.style.backgroundColor = 'white';
            newDiv.style.width = '140px';
            newDiv.style.height = '462px'
            newDiv.classList.add('sba-waffle-menu__container');

            // Get the position of the sbaWaffleMenu SVG
            let svgRect = svg.getBoundingClientRect();

            // Position the new div below and to the left of the SVG
            console.log(svgRect.right, newDiv.offsetWidth, pageXOffset)
            newDiv.style.left = (svgRect.right - 140) + 'px';
            newDiv.style.top = (svgRect.bottom + 20 + pageYOffset) + 'px';

            let crossSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            crossSvg.setAttribute("width", "14");
            crossSvg.setAttribute("height", "14");
            crossSvg.setAttribute("viewBox", "0 0 14 14");
            crossSvg.setAttribute("fill", "none");

            let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g1.setAttribute("id", "USWDS Components");
            let g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g2.setAttribute("id", "Icons");
            let g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g3.setAttribute("id", "Fill");

            let headerText = document.createElement('span')
            headerText.innerHTML = 'mySBA'

            let crossPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            crossPath.setAttribute("id", "Vector");
            crossPath.setAttribute("fill-rule", "evenodd");
            crossPath.setAttribute("clip-rule", "evenodd");
            crossPath.setAttribute("d", "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z");
            crossPath.setAttribute("fill", "#002E6D");
            crossPath.addEventListener('click', function() { // Added event listener
              if (newDiv) {
                newDiv.style.display = 'none'; // Hides the div
              }
            });

            g3.appendChild(crossPath);
            g2.appendChild(g3);
            g1.appendChild(g2);
            crossSvg.appendChild(g1);

// Assuming `newDiv` is the parent element where you want to append the crossSvg.

            let headerDiv = document.createElement('div');
            headerDiv.classList.add('sba-waffle-menu__header');
            headerDiv.appendChild(headerText);
            headerDiv.appendChild(crossSvg);
            // headerDiv.innerHTML = 'MySBA' + crossPath;
            newDiv.appendChild(headerDiv);

            // Append the new div to the body
            document.body.appendChild(newDiv);
          });

          // Create a new path element
          let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("id", "Vector");
          path.setAttribute("fill-rule", "evenodd");
          path.setAttribute("clip-rule", "evenodd");
          path.setAttribute("d", "M0.75 0.75V10.75H10.75V0.75H0.75ZM8.25 8.25H3.25V3.25H8.25V8.25ZM0.75 13.25V23.25H10.75V13.25H0.75ZM8.25 20.75H3.25V15.75H8.25V20.75ZM13.25 0.75V10.75H23.25V0.75H13.25ZM20.75 8.25H15.75V3.25H20.75V8.25ZM13.25 13.25V23.25H23.25V13.25H13.25ZM20.75 20.75H15.75V15.75H20.75V20.75Z");
          path.setAttribute("fill", "#007DBC");

          // Add the path to the SVG
          svg.appendChild(path);
          sbaWaffleMenu.appendChild(svg);

          console.log("SVG appended to #sbaWaffleMenu");
          // Stop observing
          observer.disconnect();
        }
      }
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
});