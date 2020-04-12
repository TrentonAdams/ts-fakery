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
