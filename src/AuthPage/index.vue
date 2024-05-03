<template>
  <!-- ส่วนของหน้าเพจเข้าสู่ระบบ -->
  <div class="login-page">
    <div class="card">
      <!-- แบบฟอร์มเข้าสู่ระบบ -->
      <form @submit.prevent="login">
        <div class="title">Login</div>
        <!-- ช่องป้อนข้อมูลสำหรับชื่อผู้ใช้ -->
        <input placeholder="Username" type="text" v-model="loginData.username" />
        <br />
        <!-- ช่องป้อนข้อมูลสำหรับรหัสผ่าน -->
        <input placeholder="Password" type="password" v-model="loginData.password" />
        <br />
        <!-- ปุ่มสำหรับส่งแบบฟอร์มเข้าสู่ระบบ -->
        <button type="submit">Login</button>
      </form>

      <!-- แบบฟอร์มสมัครสมาชิก -->
      <form @submit.prevent="signup">
        <div class="title">Sign Up</div>
        <!-- ช่องป้อนข้อมูลสำหรับชื่อผู้ใช้ -->
        <input placeholder="Username" type="text" v-model="signupData.username" />
        <br />
        <!-- ช่องป้อนข้อมูลสำหรับรหัสผ่าน -->
        <input placeholder="Password" type="password" v-model="signupData.password" />
        <br />
        <!-- ช่องป้อนข้อมูลสำหรับอีเมล -->
        <input placeholder="Email" type="text" v-model="signupData.email" />
        <br />
        <!-- ช่องป้อนข้อมูลสำหรับชื่อ -->
        <input placeholder="First name" type="text" v-model="signupData.first_name" />
        <br />
        <!-- ช่องป้อนข้อมูลสำหรับนามสกุล -->
        <input placeholder="Last name" type="text" v-model="signupData.last_name" />
        <br />
        <!-- ปุ่มสำหรับส่งแบบฟอร์มสมัครสมาชิก -->
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { loginRest, signupRest } from "./api";

export default {
  data() {
    return {
      // ข้อมูลสำหรับแบบฟอร์มเข้าสู่ระบบ
      loginData: {
        username: "",
        password: "",
      },
      // ข้อมูลสำหรับแบบฟอร์มสมัครสมาชิก
      signupData: {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    // เมธอดสำหรับการส่งแบบฟอร์มเข้าสู่ระบบ
    login() {
      loginRest(this.loginData.username, this.loginData.password)
        .then((response) =>
          // ส่งอีเวนต์พร้อมข้อมูลผู้ใช้เมื่อเข้าสู่ระบบสำเร็จ
          this.$emit("onAuth", { ...response.data, secret: this.loginData.password })
        )
        .catch((error) => console.log("Login error", error));
    },
    // เมธอดสำหรับการส่งแบบฟอร์มสมัครสมาชิก
    signup() {
      signupRest(
        this.signupData.username,
        this.signupData.password,
        this.signupData.email,
        this.signupData.first_name,
        this.signupData.last_name
      )
        .then((response) =>
          // ส่งอีเวนต์พร้อมข้อมูลผู้ใช้เมื่อสมัครสมาชิกสำเร็จ
          this.$emit("onAuth", { ...response.data, secret: this.signupData.password })
        )
        .catch((error) => console.log("Sign up error", error));
    },
  },
};
</script>
