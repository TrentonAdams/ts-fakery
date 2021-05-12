ts-fakery was created for the purpose of "faking" apis during development and jest testing.  This allows us to develop applications in a focused way without worrying about what the server API (e.g. REST) will look like.  Essentially this allows us to abstract the API calls into classes that do the work, and have the functionality swapped out for the NODE_ENV.

Ideally we'd have some sort of IoC container, but inversifyjs is just ugly, so until I find something better, or build my own, this is what I'll do.  It at least gets me going.

Always keep in mind that typescript decorators are an experimental feature and may not work with future releases of typescript.  At the time of building this I am using typescript 3.6.3.

## Releases

* v2.0.0 - security patches for dependencies
* v1.1.2 - add support for multiple arguments to constructors
* v1.1.1 - no functionality changes, just splitting objects up into files.
* v1.1.0 - add @EnvFactory
* v1.0.4 - attempt to fix a bug
* v1.0.3 - updated with Apache 2.0 license 
* v1.0.2 - updated with README 
* v1.0.1 - initial release

## Copyright

```
Copyright 2020 Trenton D. Adams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Features

This module has the following features... 

1. fake methods in a class by calling a different method for each environment.
2. replace a factory method with a method that returns a different object depending on the environment in use.  e.g. production, development, or test.

## @EnvFake Usage

Our usage will involve running an automated test that demonstrates how to use
`@EnvFake`

Install the required libraries for automated testing with jest + typescript...

```bash
yarn add ts-fakery
yarn add -D @types/jest @types/node jest ts-jest typescript
```

Setup jest...
```bash
yarn jest --init
```

You'll need some settings in your `jest.config.js`, beyond the defaults.  Add the following options to the jest file.

```
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
 
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
 
   transform: {
     '^.+\\.tsx?$': 'ts-jest',
   }
```

Now setup some tests to show ts-fakery at work.

```bash
cat <<SPEC > mytest.spec.ts
import {EnvFake} from "ts-fakery";

describe('test fakery works', function () {
    it('should fake for test', function () {
        class MyObject
        {
            @EnvFake(["test"])
            getEnv()
            {
                return "production"
            }

            private getEnv_development()
            {
                return "development"
            }

            private getEnv_test()
            {
                return "test"
            }
        }
        expect(new MyObject().getEnv()).toBe('test');
    });
    it('should fake for development', function () {
        class MyObject
        {
            @EnvFake(["test", "development"])
            getEnv()
            {
                return "production"
            }

            private getEnv_development()
            {
                return "development"
            }

            private getEnv_test()
            {
                return "test"
            }
        }
        expect(new MyObject().getEnv()).toBe('development');
    });
    it('should not fake for production', function () {
        class MyObject
        {
            @EnvFake(["test", "development"])
            getEnv()
            {
                return "production"
            }

            private getEnv_development()
            {
                return "development"
            }

            private getEnv_test()
            {
                return "test"
            }
        }
        expect(new MyObject().getEnv()).toBe('production');
    });
});
SPEC
```

Run the tests for each environment.  You'll notice only the test for the environment you're specify is successful, proving that you're only getting the correct output for the given environment.

```bash
yarn jest # defaults to NODE_ENV=test

NODE_ENV=development yarn jest

NODE_ENV=production yarn jest
```

Now you can obviously remove all the tests and simply use `@EnvFake`.

## @EnvFactory Usage

You can do an automated test like above if you like, but the usage basics are like this...

1. Create the classes you need
2. Create a factory with a "create" function
3. Annotate the create function with the `@EnvFactory` decorator.   


```typescript
// put this in tmp.js  
import {EnvFactory} from "ts-fakery";

class TestObject
{
    getInfo()
    {
        return 'TestObject';
    }
}

class DevObject
{
    getInfo()
    {
        return 'DevObject';
    }
}

class ProdObject
{
    getInfo()
    {
        return "ProdObject"
    }
}

class MyFactory
{
    @EnvFactory({"test": TestObject, "development": DevObject})
    create(): any
    {
        return new ProdObject();
    }
}

console.log('You are running the', new MyFactory().create().getInfo(),
    'object');

```

If you've created a node project already, just add typescript and ts-fakery, and away you go...

```bash                                 
yarn add ts-fakery typescript
yarn tsc --experimentalDecorators tmp.ts
node tmp.js
NODE_ENV=development node tmp.js
NODE_ENV=test node tmp.js
```
