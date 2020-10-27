// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// ****give a value to the SERVER_IP****
const SERVER_IP = 'http://localhost:3000';
export const environment = {
  production: false,
  custom: {
    LOGIN_URL: SERVER_IP + '/login',
    REGISTER_URL: SERVER_IP + '/register',
    ADD_USER_DATA: SERVER_IP + '/addUserData',
    USER_DATA_URL: SERVER_IP + '/userData',
    ALL_DATA_URL: SERVER_IP + '/allData',
    UPDATE_USER_DATA: SERVER_IP + '/updateUserData',

    IMAGE_URL: SERVER_IP + '/assets/houses/',
    PROFILE_IMAGE_URL: SERVER_IP + '/assets/profiles/',
    USER_AUTH_DATA: SERVER_IP + '/userAuthData',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
