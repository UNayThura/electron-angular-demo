import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-electron-demo';
  time: any
  running: boolean = false
  second = 10
  millisecond = 0

  constructor() { }


  start() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    // this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.millisecond += diff / 10;


    // Seconds are 100 hundredths of a second
    if (this.millisecond >= 100) {
      this.second -= 1;
      this.millisecond -= 100;
    }
    if (this.second <= 0) this.stop();


  }

  stop() {
    this.running = false;
    this.time = null;
  }

  restart() {
    this.second = 10
    this.millisecond = 0
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  reset() {
    this.second = 0;
    this.millisecond = 0;
  }

}