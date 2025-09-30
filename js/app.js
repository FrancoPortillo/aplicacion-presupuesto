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
];
const egresos = [
  new Egreso("Renta departamento", 900.0),
  new Egreso("Ropa", 400.0),
];

let cargarApp = () => {
  cargarCabecero();
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
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
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
}
