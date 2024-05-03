// ใช้การ import เพื่อซ่อนรายละเอียดของโมดูล axios ภายในโมดูลเอง
// คุณสมบัติของ OOP: การเข้าห่อหุ้ม (Encapsulation) โดยการซ่อนรายละเอียดการทำงานภายในของโมดูล axios
import axios from "axios";

// คลาสสำหรับจัดการการแสดงข้อความแจ้งเตือน
// คุณสมบัติของ OOP: การเข้าห่อหุ้ม (Encapsulation) โดยการรวมข้อมูลและเมธอดที่เกี่ยวข้องกับการแสดงข้อความแจ้งเตือนไว้ในคลาสเดียวกัน
class NotificationManager {
  // เมธอดสำหรับแสดงข้อความแจ้งเตือนแบบ error
  static showError(title, message) {
    console.error(`${title}: ${message}`);
    alert(`Error: ${message}`); // ใช้ alert แสดงข้อความแจ้งเตือน
  }
}

// คลาสสำหรับจัดการการแสดงข้อความแจ้งเตือนแบบใหม่
// คุณสมบัติของ OOP: การสืบทอด (Inheritance) จากคลาส NotificationManager
// คุณสมบัติของ OOP: การเข้าห่อหุ้ม (Encapsulation) โดยการรวมข้อมูลและเมธอดที่เกี่ยวข้องกับการแสดงข้อความแจ้งเตือนแบบใหม่ไว้ในคลาสเดียวกัน
class CustomNotificationManager extends NotificationManager {
  // เพิ่มเมธอด showCustomError ที่แสดงข้อความแจ้งเตือนแบบที่กำหนดเอง
  // คุณสมบัติของ OOP: พอลิมอร์ฟิซึม (Polymorphism) โดยการ Override เมธอด
  static showCustomError(title, message) {
    console.error(`${title}: ${message}`);
    alert(`Custom Error: ${message}`); // ใช้ alert แสดงข้อความแจ้งเตือนแบบที่กำหนดเอง
  }
}

// ฟังก์ชัน loginRest สำหรับการเข้าสู่ระบบ
const loginRest = async (username, secret) => {
  try {
    // ทำ HTTP GET request ไปยัง API เพื่อตรวจสอบการเข้าสู่ระบบ
    const response = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return response; // ส่งข้อมูลที่ได้รับกลับ
  } catch (error) {
    // ตรวจสอบประเภทของข้อผิดพลาดและแสดงข้อความแจ้งเตือน
    if (error.response && error.response.status === 401) {
      // คุณสมบัติของ OOP: การใช้งานออบเจกต์ของคลาส CustomNotificationManager
      CustomNotificationManager.showCustomError(
        'Login Error',
        'Invalid username or password.'
      );
    } else {
      CustomNotificationManager.showCustomError(
        'Login Error',
        'An unknown error occurred. Please try again.'
      );
    }
    // โยนข้อผิดพลาดออกไป เพื่อให้ caller รับทราบหรือจัดการต่อ
    throw error;
  }
};

// ฟังก์ชัน signupRest สำหรับการสมัครสมาชิก
const signupRest = async (username, secret, email, first_name, last_name) => {
  try {
    // ทำ HTTP POST request ไปยัง API เพื่อสร้างบัญชีผู้ใช้ใหม่
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      {
        headers: {
          "Private-Key": import.meta.env.VITE_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );
    return response; // ส่งข้อมูลที่ได้รับกลับ
  } catch (error) {
    // ตรวจสอบประเภทของข้อผิดพลาดและแสดงข้อความแจ้งเตือน
    if (error.response && error.response.status === 400) {
      // คุณสมบัติของ OOP: การใช้งานออบเจกต์ของคลาส CustomNotificationManager
      CustomNotificationManager.showCustomError(
        'Sign Up Error',
        'Failed to sign up. Please check your inputs and try again.'
      );
    } else {
      CustomNotificationManager.showCustomError(
        'Sign Up Error',
        'An unknown error occurred. Please try again.'
      );
    }
    // โยนข้อผิดพลาดออกไป เพื่อให้ caller รับทราบหรือจัดการต่อ
    throw error;
  }
};

// ส่งออกฟังก์ชัน loginRest และ signupRest เพื่อให้สามารถเรียกใช้จากภายนอกได้
export { loginRest, signupRest };