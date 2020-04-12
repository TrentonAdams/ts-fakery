ts-fakery was created for the purpose of "faking" apis during development and jest testing.  This allows us to develop applications in a focused way without worrying about what the server API (e.g. REST) will look like.  Essentially this allows us to abstract the API calls into classes that do the work, and have the functionality swapped out for the NODE_ENV.

Ideally we'd have some sort of IoC container, but inversifyjs is just ugly, so until I find something better, or build my own, this is what I'll do.  It at least gets me going.

## Releases

* v1.0.1 - initial release
* v1.0.2 - updated with README 

## Usage

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
