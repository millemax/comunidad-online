import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-paneladministracion',
  templateUrl: './paneladministracion.component.html',
  styleUrls: ['./paneladministracion.component.scss']
})
export class PaneladministracionComponent implements OnInit {
  private _opened: boolean = false;

  deviceInfo = null;

  nombre:string="Romel huaraca pocco";
  

  constructor(private deviceService: DeviceDetectorService) { }

        ngOnInit() {
          this.devicetypes();
          this.epicFunction();
          
        }

        private _toggleSidebar() {
          this._opened = !this._opened;
        }

        epicFunction() {
          console.log('hello `Home` component');
          this.deviceInfo = this.deviceService.getDeviceInfo();
          const isMobile = this.deviceService.isMobile();
          const isTablet = this.deviceService.isTablet();
          const isDesktopDevice = this.deviceService.isDesktop();
          console.log(this.deviceInfo);
          console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
          console.log(isTablet);  // returns if the device us a tablet (iPad etc)
          console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
        }

        devicetypes(){            
            const isMobile = this.deviceService.isMobile();
            const isTablet = this.deviceService.isTablet();
            const isDesktopDevice = this.deviceService.isDesktop();

            if (isMobile == true){
                 this._opened=false;

            }else{
              if(isDesktopDevice){
                this._opened=true;

              }

            }

        }






}
