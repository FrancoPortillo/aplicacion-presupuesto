class Dato {
  static contadorDatos = 0;
  constructor(descripcion, valor) {
    this._idDato = ++Dato.contadorDatos;
    this._descripcion = descripcion;
    this._valor = valor;
  }
  get descripcion() {
    return this._descripcion;
  }
  get valor() {
    return this._valor;
  }
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  set valor(valor) {
    this._valor = valor;
  }
  get idDato() {
    return this._idDato;
  }
}

class Ingreso extends Dato {
  static contadorIngresos = 0;
  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._idIngreso = ++Ingreso.contadorIngresos;
  }
  get idIngreso() {
    return this._idIngreso;
  }
}

class Egreso extends Dato {
  static contadorEgresos = 0;
  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._idEgreso = ++Egreso.contadorEgresos;
  }
  get idEgreso() {
    return this._idEgreso;
  }
}

const ingresos = [
  new Ingreso("Salario", 2000.0),
  new Ingreso("Venta coche", 1500.0),
  new Ingreso("Freelance", 600.0),
];
const egresos = [
  new Egreso("Renta departamento", 900.0),
  new Egreso("Ropa", 400.0),
  new Egreso("Comida", 250.0),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgresos = 0;
  for (let egreso of egresos) {
    totalEgresos += egreso.valor;
  }
  return totalEgresos;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML =
    "-" + formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-AR", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${
              ingreso.idIngreso
            })"></ion-icon>
          </button>
        </div>
      </div>
    </div>
            `;
  return ingresoHTML;
};

const eliminarIngreso = (id) => {
  let indice = ingresos.findIndex((ingreso) => ingreso.idIngreso === id);
  ingresos.splice(indice, 1);
  cargarCabecero();
  cargarIngresos();
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
  <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(
          egreso.valor / totalEgresos()
        )}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${
              egreso.idEgreso
            })"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  
  `;
  return egresoHTML;
};

const eliminarEgreso = (id) => {
  let indice = egresos.findIndex((egreso) => egreso.idEgreso === id);
  egresos.splice(indice, 1);
  cargarCabecero();
  cargarEgresos();
};

let agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
      limpiarValores(descripcion, valor);
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
      limpiarValores(descripcion, valor);
    } else {
      alert("Debe seleccionar un tipo de dato ( Ingreso o Egreso )");
    }
  }
};

function limpiarValores(desc, valor) {
  desc.value = "";
  valor.value = "";
}
