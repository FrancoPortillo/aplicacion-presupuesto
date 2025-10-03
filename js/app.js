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

const ingresos = [];
const egresos = [];

let cargarApp = () => {
  cargarDatos();
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
  if (porcentajeEgreso === Infinity || isNaN(porcentajeEgreso)) {
    porcentajeEgreso = 0;
  }
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
  guardarDatos();
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
  guardarDatos();
  cargarCabecero();
  cargarEgresos();
};

let agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "" && +valor.value > 0) {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      guardarDatos();
      cargarCabecero();
      cargarIngresos();
      limpiarValores(descripcion, valor);
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      guardarDatos();
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


//Agregando localStorage
const guardarDatos = () => {
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("egresos", JSON.stringify(egresos));
  
};

const cargarDatos = () => {
  let datosIngresos = JSON.parse(localStorage.getItem("ingresos"));
  let datosEgresos = JSON.parse(localStorage.getItem("egresos"));
  if (datosIngresos) {
    for (let ingreso of datosIngresos) {
      ingresos.push(new Ingreso(ingreso._descripcion, ingreso._valor));
    }
  }
  if (datosEgresos) {
    for (let egreso of datosEgresos) {
      egresos.push(new Egreso(egreso._descripcion, egreso._valor));
    }
  }
}
