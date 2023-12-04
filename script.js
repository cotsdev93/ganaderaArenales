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

menu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menu.classList.toggle("opacity");
});

const popup = document.querySelector(".popupContainer");
const buttonx = document.getElementById("x");
const blureado = document.querySelector(".blureado");
function openPopup() {
  setTimeout(() => {
    popup.classList.add("top");
    blureado.classList.add("blur");
  }, 1000);
}
// openPopup();

buttonx.addEventListener("click", () => {
  popup.classList.remove("top");
  blureado.classList.add("desblureado");
});

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

  map = new google.maps.Map(document.getElementById("map"), options);

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

  // Uso de la función para crear el marcador de China
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

  
}
initMap();
