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

import {EnvFactory, EnvFake} from "../index";

class TestObject {

  getInfo(){
    return 'TestObject';
  }
}

class DevObject {

  getInfo(){
    return 'DevObject';
  }
}

class ProdObject {
  getInfo(){
    return "ProdObject"
  }
}

describe('test factory fakeries work', function () {
  it('should fake for each environment', function () {
    class MyFactory
    {
      @EnvFactory({"test": TestObject, "development": DevObject}, 'production')
      createProd(): any
      {
        return new ProdObject();
      }
      @EnvFactory({"test": TestObject, "development": DevObject}, 'test')
      createTest(): any
      {
        return new ProdObject();
      }
      @EnvFactory({"test": TestObject, "development": DevObject}, 'development')
      createDev(): any
      {
        return new ProdObject();
      }
    }
    expect(new MyFactory().createTest() instanceof TestObject).toBe(true);
    expect(new MyFactory().createDev() instanceof DevObject).toBe(true);
    expect(new MyFactory().createProd() instanceof ProdObject).toBe(true);
  });

});
