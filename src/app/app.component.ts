import { UtilityProvider } from './../providers/utility/utility';
import { UsersServiceProvider } from "./../providers/users-service/users-service";
import { LocalStorageProvider } from "./../providers/local-storage/local-storage";
import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FCM } from "@ionic-native/fcm";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "HomePage";
  private deviceID: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fcm: FCM,
    private storage: LocalStorageProvider,
    private userService: UsersServiceProvider,
    private utility: UtilityProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Notifications
      fcm.subscribeToTopic("employees");
      fcm.getToken().then(token => {
        console.log("token", token);
        if (token != null) {
          this.deviceID = token;
          this.utility.token = token;
          // this.storage.setItem("currentDeviceToken", token);
        }
      });
      fcm.onNotification().subscribe(data => {
        alert(JSON.stringify(data));
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        }
      });
      fcm.onTokenRefresh().subscribe(token => {
        console.log("token", token);
        if (token != null) {
          // this.userService.addDevice(token);
          this.deviceID = token;
          this.utility.token = token;
          // this.storage.setItem("currentDeviceToken", token);
        }
      });
      //end notifications.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
