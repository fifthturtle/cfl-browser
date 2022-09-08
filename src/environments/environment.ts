// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL: "http://192.168.12.198:8080/api/",
  URLapi: "http://ec2-54-219-64-124.us-west-1.compute.amazonaws.com/api/",
  // URLapi: "http://ec2-54-193-23-37.us-west-1.compute.amazonaws.com/api/",
  // URLapi: "http://ec2-3-101-135-221.us-west-1.compute.amazonaws.com/api/",
  socket: "http://192.168.12.198:8080",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
