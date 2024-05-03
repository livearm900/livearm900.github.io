// Import โมดูลที่จำเป็น
import { createApp } from 'vue'; // เรียกใช้ฟังก์ชัน createApp จากโมดูล 'vue'
import './style.css'; // Import stylesheet สำหรับรูปแบบของเว็บไซต์
import App from './App.vue'; // Import คอมโพเนนต์หลักของแอปพลิเคชัน

// สร้างคลาสสำหรับแอปพลิเคชันของ Vue
class VueApp {
  constructor(rootComponent, rootElementId) {
    this._rootComponent = rootComponent; // กำหนดคอมโพเนนต์หลักสำหรับแอปพลิเคชัน
    this._rootElementId = rootElementId; // กำหนด ID ของ root element ที่จะใช้ในการ mount แอปพลิเคชัน
  }

  // Getter สำหรับคอมโพเนนต์หลัก
  get rootComponent() {
    return this._rootComponent;
  }

  // Setter สำหรับคอมโพเนนต์หลัก
  set rootComponent(rootComponent) {
    this._rootComponent = rootComponent;
  }

  // Getter สำหรับ ID ของ root element
  get rootElementId() {
    return this._rootElementId;
  }

  // Setter สำหรับ ID ของ root element
  set rootElementId(rootElementId) {
    this._rootElementId = rootElementId;
  }

  // เมธอดสำหรับการ mount แอปพลิเคชัน Vue
  mount() {
    // Mount คอมโพเนนต์หลักไปยัง root element ที่ระบุ
    createApp(this._rootComponent).mount(`#${this._rootElementId}`);
  }
}

// สร้างอินสแตนซ์ของคลาส VueApp และ mount แอปพลิเคชัน Vue
const myVueApp = new VueApp(App, 'app');
myVueApp.mount();