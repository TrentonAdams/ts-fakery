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


import {EnvFactory} from "../index";

class TestObject
{
  private _constructorParam: string;
  private _constructorParam2: string;

  constructor(constructorParam: string, constructorParam2: string)
  {
    this._constructorParam = constructorParam;
    this._constructorParam2 = constructorParam2;
  }

  getInfo()
  {
    return 'TestObject' + this._constructorParam + this._constructorParam2;
  }
}

class DevObject
{
  private _constructorParam: string;
  private _constructorParam2: string;

  constructor(constructorParam: string, constructorParam2: string)
  {
    this._constructorParam = constructorParam;
    this._constructorParam2 = constructorParam2;
  }

  getInfo()
  {
    return 'DevObject' +this._constructorParam + this._constructorParam2;
  }
}

class ProdObject
{
  private _constructorParam: string;
  private _constructorParam2: string;

  constructor(constructorParam: string, constructorParam2: string)
  {
    this._constructorParam = constructorParam;
    this._constructorParam2 = constructorParam2;

  }

  getInfo()
  {
    return "ProdObject" + this._constructorParam + this._constructorParam2
  }
}

describe('test factory fakeries work', function () {
  it('should fake for each environment', function () {
    class MyFactory
    {
      @EnvFactory({"test": TestObject, "development": DevObject}, 'production')
      createProd(example: string, example2: string): any
      {
        return new ProdObject(example, example2);
      }

      @EnvFactory({"test": TestObject, "development": DevObject}, 'test')
      createTest(example: string, example2: string): any
      {
        return new ProdObject(example, example2);
      }

      @EnvFactory({"test": TestObject, "development": DevObject}, 'development')
      createDev(example: string, example2: string): any
      {
        return new ProdObject(example, example2);
      }
    }

    let factory = new MyFactory();
    expect(factory.createTest('param', "param2") instanceof TestObject).toBe(true);
    expect(factory.createDev('param', "param2") instanceof DevObject).toBe(true);
    expect(factory.createProd('param', 'param2') instanceof ProdObject).toBe(true);

    expect(factory.createTest('param', "param2").getInfo()).toBe('TestObjectparamparam2');
    expect(factory.createDev('param', "param2").getInfo()).toBe('DevObjectparamparam2');
    expect(factory.createProd('param', 'param2').getInfo()).toBe('ProdObjectparamparam2');
  });

});
