<template>
  <div class="container-fluid mt-5 py-5 bg-light-yellow">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow-lg">
          <div class="card-body text-center">
            <h1 class="nk-error-head" id="err">¡Bienvenido a la ficha familia!</h1>
            <p class="lead nk-para">Esta es una aplicación para realizar encuestas a familias sobre sus condiciones de vida. Con esta herramienta podrás registrar los datos de las familias que visites, como el número de integrantes, el número de cuartos, el tipo de vivienda, etc. Estos datos nos ayudarán a conocer mejor la realidad de nuestra ciudad y a diseñar políticas públicas más efectivas.</p>
            <p class="lead nk-para">Para empezar, ir a las fichas técnicas</p>
            <div class="mt-4">
              <i class="bi bi-hand-index-thumb fs-2" style="animation: bounce 1s infinite;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Lógica del componente si es necesaria
}
</script>

<style>
/* Estilo para el sombreado */
.card {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); /* Cambia los valores para ajustar la sombra según tu preferencia */
}

/* Otros estilos permanecen igual */
#err {
  color: #eec64a;
  font-size: 105px; /* Disminuye el tamaño del texto ¡Bienvenido al Sistema! */
}

.nk-para {
  color: #857474;
  font-size: 24px; /* Ajusta el tamaño del texto Para empezar, ir a las fichas técnicas */
  font-weight: bold;
}

@media (max-width: 576px) {
  #err {
    font-size: 60px;
  }

  .nk-para {
    font-size: 18px;
  }
}

</style>
