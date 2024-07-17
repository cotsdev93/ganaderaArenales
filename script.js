document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const popup = document.querySelector(".popupContainer");
  const buttonx = document.getElementById("x");
  const blureado = document.querySelector(".blureado");

  function openPopup() {
    setTimeout(() => {
      popup.classList.add("top");
      blureado.classList.toggle("blur");
    }, 7000);
  }
  openPopup();

  buttonx.addEventListener("click", () => {
    popup.classList.remove("top");
    blureado.classList.toggle("blur");
  });

  const irArriba = document.querySelector(".irArriba");
  // const footer = document.querySelector("footer");

  let lastScrollY = window.scrollY;
  let initialScrollDownY = 0;
  let scrolledUp = false;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      console.log("aca")
      if (scrolledUp) {
        initialScrollDownY = currentScrollY;
        scrolledUp = false;
      }
      if (currentScrollY > initialScrollDownY + 300) {
        irArriba.classList.add("mostrar");
      }
    } else if (currentScrollY < lastScrollY) {
      irArriba.classList.remove("mostrar");
      scrolledUp = true;
    }

    // // Ajustar la posición del botón para que no se superponga con el footer
    // const footerRect = footer.getBoundingClientRect();
    // const buttonRect = irArriba.getBoundingClientRect();

    // if (footerRect.top < window.innerHeight) {
    //   irArriba.style.position = "absolute";
    //   irArriba.style.top = `${
    //     window.scrollY + footerRect.top - buttonRect.height - 20
    //   }px`;
    // } else {
    //   irArriba.style.position = "fixed";
    //   irArriba.style.top = "85%";
    // }

    lastScrollY = currentScrollY;
  });

  irArriba.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  let intro = document.querySelector(".intro");
  let logo = document.querySelector(".logoHeader");
  let logoSpan = document.querySelectorAll(".logo");

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add("active");
        }, (idx + 1) * 400);
      });

      setTimeout(() => {
        logoSpan.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove("active");
            span.classList.add("fade");
          }, (idx + 1) * 50);
        });
      }, 3000);

      setTimeout(() => {
        intro.style.top = "-100vh";
      }, 3200);
    });
  });

  const menu = document.querySelector(".menuContainer");
  const navMenu = document.querySelector(".navMenu");
  const opcionMenu1 = document.querySelector(".opcionMenu1");
  const opcionMenu2 = document.querySelector(".opcionMenu2");
  const opcionMenu3 = document.querySelector(".opcionMenu3");
  const opcionMenu4 = document.querySelector(".opcionMenu4");
  const blureado2 = document.querySelector(".blureado2");
  const blureado3 = document.querySelector(".blureado3");

  menu.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menu.classList.toggle("opacity");
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  });

  opcionMenu1.addEventListener("click", () => {
    navMenu.classList.remove("show");
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  });

  opcionMenu2.addEventListener("click", () => {
    navMenu.classList.remove("show");
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  });

  opcionMenu3.addEventListener("click", () => {
    navMenu.classList.remove("show");
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  });

  opcionMenu4.addEventListener("click", () => {
    navMenu.classList.remove("show");
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  });

  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");
  const slider = document.getElementById("slider");
  const sliderSection = document.querySelectorAll(".sliderSection");

  btnLeft.addEventListener("click", (e) => moveToLeft());
  btnRight.addEventListener("click", (e) => moveToRight());

  setTimeout(() => {
    setInterval(() => {
      moveToRight();
    }, 7000);
  }, 12000);

  let operacion = 0;
  let counter = 0;
  let widthImg = 100 / sliderSection.length;
  function moveToRight() {
    if (counter >= sliderSection.length - 1) {
      counter = 0;
      operacion = 0;
      slider.style.transform = `translate(-${operacion}%)`;
      return;
    }
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
  }

  function moveToLeft() {
    counter--;
    if (counter < 0) {
      counter = sliderSection.length - 1;
      operacion = widthImg * (sliderSection.length - 1);
      slider.style.transform = `translate(-${operacion}%)`;
      return;
    }
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
  }

  function initMap() {
    var isSmallScreen = window.innerWidth <= 737;
    var centerPosition = isSmallScreen
      ? { lat: 10, lng: 0 }
      : { lat: 20, lng: 0 };
    var zoomPosition = isSmallScreen ? 1 : 2;
    var options = {
      center: centerPosition,
      zoom: zoomPosition,
      // gestureHandling: "none",
      mapTypeControl: false,
      draggable: true,
      fullscreenControl: false,
      disableDefaultUI: true,
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#d1d1d1" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#ebebeb" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#a3a3a3" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative",
          elementType: "labels.text",
          stylers: [{ visibility: "off" }],
        },
      ],
    };
    const map = new google.maps.Map(document.getElementById("map"), options);

    function crearMarcador(lat, lng, iconUrl, title, infoContent) {
      const markerIcon = {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 45),
      };

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: title,
        icon: markerIcon,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent,
      });

      marker.addListener("mouseover", function () {
        infoWindow.open(map, marker);
      });

      marker.addListener("mouseout", function () {
        infoWindow.close();
      });

      return marker;
    }

    const china = crearMarcador(
      35.86166,
      104.195397,
      "assets/img/marker.png",
      "marcador",
      "China"
    );

    const usa = crearMarcador(
      37.09024,
      -95.712891,
      "assets/img/marker.png",
      "marcador",
      "USA"
    );

    const rusia = crearMarcador(
      55.75222,
      37.61556,
      "assets/img/marker.png",
      "marcador",
      "Rusia"
    );

    const venezuela = crearMarcador(
      7.48801,
      -65.87919,
      "assets/img/marker.png",
      "marcador",
      "Venezuela"
    );

    const colombia = crearMarcador(
      5.963889,
      -73.796387,
      "assets/img/marker.png",
      "marcador",
      "Colombia"
    );

    const brasil = crearMarcador(
      -6,
      -50.796387,
      "assets/img/marker.png",
      "marcador",
      "Brasil"
    );

    const sudafrica = crearMarcador(
      -32,
      25,
      "assets/img/marker.png",
      "marcador",
      "Sudafrica"
    );
  }
  initMap();

  const form = document.querySelector(".form");
  const input = document.querySelectorAll("input");
  form.addEventListener("submit", function (e) {
    // como se hace settimeout?
    setTimeout(vaciarCampos(), 3000);
  });

  function vaciarCampos() {
    setTimeout(() => {
      input.forEach(function (e) {
        e.value = "";
      });
    }, 2000);
  }

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Envío del formulario utilizando fetch
    fetch("https://formsubmit.co/cotsdev93@gmail.com", {
      method: "POST",
      body: new FormData(this),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Aquí puedes manejar la respuesta del servidor
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
