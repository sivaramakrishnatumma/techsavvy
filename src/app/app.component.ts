import { UtilityProvider } from './../providers/utility/utility';
import { UsersServiceProvider } from "./../providers/users-service/users-service";
import { LocalStorageProvider } from "./../providers/local-storage/local-storage";
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, NavController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FCM } from "@ionic-native/fcm";
import { Media, MediaObject } from '@ionic-native/media';
import { Toast } from '@ionic-native/toast';
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "HomePage";
  private deviceID: any;
  private fileSound: any = null;
  private notificationType: any = null;
  private notificationMessage: string = null;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fcm: FCM,
    private storage: LocalStorageProvider,
    private userService: UsersServiceProvider,
    private utility: UtilityProvider,
    private media: Media,
    private toast: Toast,
    private app: App
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
        }
      });
      fcm.onNotification().subscribe(data => {
        alert(JSON.stringify(data));
        this.notificationMessage = data.message;
        this.notificationType = data.type;
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
          if (this.notificationType == 'new_query_posted') {
            this.nav.setRoot('SearchPage');
          }
        } else {
          console.log("Received in foreground");
          if (this.notificationType == 'new_query_posted') {
          this.fileSound = this.media.create('/android_asset/www/assets/ringtones/plucky.mp3');
          this.fileSound.play();
          this.toast.showWithOptions({
            message: this.notificationMessage,
            duration: 5000,
            position: 'top',
            styling: {
                backgroundColor: '#1374DF',
                opacity: 1
            }
          }).subscribe(
            toast => {
                if (toast != null) {
                    if (toast.event == 'touch') {
                        this.navController.push('SearchPage');
                        this.toast.hide();
                    }
                }
            });
          }
        }
      });
      fcm.onTokenRefresh().subscribe(token => {
        console.log("token", token);
        if (token != null) {
          this.deviceID = token;
          this.utility.token = token;
        }
      });
      //end notifications.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  get navController(): NavController {
    return this.app.getActiveNav();
  }
}