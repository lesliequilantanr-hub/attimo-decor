/* ════════════════════════════════════════════════════════════════
   productos.js — LOS DATOS DEL CATÁLOGO
   Aquí se edita todo: nombre del negocio, contacto, precios, medidas.
   No hace falta tocar el HTML. Guarda y recarga el navegador.

   precio: número (ej. 1500) o null → se muestra "Cotizar".
   medidas / material / cantidad: texto libre. "Por definir" = pendiente.
   imagenes: rutas dentro de App/assets/img/productos/<slug>/
   ════════════════════════════════════════════════════════════════ */

window.CATALOGO = {
  negocio: {
    nombre: "Attimo",
    lema: "Attimo Decor · Mobiliario y decoración para eventos",
    whatsapp: "528119028864",            // con lada de país 52, sin +
    telefono: "81 1902 8864",            // como se muestra en la página
    instagram: "",                       // ← cuando exista: "attimo.decor"
    correo: "",
    ciudad: "Monterrey, N.L.",
    moneda: "MXN",
  },

  eventos: ["Bodas", "Despedidas", "Cumpleaños", "XV años", "Baby shower"],

  productos: [
    {
      slug: "arco-entrada",
      nombre: "Arco de entrada",
      categoria: "Estructuras",
      resumen: "Arco blanco de gran formato para recibir a tus invitados.",
      descripcion:
        "Estructura en forma de arco, en acabado blanco liso, pensada para marcar la entrada al evento o como fondo de fotos. Se puede vestir con cortina de gasa, follaje colgante y flores, y combina con iluminación cálida para la noche.",
      precio: 5000,
      unidad: "por evento",
      medidas: "3 m de alto × 2.40 m de ancho",
      material: "Por definir",
      cantidad: "1 pieza",
      incluye: ["Montaje y desmontaje", "Cortina de gasa (opcional)"],
      eventos: ["Bodas", "XV años", "Despedidas"],
      imagenes: [
        "assets/img/productos/arco-entrada/arco-entrada-01.jpg",
        "assets/img/productos/arco-entrada/arco-entrada-02.jpg",
        "assets/img/productos/arco-entrada/arco-entrada-03.jpg",
      ],
    },
    {
      slug: "lamparas-mesa",
      nombre: "Lámparas para mesa",
      categoria: "Iluminación",
      resumen: "Lámparas decorativas inalámbricas con base.",
      descripcion:
        "Lámparas de mesa con pantalla acanalado y base dorada. Son lámparas inalámbricas que dan una luz cálida y crean una atmósfera cálida e intima en cada mesa",
      precio: 60,
      unidad: "por pieza",
      medidas: "Por definir",
      material: "",                 // vacío = no se muestra
      cantidad: "Sujeta a disponibilidad",
      incluye: ["Carga completa antes del evento"],
      eventos: ["Bodas", "Cumpleaños", "Despedidas", "XV años"],
      imagenes: [
        "assets/img/productos/lamparas-mesa/lamparas-mesa-01.jpg",
        "assets/img/productos/lamparas-mesa/lamparas-mesa-02.jpg",
        "assets/img/productos/lamparas-mesa/lamparas-mesa-04.jpg",
      ],
    },
    {
      slug: "mesa-recepcion",
      nombre: "Mesa de recepción",
      categoria: "Mobiliario",
      resumen: "Mesa redonda blanca de pedestal para libro de firmas o regalos.",
      descripcion:
        "Mesa redonda con base de pedestal en blanco. Ideal para la entrada: libro de firmas, fotos de la pareja, recuerdos o la mesa de regalos. Su forma limpia deja que la decoración sea la protagonista.",
      precio: 350,
      unidad: "por evento",
      opciones: ["Set de recepción: $450. Incluye mesa, caja para sobres, lámpara decorativa y marco para fotos."],
      medidas: "Por definir",
      material: "Por definir",
      cantidad: "1 pieza",
      incluye: [],
      eventos: ["Bodas", "Cumpleaños", "Baby shower", "XV años"],
      imagenes: ["assets/img/productos/mesa-recepcion/mesa-recepcion-01.jpg"],
    },
    {
      slug: "bases-florales",
      nombre: "Bases para decoración floral",
      categoria: "Decoración floral",
      resumen: "Bases blancas en distintas alturas para arreglos. Se rentan por pieza.",
      descripcion:
        "Pedestales blancos de diferentes alturas para levantar arreglos florales; renta las piezas que necesites. Funcionan para el pasillo de una ceremonia civil, la entrada o para enmarcar un altar, creando niveles y profundidad.",
      precio: 250,
      unidad: "por pieza",
      medidas: "Por definir",
      material: "Por definir",
      cantidad: "Por pieza (3 alturas disponibles)",
      incluye: [],
      eventos: ["Bodas", "XV años", "Baby shower"],
      imagenes: [
        "assets/img/productos/bases-florales/bases-florales-01.jpg",
        "assets/img/productos/bases-florales/bases-florales-02.jpg",
      ],
    },
    {
      slug: "bases-macetas",
      nombre: "Jarrón con base",
      categoria: "Decoración floral",
      resumen: "Pedestal blanco con jarrón para arreglos altos. También se renta la maceta sola.",
      descripcion:
        "Pedestal blanco con jarrón incluido, listo para recibir un arreglo floral alto. Da presencia a la entrada, al lado de un arco o junto a la mesa de novios.",
      precio: 500,
      unidad: "jarrón con base",
      opciones: ["Maceta sola: $350"],
      medidas: "Por definir",
      material: "Por definir",
      cantidad: "Por definir",
      incluye: ["Jarrón"],
      nota: "Arreglo floral no incluido.",
      eventos: ["Bodas", "Despedidas", "XV años"],
      imagenes: ["assets/img/productos/bases-macetas/bases-macetas-01.jpg"],
    },
    {
      slug: "tarima-novios",
      nombre: "Tarima para mesa de novios",
      categoria: "Estructuras",
      resumen: "Tarima blanca que eleva la mesa principal y la vuelve el centro.",
      descripcion:
        "Tarima en acabado blanco para levantar la mesa de novios o la mesa principal. Hace que todos los invitados los vean y combina perfecto con el arco como fondo.",
      precio: 3000,
      unidad: "por evento",
      medidas: "3.60 m × 3.60 m",
      material: "Por definir",
      cantidad: "1 pieza",
      incluye: ["Montaje y desmontaje"],
      eventos: ["Bodas", "XV años"],
      imagenes: ["assets/img/productos/tarima-novios/tarima-novios-01.jpg"],
    },
    {
      slug: "back-entelado",
      nombre: "Back entelado",
      categoria: "Estructuras",
      resumen: "Fondo forrado de tela, en el color que tú elijas.",
      descripcion:
        "Fondo de tela con caída y drapeados, ideal detrás de la mesa de novios, en la mesa de postres o como muro para fotos. Tú eliges el color de la tela para que combine con la decoración de tu evento.",
      precio: 2000,
      unidad: "por evento",
      medidas: "Por definir",
      material: "Estructura con tela drapeada",
      cantidad: "1 pieza",
      incluye: ["Tela en el color de tu preferencia"],
      eventos: ["Bodas", "XV años", "Cumpleaños", "Baby shower", "Despedidas"],
      imagenes: [
        "assets/img/productos/back-entelado/back-entelado-01.jpg",
        "assets/img/productos/back-entelado/back-entelado-02.jpg",
      ],
    },
  ],
};
