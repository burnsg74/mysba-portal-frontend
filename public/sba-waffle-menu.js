class SbaWaffleMenu {
  constructor(sbaWaffleMenuEl) {
    this.sbaWaffleMenuEl = sbaWaffleMenuEl;
    this.isOpen = false;
    this.buttonList = [
      { image: "mysba", label: "Home", link: "https://my.sba.gov/dashboard" },
      { image: "certs", label: "Certifications", link: "https://certification.sba.gov/" },
      { image: "loans", label: "Loans", link: "https://lending.sba.gov/" },
      {
        image: "disaster",
        label: "Disaster Assistance",
        link: "https://lending.sba.gov/search-disaster",
      },
      {
        image: "learning",
        label: "Learning",
        link: "https://www.sba.gov/sba-learning-platform",
      },
    ];
    this.waffleMenuIconButtonPosition = { bottom: 0, right: 0 };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.svgContent = `<svg id="sbaWaffleMenuIcon" width="30" height="31" viewBox="0 0 30 31" fill="#007DBC" xmlns="http://www.w3.org/2000/svg"><g id="Waffle Icon"><g id="USWDS Components"><path id="Union" fill-rule="evenodd" clip-rule="evenodd" d="M4.00001 10.5423V4H10.2578V10.5423H4.00001ZM5.56447 8.90671H8.69339V5.63557H5.56447V8.90671ZM4.00001 12.2799V12.1779H10.2578V18.7201H10.2578V18.8222H4V12.2799H4.00001ZM8.69338 17.0846H5.56447V13.9155H8.69338V17.0846ZM11.8223 10.5423V4H11.9198H18.0801H18.1776V10.5423H18.0801H11.9198H11.8223ZM13.4843 8.90671H16.5157V5.63557H13.4843V8.90671ZM11.8223 12.2799V12.1779H11.9198H18.0801H18.1776V12.28V18.7201V18.8223H11.9198V18.8222H11.8223V12.2799H11.8223ZM16.5157 17.0846H13.4843V13.9156H16.5157V17.0846ZM19.7421 10.5423V4H25.9999V10.5423H19.7421ZM21.3066 8.90671H24.4355V5.63557H21.3066V8.90671ZM19.7421 12.28V12.1779H25.9999V12.28V18.7201V18.8223H19.7421V18.7201V12.28ZM21.3066 17.0846H24.4355V13.9156H21.3066V17.0846ZM11.9198 27.0001V27.0002H18.1776V20.4579H18.0801V20.4578H11.8223V27.0001H11.9198ZM16.5157 22.0935H13.4843V25.3645H16.5157V22.0935ZM19.7421 20.4579V27.0002H25.9999V20.4579H19.7421ZM24.4355 25.3646H21.3066V22.0935H24.4355V25.3646ZM4 27.0001V20.4578H10.2578V27.0001H4ZM5.56446 25.3645H8.69338V22.0933H5.56446V25.3645Z" fill="#007DBC"/> </g> </g> </svg> `;
  }
  renderMenuIcon() {
    if (window.document.getElementById("sbaWaffleMenuIcon")) {
      console.log("Already rendered");
      return;
    }

    let sbaWaffleMenu = this.sbaWaffleMenuEl;
    let waffleMenuIconButton = document.createElement("button");

    waffleMenuIconButton.innerHTML = this.svgContent;
    waffleMenuIconButton.classList.add("sba-waffle-menu-icon__button");
    waffleMenuIconButton.addEventListener("click", this.toggleMenu.bind(this));
    sbaWaffleMenu.appendChild(waffleMenuIconButton);

    let rect = waffleMenuIconButton.getBoundingClientRect();
    console.log("WM Rect", rect.right, rect);
    this.waffleMenuIconButtonPosition = {
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
    };
  }

  renderMenu() {
    if (window.document.getElementById("menuContainerDiv")) {
      console.log("menuContainerDiv Already rendered");
      return;
    }

    // Event Listener to handle closing the menu if user clicks outside the menu.
    document.addEventListener("click", this.handleClickOutside, true);

    let menuContainerDiv = document.createElement("div");
    menuContainerDiv.id = "menuContainerDiv";
    menuContainerDiv.classList.add("sba-waffle-menu__container");

    let headerDiv = document.createElement("div");
    headerDiv.classList.add("sba-waffle-menu__header");
    let headerText = document.createElement("span");
    headerText.innerHTML = "MySBA";
    headerDiv.appendChild(headerText);

    let waffleMenuCloseButton = document.createElement("button");
    let waffleMenuCloseIcon = document.createElement("img");
    waffleMenuCloseIcon.src = "/sba-waffle-menu-close.svg";
    waffleMenuCloseButton.appendChild(waffleMenuCloseIcon);
    waffleMenuCloseButton.classList.add("sba-waffle-menu-icon__button");
    waffleMenuCloseButton.addEventListener("click", this.toggleMenu.bind(this));
    headerDiv.appendChild(waffleMenuCloseButton);

    menuContainerDiv.appendChild(headerDiv);

    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("sba-waffle-menu__body");

    this.buttonList.forEach(item => {
      let buttonLink = document.createElement("a");
      buttonLink.classList.add("sba-waffle-menu__button-link");
      buttonLink.href = item.link;
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

    const rightPosition = window.innerWidth - this.waffleMenuIconButtonPosition.right;
    console.log(rightPosition);
    menuContainerDiv.style.right = `${rightPosition}px`;
    menuContainerDiv.style.top = `${this.waffleMenuIconButtonPosition.bottom + 20}px`;

    document.body.appendChild(menuContainerDiv);
  }

  handleClickOutside(event) {
    const menuContainerDiv = document.getElementById("menuContainerDiv");
    if (!menuContainerDiv.contains(event.target) && this.isOpen) {
      this.isOpen = false;
      let waffleMenuIcon = window.document.getElementById("sbaWaffleMenuIcon");
      const paths = waffleMenuIcon.querySelectorAll("path");
      paths.forEach(path => {
        path.setAttribute("fill", "#007DBC"); // Change to a different color
      });

      document.removeEventListener("click", this.handleClickOutside, true);
      this.removeMenu();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    let waffleMenuIcon = window.document.getElementById("sbaWaffleMenuIcon");
    const paths = waffleMenuIcon.querySelectorAll("path");

    if (this.isOpen) {
      paths.forEach(path => {
        path.setAttribute("fill", "#002E6D"); // Change to a different color
      });
      this.renderMenu();
    } else {
      paths.forEach(path => {
        path.setAttribute("fill", "#007DBC"); // Change to a different color
      });
      this.removeMenu();
    }
  }

  removeMenu() {
    const menuContainerDiv = document.getElementById("menuContainerDiv");
    if (menuContainerDiv) {
      menuContainerDiv.remove();
    }
  }
}
