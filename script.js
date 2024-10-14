// class BaseDeDatosProductos {
//   constructor() {
//     this.productos = []
//     this.cargarRegistros()
//   }

//   async cargarRegistros() {
//     const resultado = await fetch("./JSON/productos.JSON")
//     this.productos = await resultado.JSON()
//     cargarProductos(this.productos)

//   }
// }



// function cargarProductos(productos) {


// }

AOS.init();

const buttonx = document.getElementById("x");
const blureado = document.querySelector(".blureado");
const popup = document.querySelector(".popupContainer");

function popUp() {
  popup.style.top = "50px";
  blureado.classList.add("blur");
}

buttonx.addEventListener("click", () => {
  blureado.classList.toggle("blur");
  popup.style.transform = "translateX(-50%) translateY(-100vh)";
});

const irArriba = document.querySelector(".irArriba");
const footer = document.querySelector("footer");

let lastScrollY = window.scrollY;
let initialScrollDownY = 0;
let scrolledUp = false;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
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

  const footerRect = footer.getBoundingClientRect();
  const buttonRect = irArriba.getBoundingClientRect();

  if (footerRect.top < window.innerHeight) {
    irArriba.style.position = "absolute";
    irArriba.style.top = `${
      window.scrollY + footerRect.top - buttonRect.height - 20
    }px`;
  } else {
    irArriba.style.position = "fixed";
    irArriba.style.top = "85%";
  }

  lastScrollY = currentScrollY;
});

irArriba.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

let intro = document.querySelector(".intro");
let logo = document.querySelector(".logoHeader");
let logoSpan = document.querySelectorAll(".logo");

function animacionInicial() {
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
}

window.addEventListener("DOMContentLoaded", () => {
  animacionInicial();
  setTimeout(() => {
    popUp();
  }, 5000);
});

const menu = document.querySelector(".menuContainer");
const navMenu = document.querySelector(".navMenu");
const opcionMenu = document.querySelectorAll(".opcionMenu");
const blureado2 = document.querySelector(".blureado2");
const blureado3 = document.querySelector(".blureado3");
var isSmallScreen = window.innerWidth <= 737;

menu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menu.classList.toggle("opacity");
  if (isSmallScreen) {
    blureado2.classList.toggle("blur");
    blureado3.classList.toggle("blur");
  }
});

opcionMenu.forEach((opcion) => {
  opcion.addEventListener("click", () => {
    navMenu.classList.remove("show");
    if (isSmallScreen) {
      blureado2.classList.toggle("blur");
      blureado3.classList.toggle("blur");
    }
  });
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

class Producto {
  constructor(id, nombre, precio, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

class BaseDeDatos {
  constructor() {
    this.productos = [];

    this.agregarRegistro(1, "Cuadril", 500, "Alimentos", "carne1.png");
    this.agregarRegistro(2, "Ojo de bife", 500, "Alimentos", "carne2.png");
    this.agregarRegistro(3, "Bondiola", 500, "Alimentos", "carne3.png");
    this.agregarRegistro(4, "Nalga", 500, "Alimentos", "carne4.png");
  }

  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  traerRegistros() {
    return this.productos;
  }

  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  registroPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

    this.carrito = carritoStorage || [];
    this.total = 0;
    this.cantidadProductos = 0;

    this.listar();
  }

  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);

    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      productoEnCarrito.cantidad += 1;
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();
  }

  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);

    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      this.carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();
  }

  listar() {
    this.total = 0;
    this.cantidadProductos = 0;
    carritoListar.innerHTML = "";

    for (const producto of this.carrito) {
      carritoListar.innerHTML += `
        <div class="productoCarrito">
          <img src="./assets/img/${producto.imagen}" />
          <div class="dataCarrito">
            <p class="cNombre">${producto.nombre}</p>
            <div class="dataCarrito2">
              <p class="cCantidad">x u. ${producto.cantidad}</p>
              <p class="cPrecio">$${producto.precio}</p>
            </div>
            <a href="#" class="btnQuitar" data-id="${producto.id}">
              <i class="fa-solid fa-square-minus"></i>
            </a>
            <a href="#" class="btnAgregar" data-id="${producto.id}">
              <i class="fa-solid fa-square-plus"></i>
            </a>
          </div>
        </div>
        <div class="line"></div>
        `;
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }

    const btnQuitar = document.querySelectorAll(".btnQuitar");

    for (const boton of btnQuitar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        const idProducto = Number(boton.dataset.id);
        this.quitar(idProducto);
      });
    }

    const botonesAgregar = document.querySelectorAll(".btnAgregar");

    for (const boton of botonesAgregar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        const idProducto = Number(boton.dataset.id);
        const producto = bd.registroPorId(idProducto);
        console.log(producto);
        carrito.agregar(producto);

        Toastify({
          text: `${producto.nombre} fue agregado al carrito`,
          duration: 1500,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          offset: {
            x: 180,
          },
        }).showToast();
      });
    }

    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

const spanTotalCarrito = document.querySelector("#totalCarrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const botonCarrito = document.querySelector("#carrito");
const carritoListar = document.querySelector(".carritoListar");
const carritoListarContainer = document.querySelector(
  ".carritoListarContainer"
);

botonCarrito.addEventListener("click", () => {
  carritoListarContainer.classList.toggle("showCarrito");
  blureado2.classList.toggle("blur");
  blureado3.classList.toggle("blur");
  navMenu.classList.toggle("blur");
});

const bd = new BaseDeDatos();

const carrito = new Carrito();

const divProductos = document.querySelector("#productos");

function cargarProductos(productos) {
  divProductos.innerHTML = "";

  for (const producto of productos) {
    divProductos.innerHTML += `
      <div class="productoContainer" data-aos="fade-up">
        <div class="productoFondo">
          <img src="./assets/img/${producto.imagen}" />
        </div>
        <div class="data">
          <p class="pNombre">${producto.nombre}</p>
          <div class="precio">
            <p>$${producto.precio}</p>
            <a href="#" class="btnAgregarCarrito" data-id="${producto.id}">
              <i class="fa-solid fa-cart-plus"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");

  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const idProducto = Number(boton.dataset.id);
      const producto = bd.registroPorId(idProducto);
      carrito.agregar(producto);

      Toastify({
        text: `${producto.nombre} fue agregado al carrito`,
        duration: 1500,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });
  }
}

cargarProductos(bd.traerRegistros());
