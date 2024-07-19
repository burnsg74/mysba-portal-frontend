class SbaWaffleMenu {
  constructor(sbaWaffleMenuEl) {
    this.sbaWaffleMenuEl = sbaWaffleMenuEl;
    this.isOpen = false;
    this.buttonList = [
      { image: "mysba", label: "Home", link: "https://prod.mysba.ussba.io/" },
      { image: "certs", label: "Certifications", link: "https://certify.sba.gov/" },
      { image: "loans", label: "Loans", link: "https://www.sba.gov/funding-programs/loans" },
      {
        image: "disaster",
        label: "Disaster Assistance",
        link: "https://www.sba.gov/funding-programs/disaster-assistance",
      },
    ];
    this.waffleMenuIconButtonPosition = { bottom: 0, right: 0 };
  }

  renderMenuIcon() {
    if(window.document.getElementById('sbaWaffleMenuIcon')) {
      console.log('Already rendered')
      return
    }

    let sbaWaffleMenu = this.sbaWaffleMenuEl;
    let waffleMenuIconButton = document.createElement("button");
    let waffleMenuIcon = document.createElement("img");
    waffleMenuIcon.id = "sbaWaffleMenuIcon";
    waffleMenuIcon.src = "/sba-waffle-menu-icon.svg";
    waffleMenuIconButton.appendChild(waffleMenuIcon);
    waffleMenuIconButton.classList.add("sba-waffle-menu-icon__button");
    waffleMenuIconButton.addEventListener("click", this.toggleMenu.bind(this));
    sbaWaffleMenu.appendChild(waffleMenuIconButton);

    let waffleMenuIconButtonWidth = waffleMenuIconButton.offsetWidth;
    let rect = waffleMenuIconButton.getBoundingClientRect();
    this.waffleMenuIconButtonPosition = {
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
    };
  }

  renderMenu() {
    if(window.document.getElementById('menuContainerDiv')) {
      console.log('menuContainerDiv Already rendered')
      return
    }

    let menuContainerDiv = document.createElement("div");
    menuContainerDiv.id = "menuContainerDiv";
    menuContainerDiv.classList.add("sba-waffle-menu__container");

    let headerDiv = document.createElement("div");
    headerDiv.classList.add("sba-waffle-menu__header");
    let headerText = document.createElement("span");
    headerText.innerHTML = "mySBA";
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

    let el = document.getElementById("sbaWaffleMenuIcon");
    console.log(el);
    let waffleMenuIconButtonWidth = el.offsetWidth;
    let rect = el.getBoundingClientRect();
    const distanceFromRight = window.innerWidth - rect.right;
    console.log(waffleMenuIconButtonWidth,distanceFromRight,rect)

    this.sbaWaffleMenuEl.appendChild(menuContainerDiv);
    menuContainerDiv.style.right = 0;
    menuContainerDiv.style.top = "50px";
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderMenu();
    } else {
      this.removeMenu();
    }
  }

  removeMenu() {
    const menuContainerDiv = document.getElementById("menuContainerDiv");
    if (menuContainerDiv) {
      menuContainerDiv.remove();
    }
  }
};