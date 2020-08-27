<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      Chat Service
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text v-if="!user" :to="{ name: 'Signup' }">
        サインアップ
      </v-btn>
      <v-btn text v-if="!user" :to="{ name: 'Login' }">
        ログイン
      </v-btn>
      <v-btn text v-if="user">
        {{ user.email }}
        <!-- {{ users.name }} -->
      </v-btn>
      <v-btn text v-if="user" @click="logout">
        ログアウト
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
    };
  },
  created() {
    // ログイン状態を監視
    firebase.auth().onAuthStateChanged(user => {
      // ログインしている
      if (user) {
        this.user = user;
        let user = firebase.auth().currentUser;
        console.log(user);
        console.log(user.email);
      // ログインしていない
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>