// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //configuracion de firebase
  firebaseConfig : {
    apiKey: "AIzaSyAn51iGEu__ne-_0Q07iM_9mj0O33NatA0",
    authDomain: "comunidadbd-2053d.firebaseapp.com",
    databaseURL: "https://comunidadbd-2053d.firebaseio.com",
    projectId: "comunidadbd-2053d",
    storageBucket: "comunidadbd-2053d.appspot.com",
    messagingSenderId: "834072484714",
    appId: "1:834072484714:web:08e24825d8899576286313",
    measurementId: "G-4Q44RCQTLR"
  }
  //configuracion de firebase fin
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
