<script setup>
// นำเข้าคอมโพเนนต์ AuthPage และ ChatsPage จากไฟล์ index.vue ในโฟลเดอร์ AuthPage และ ChatsPage ตามลำดับ
import AuthPage from "./AuthPage/index.vue";
import ChatsPage from "./ChatsPage/index.vue";
</script>

<template>
  <!-- แสดงหน้า AuthPage เมื่อยังไม่มีผู้ใช้เข้าสู่ระบบ และส่งค่าข้อมูลผู้ใช้ผ่านอีเวนต์ onAuth เมื่อเข้าสู่ระบบสำเร็จ -->
  <AuthPage v-if="!user" @onAuth="handleAuth" />
  <!-- แสดงหน้า ChatsPage เมื่อมีผู้ใช้เข้าสู่ระบบแล้ว โดยส่ง username และ secret เข้าไปในคอมโพเนนต์ -->
  <ChatsPage
    v-else
    v-bind:username="user.username"
    v-bind:secret="user.secret"
  />
</template>

<script>
export default {
  data() {
    return {
      // ข้อมูลของผู้ใช้ เริ่มต้นเป็น undefined
      user: undefined,
    };
  },
  methods: {
    // เมธอด handleAuth ที่ใช้เพื่อรับข้อมูลผู้ใช้จากอีเวนต์ onAuth และกำหนดให้กับคุณสมบัติ user
    handleAuth(user) {
      this.user = user;
    },
  },
};
</script>
