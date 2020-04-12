import {EnvFake} from "../index";

describe('test fakery works', function () {
  it('should fake for test', function () {
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
    expect(new MyObject().getEnv()).toBe('test');
  });
  it('should fake for development', function () {
    class MyObject
    {
      @EnvFake(["test", "development"], "development")
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
      @EnvFake(["test", "development"], "production")
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
