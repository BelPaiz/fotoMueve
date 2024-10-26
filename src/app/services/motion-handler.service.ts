import { Injectable } from '@angular/core';
import { Motion,  } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class MotionHandlerService {
  private accelHandler?: PluginListenerHandle;
  x: number = 0;
  y: number = 0;
  z: number = 0;
  
  tolerance: number = 2;
  z_tolerance: number = this.tolerance + 3;
  

  constructor() {
    this.startWatching();
  }

  async startWatching(){
    this.accelHandler = await Motion.addListener('accel', event => {
      this.x = event.accelerationIncludingGravity.x;
      this.y = event.accelerationIncludingGravity.y;
      this.z = event.accelerationIncludingGravity.z
    });
  }

  stopWatching() {
    if (this.accelHandler) {
      this.accelHandler.remove();
    }
  };

  removeListeners() {
    Motion.removeAllListeners();
  };


  phoneIsNormal(): boolean {
    return this.x < 3 && this.x > -3;
  }

  phoneIsTiltedUpwards(): boolean {
    return this.y < 2;
  }
  
  phoneIsTiltedLeft(): boolean {
    return this.x > 5;
  }

  phoneIsTiltedRight(): boolean {
    return this.x < -5;
  }

  phoneStatus(): string {
    let status: string = 'OTHER';
     if (this.phoneIsTiltedUpwards()){
      status = 'UPWARDS'
    }else if (this.phoneIsTiltedLeft()){
      status = 'TILTED-L'
    } else if (this.phoneIsTiltedRight()){
      status = 'TILTED-R'
    } else if (this.phoneIsNormal()) {
      status = 'NORMAL'
    }
    return status;
  }
}
