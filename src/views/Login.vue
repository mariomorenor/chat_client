<template>
  <div class="login px-4">
    <div>
      <div class="is-flex is-justify-content-center is-flex-direction-column">
        <b-tag type="is-primary" class="welcome">Bienvenido!</b-tag>
        <p>Ingresa un nombre de usuario</p>
      </div>
      <div class="card-form mt-5">
        <b-field label="Nickname" label-position="on-border">
          <b-input
            placeholder="Ingresa un nombre cool!"
            @keypress.enter.native="login()"
            v-model="nickname"
          ></b-input>
        </b-field>
        <b-field label="Crear Sala" class="mb-0" label-position="on-border">
          <b-input
            placeholder="Puedes dejar en blanco"
            @keypress.enter.native="login()"
            v-model="nueva_sala"
          ></b-input>
        </b-field>
        <template v-if="(salas_disponibles.length > 0) & (nueva_sala == '')">
          <span class="">o</span>
          <b-field label="Unirse a una Sala" label-position="on-border">
            <b-select v-model="sala_elegida">
              <option
                v-for="sala in salas_disponibles"
                :key="sala.id"
                :value="sala"
              >
                {{ sala }}
              </option>
            </b-select>
          </b-field>
        </template>

        <div class="is-flex is-justify-content-center mt-4">
          <b-button
            :disabled="!nickname"
            @click="login()"
            type="is-info"
            size="is-small"
            >Ingresar</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      sala_elegida: "",
      salas_disponibles: ["General"],
      nueva_sala: "",
    };
  },
  mounted() {
    // Por defecto siempre toma la primer sala
    this.sala_elegida = this.salas_disponibles[0];

    // Se obtiene datos de la sala y usuario
    let user = localStorage.getItem("user");
    let sala = localStorage.getItem("sala");
    
    // Si existe datos del Usuario, se redirecciona a la vista Home
    if (localStorage.getItem("user")) {
      this.$router.replace({
        name: "Home",
        params: {
          user,
          sala,
        },
      });
    }
  },
  methods: {
    login() {
      // Si no existe datos del usuario, no permite loguear
      if (this.nickname == "") return;

      // Se obtiene el nombre de la sala, ya sea si se crea una nueva o por defecto "General"
      let sala = this.nueva_sala != "" ? this.nueva_sala : this.sala_elegida;

      // Se guarda los datos de la Sala y Usuario
      localStorage.setItem("user", this.nickname);
      localStorage.setItem("room", sala);

      // Redirección a la vista Home
      this.$router.replace({
        name: "Home",
        params: {
          sala,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5%;
  flex-direction: column;
  & .welcome {
    font-size: 25px;
  }

  & > div {
    box-shadow: -1px 6px 13px 3px rgba(0, 0, 0, 0.56);
    -webkit-box-shadow: -1px 6px 13px 3px rgba(0, 0, 0, 0.56);
    -moz-box-shadow: -1px 6px 13px 3px rgba(0, 0, 0, 0.56);
    padding: 2rem;
    border-radius: 0.7rem;
  }
}
</style>
