<template>
  <!-- ส่วนของ Container สำหรับแสดงหน้าต่างแชท -->
  <div class="ce-chat-window-container" style="height: 100vh">
    <!-- เรียกใช้งานคอมโพเนนต์ PrettyChatWindow -->
    <PrettyChatWindow :projectId="projectId" :username="username" :secret="secret" />
  </div>
</template>

<script>
import { PrettyChatWindow } from "react-chat-engine-pretty"; // นำเข้าคอมโพเนนต์ PrettyChatWindow จากไลบรารี react-chat-engine-pretty
import { applyReactInVue } from "veaury"; // นำเข้าฟังก์ชันสำหรับการใช้งานคอมโพเนนต์ React ใน Vue

export default {
  data() {
    return {
      // projectId ที่ได้มาจากตัวแปรสภาพแวดล้อม
      projectId: import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
    };
  },
  components: {
    // ลงทะเบียนคอมโพเนนต์ PrettyChatWindow เป็นคอมโพเนนต์ของ Vue
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
  },
  props: {
    // ชื่อผู้ใช้สำหรับการตรวจสอบสิทธิ์
    username: {
      type: String,
      required: true,
    },
    // รหัสลับของผู้ใช้สำหรับการตรวจสอบสิทธิ์
    secret: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // ส่วนนี้จะถูกเรียกหลังจากที่คอมโพเนนต์ถูกติดตั้ง
    // คุณสามารถทำการเตรียมข้อมูลหรือเรียกใช้ API ที่ต้องการได้ที่นี่
  },
};
</script>
