type CacheKey = object;
type CacheValue<T> = T;

// fn はオブジェクトを1つ引数に取る関数
function cache<T>(fn: (arg: CacheKey) => T): (arg: CacheKey) => T {
  // ガベージコレクションの対象になるかどうかをWeakMapにお任せする
  const cacheMap = new WeakMap<CacheKey, CacheValue<T>>();

  return (arg: CacheKey): T => {
    if (cacheMap.has(arg)) {
      return cacheMap.get(arg)!;
    }

    const result = fn(arg);
    cacheMap.set(arg, result);
    return result;
  };
}

interface Person {
  name: string;
  age: number;
}

function slowFn(person: Person): string {
  // 時間のかかる処理
  console.log('Take some time ...');
  return `Hey, ${person.name}! I heard you are ${person.age} Y.O.`;
}

// slowFnはPersonを型にとるが、cacheはobjectを引数にとる。to be fiexed
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const cachedSlowFn = cache(slowFn);

const person1 = { name: 'Alice', age: 30 };
// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
console.log(cachedSlowFn(person1));
console.log(cachedSlowFn(person1));

