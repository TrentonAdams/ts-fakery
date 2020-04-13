/*
 * Copyright 2020 Trenton D. Adams
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides the ability to cause a factory function to return a different
 * objected depending on the NODE_ENV used.  This allows you to write a
 * production only factory, while automatically replacing the returned instance
 * with a new instance for dev or test.
 *
 * @param {Object.<string, Object>} environments
 * @param environment for testing only, the environment you're trying to test.
 * @constructor
 */
export function EnvFactory(environments: any,
    environment: string | any = process.env.NODE_ENV): any
{
    let logger = (...args: any[]) => {
    };
    if (process.env.tsfakery_debug === 'true')
    {
        logger = console.debug
    }
    logger('NODE_ENV: ', environment);
    const keys = Object.keys(environments);
    if (keys.filter(key => key === environment).length === 1)
    {
        logger('environments: ', environments, ', matched: ', environment);
        const env = environment;
        return function (target: any, propertyKey: string,
            descriptor: PropertyDescriptor) {
            logger('target: ', target, propertyKey, descriptor);
            // replace and return function
            let newFunction = function () {
              const args = Array.prototype.slice.call(arguments, 0);
              let Constructor = environments[environment];
              return Reflect.construct(Constructor,args);
            };
            target[propertyKey] = newFunction;
            return newFunction;
        };
    }
    else
    {
        logger('environments: ', environments, ', did not match: ',
            environment);
        return function (target: any, propertyKey: string,
            descriptor: PropertyDescriptor) {
            // use the original object by returning a function that does
            // nothing.
        }
    }
}
