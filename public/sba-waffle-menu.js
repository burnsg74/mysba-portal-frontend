document.addEventListener("DOMContentLoaded", function() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.addedNodes.length) {
        const buttonList = [
          { image: "mysba", label: "Home", link: "https://prod.mysba.ussba.io/" },
          { image: "certs", label: "Certifications", link: "https://certify.sba.gov/" },
          { image: "loans", label: "Loans", link: "https://www.sba.gov/funding-programs/loans" },
          { image: "disaster", label: "Disaster Assistance", link: "https://www.sba.gov/funding-programs/disaster-assistance" }
        ];

        let sbaWaffleMenu = document.getElementById("sbaWaffleMenu");
        if (sbaWaffleMenu) {

          while (sbaWaffleMenu.firstChild) {
            sbaWaffleMenu.removeChild(sbaWaffleMenu.firstChild);
          }

          let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "24");
          svg.setAttribute("height", "24");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.addEventListener("click", function() {
            let menuContainerDiv = document.createElement("div");
            menuContainerDiv.classList.add("sba-waffle-menu__container");

            let svgRect = svg.getBoundingClientRect();
            menuContainerDiv.style.left = (svgRect.right - 140) + "px";
            menuContainerDiv.style.top = (svgRect.bottom + 20 + pageYOffset) + "px";

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

            let headerText = document.createElement("span");
            headerText.innerHTML = "mySBA";

            let crossPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            crossPath.setAttribute("id", "Vector");
            crossPath.setAttribute("fill-rule", "evenodd");
            crossPath.setAttribute("clip-rule", "evenodd");
            crossPath.setAttribute("d", "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z");
            crossPath.setAttribute("fill", "#002E6D");
            crossPath.addEventListener("click", function() {
              if (menuContainerDiv) {
                menuContainerDiv.style.display = "none";
              }
            });

            g3.appendChild(crossPath);
            g2.appendChild(g3);
            g1.appendChild(g2);
            crossSvg.appendChild(g1);

            let headerDiv = document.createElement("div");
            headerDiv.classList.add("sba-waffle-menu__header");
            headerDiv.appendChild(headerText);
            headerDiv.appendChild(crossSvg);
            menuContainerDiv.appendChild(headerDiv);

            let bodyDiv = document.createElement("div");
            bodyDiv.classList.add("sba-waffle-menu__body");

            buttonList.forEach(item => {
              let buttonLink = document.createElement("a");
              buttonLink.classList.add("sba-waffle-menu__button-link");
              buttonLink.href = item.link
              let buttonGroupDiv = document.createElement("div");
              buttonGroupDiv.classList.add("sba-waffle-menu__button-group");

              let buttonImageDiv = document.createElement("div");
              buttonImageDiv.classList.add("sba-waffle-menu__button-image");
              buttonImageDiv.classList.add("sba-waffle-menu__button-image_" + item.image);
              buttonGroupDiv.appendChild(buttonImageDiv);

              let buttonTextDiv = document.createElement("div");
              buttonTextDiv.classList.add("sba-waffle-menu__button-text");
              buttonTextDiv.innerHTML = item.label;
              buttonGroupDiv.appendChild(buttonTextDiv);
              buttonLink.appendChild(buttonGroupDiv);

              bodyDiv.appendChild(buttonLink);
            });

            menuContainerDiv.appendChild(bodyDiv);
            document.body.appendChild(menuContainerDiv);
          });

          let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("id", "Vector");
          path.setAttribute("fill-rule", "evenodd");
          path.setAttribute("clip-rule", "evenodd");
          path.setAttribute("d", "M0.75 0.75V10.75H10.75V0.75H0.75ZM8.25 8.25H3.25V3.25H8.25V8.25ZM0.75 13.25V23.25H10.75V13.25H0.75ZM8.25 20.75H3.25V15.75H8.25V20.75ZM13.25 0.75V10.75H23.25V0.75H13.25ZM20.75 8.25H15.75V3.25H20.75V8.25ZM13.25 13.25V23.25H23.25V13.25H13.25ZM20.75 20.75H15.75V15.75H20.75V20.75Z");
          path.setAttribute("fill", "#007DBC");

          svg.appendChild(path);
          sbaWaffleMenu.appendChild(svg);

          observer.disconnect();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});