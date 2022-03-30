<template>
  <div class="m-2">
    <div class="message-box" :class="{'owns-box':message.type =='owner', 'senders-box':message.type=='sender'}">
      <div class="title mb-0" v-if="message.type == 'sender'">{{message.user}} dice:</div>
      {{ message.data }}
      <div class="date-box mt-2 ml-1">{{message.date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  mounted() {
    let container = document.getElementById("chat_container");
    container.scroll(0, container.scrollHeight)
  },
};
</script>

<style lang="scss" scoped>
.message-box {
  display: block;
  width: fit-content;
  max-width: 60vw;
  text-align: justify;
  text-justify: inter-word;
  line-height: normal;
  padding: 1em;
  border-radius: 1em;
  text-shadow: 1px 1px 1px rgb(87, 87, 87);
  color: white;

}

.senders-box {
  background-color: #41393c;
}

.owns-box {
  background-color: #76b041;
  box-shadow: 2px 2px 10px black;
  // float: right;
  margin-left: auto;
  margin-right: 0.3rem;
}

.date-box{
    font-size: 11px;
}

.title{
  font-size: 11px;
  text-shadow: none;
  color: white;
}
</style>
