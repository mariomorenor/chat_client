<template>
  <div class="home py-5">
    <div class="is-flex px-5 is-flex-wrap-wrap is-justify-content-center">
      <div class="my-auto room_name">Sala: {{ room.toUpperCase() }}</div>
      <div class="user-container">
        <span v-for="user in users" :key="user.id">
          <b-tooltip position="is-bottom" :label="user.username">
            <img class="avatar" :src="user.avatar" alt="" />
          </b-tooltip>
        </span>
      </div>
      <div
        class="ml-auto mt-2 is-flex is-flex-wrap-wrap is-justify-content-center"
      >
        <div class="mb-1">
          <b-tag type="is-primary" size="is-small" class="mx-2">{{
            this.user
          }}</b-tag>
        </div>
        <div>
          <button
            @click="logout()"
            type="is-danger"
            size="is-small"
            icon-right="sign-out-alt"
            id="logout"
          >
            Salir <fa icon="sign-out-alt"></fa>
          </button>
        </div>
      </div>
    </div>
    <div id="chat_container" class="chat_container mt-4">
      <message-component
        :message="message"
        v-for="message in messages"
        :key="message.id"
      ></message-component>
    </div>
    <div class="text-control px-5">
      <b-field label="Escribe aquí..." label-position="on-border">
        <b-input
          @keypress.enter.native="sendMessage()"
          v-model="message_temp"
        ></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MessageComponent from "../components/MessageComponent.vue";
const uiavatar = require("ui-avatars");
export default {
  name: "Home",
  components: {
    MessageComponent,
  },
  data() {
    return {
      user: {},
      room: "",
      messages: [],
      message_temp: "",
      users: [],
    };
  },
  sockets: {
    message_received(data) {
      this.messages.push(data);
    },
    user_connected(data) {
      // console.log(data);
      if (data.room == this.room) {
        var avatarURL = uiavatar.generateAvatar({
          uppercase: true,
          name: data.user,
          background: "random",
          rounded: true,
          size: 50,
        });
        if (!this.users.some((u) => u.username == data.user)) {
          this.users.push({
            username: data.user,
            avatar: avatarURL,
          });
        }
      }
    },
    leave_room(data) {
      console.log(data);
      if (this.room == data.room) {
        console.log(this.users);
        this.users = this.users.filter((u) => u.username != data.username);
      }
    },
    users_in_room(users) {
      users.forEach((u) => {
        if (!this.users.some((user) => user.username == u) ) {
          var avatarURL = uiavatar.generateAvatar({
            uppercase: true,
            name: u,
            background: "random",
            rounded: true,
            size: 50,
          });
          
          this.users.push({
            username: u,
            avatar: avatarURL,
          });
        }
      });

      this.users = this.users.filter(u=>u.username != this.user)
    },
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.room = localStorage.getItem("room");
    if (!this.user) {
      this.$router.replace({
        name: "Login",
      });
    }
    this.$socket.emit("set:username", { username: this.user });
    this.$socket.emit("join:room", { room: this.room, user: this.user });
    this.$socket.emit("users");
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.replace({
        name: "Login",
      });
      this.$socket.emit("logout");
    },
    sendMessage() {
      if (this.message_temp == "") return;
      let message = {
        data: this.message_temp,
        date: moment().format("hh:mm a"),
        type: "owner",
        room: this.room,
        user: this.user,
      };
      this.$socket.emit("send:message", { message });
      this.messages.push(message);
      this.message_temp = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  & .room_name {
    word-break: break-word;
    background: #248ac0;
    color: #eee;
    padding: 0.8em;
  }
}
.chat_container {
  max-height: 73vh;
  height: 73vh;
  overflow-y: scroll;
}

.text-control {
  margin-top: 1em;
}

#logout {
  background-color: #e4572e;
  color: #eee;
  border-radius: 0.2em;
  transform: scale(1.2);
}
</style>
