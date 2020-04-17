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
 * These are experimental and therefore not available for re-use.
 */

interface Registry
{
  registerClass(clazz: Function, registryName: string): void

  getInstance(clazz: string): any
  getSingleton(clazz: string): any
}

type RegistryEntry = {
  [key: string]: Function
}
type SingletonEntry = {
  [key: string]: Object
}

class ObjectRegistry implements Registry
{
  private _registry: RegistryEntry = {};
  private _singletons: SingletonEntry = {};

  static registry = new ObjectRegistry();

  constructor()
  {
    this._registry = {};
  }

  getInstance(clazz: string): any
  {
    return Reflect.construct(this._registry[clazz], []);
  }

  registerClass(clazz: Function, registryName?: string): void
  {
    this._registry[registryName ? registryName : clazz.name] = clazz;
  }

  getSingleton(clazz: string): any
  {
    return Reflect.construct(this._registry[clazz], []);
  }
}

function TSFComponent(parameter?: any)
{
  return (constructor: Function) => {
    ObjectRegistry.registry.registerClass(constructor, <string>parameter);
    console.log(constructor.name)
  }
}

@TSFComponent()
@TSFComponent('testObject')
class TestObject
{
  getInfo()
  {
    return 'TestObject instance';
  }
}

@TSFComponent()
@TSFComponent('singleton')
class Singleton
{
  getInfo()
  {
    return 'Singleton instance';
  }
}

describe('Non-singleton IoC should work', function () {
  it('TestObject should register', function () {
    let instance: TestObject = ObjectRegistry.registry.getInstance(
      'TestObject');
    expect(instance)
      .toBeTruthy();
    expect(instance instanceof TestObject)
      .toBe(true);
  });
  it('testObject should register', function () {
    let instance: TestObject = ObjectRegistry.registry.getInstance(
      'testObject');
    expect(instance)
      .toBeTruthy();
    expect(instance instanceof TestObject)
      .toBe(true);
  });

});

describe('Singleton IoC should work', function () {
  it('Singleton should register', function () {
    let instance: Singleton = ObjectRegistry.registry.getInstance(
      'Singleton');
    expect(instance)
      .toBeTruthy();
    expect(instance instanceof Singleton)
      .toBe(true);
  });

  it('singleton should register', function () {
    let instance: Singleton = ObjectRegistry.registry.getInstance(
      'singleton');
    expect(instance)
      .toBeTruthy();
    expect(instance instanceof Singleton)
      .toBe(true);
  });

});
