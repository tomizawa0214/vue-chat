<template>
  <v-card width="800px" class="mx-auto mt-5">
    <div class="message">
      <v-card-title>
        <h1 class="display-1">チャット</h1>
      </v-card-title>
      <v-card-text class="content" v-chat-scroll>
        <div v-for="message in messages" :key="message.id">
          <div class="chat" v-if="message.name != name">
            <div class="chat__profile">
              <img src="https://plavehold.jp/50x50.png?text=Vue" />
            </div>
            <div class="chat__main">
              <div class="chat__main--name">{{ message.name }}</div>
              <div class="chat__main--message">
                <p class="space">
                  {{ message.content }}
                </p>
              </div>
              <span class="chat__time">{{ message.timestamp }}</span>
            </div>
          </div>
          <div class="mychat" v-if="message.name == name">
            <span class="mychat__time">{{ message.timestamp }}</span>
            <p class="space">
              {{ message.content }}
            </p>
          </div>
        </div>
      </v-card-text>
    </div>
    <Message :name="name" />
  </v-card>
</template>

<script>
import Message from "@/components/Message";
import db from "@/firebase/init";
import firebase from "firebase";
import moment from "moment";
export default {
  name: "Home",
  components: {
    Message
  },
  data() {
    return {
      name: "",
      messages: []
    };
  },
  created() {
    db.collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.name = doc.data().name;
        });
      });

    db.collection("messages")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data(). timestamp).format("LT")
            });
          }
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 20px 10px;
  margin: 0 auto;
  text-align: right;
  background: #7DA4CD;
}

.content {
  height: 550px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #DDD;
  }
  &::-webkit-scrollbar-thumb {
    background: #AAA;
  }
}

.chat {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
  &__profile {
    float: left;
    margin-left: -50px;
    width: 40px;
    img {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }
  }
  &__main {
    width: 100%;
    text-align: left;
    &--name {
      color: #EDF1EE;
      margin: 0 0 0 50px;
    }
    &--massege {
      display: inline-block;
      position: relative;
      margin: 0 0 0 50px;
      padding: 10px;
      max-width: 250px;
      border-radius: 30px;
      background: #EDF1EE;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 3px;
        left: -19px;
        border: 8px solid transparent;
        border-right: 18px solid #EDF1EE;
        -webkit-transform: rotate(35deg);
        transform: rotate(35deg);
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
  &__time {
    font-size: .8em;
    margin-left: 10px;
    color: #EDF1EE;
  }
}

.mychat {
  margin: 10px 0;
  p {
    display: inline-block;
    position: relative;
    margin: 0 10px 0 0;
    padding: 8px;
    max-width: 250px;
    border-radius: 30px;
    background: #30E852;
    font-size: 15px;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      right: -19px;
      border: 8px solid transparent;
      border-left: 18px solid #30E852;
      -webkit-transform: rotate(-35deg);
      transform: rotate(-35deg);
    }
  }
  &__time {
    font-size: .8em;
    margin-right: 10px;
    color: #EDF1EE;
  }
}

.space {
  white-space: pre-line;
}

</style>