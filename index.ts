
/**
 * This will replace the function with an "_environment" (e.g. method_test or
 * method_development) version if one is available.  This allows one to change
 * the behaviour depending on where the code is running.  For example, one
 * might wish to run a fake version during the entire development process, and
 * only delegate to a real function for production use.
 *
 * As an example, if you wanted to work on your code, have it completely
 * functional while using it locally but have production make a REST call,
 * then you can do that by implementing the REST call in the decorated method,
 * but put test/development versions in the method_test and method_development
 * methods, while making them private so they aren't part of the normal API.
 * This allows very rapid development on the UI, completely independently of
 * the REST API.  It's a good fit for developing Single Page Applications.
 *
 * @constructor
 */
export function EnvFake(strings: string[],
  environment = process.env.NODE_ENV, debug = false): any
{
  if (debug)
    console.log('NODE_ENV: ', process.env.NODE_ENV);
  if (strings.filter(env => env === environment).length === 1)
  {
    return function (target: any, propertyKey: string,
      descriptor: PropertyDescriptor) {
      if (debug)
        console.log('target: ', target, propertyKey, descriptor);
      // replace and return function
      target[propertyKey] = target[propertyKey + "_" + environment];
      return target[propertyKey + "_" + environment];
    };
  }
}

