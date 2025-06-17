
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MessageUsage
 * 
 */
export type MessageUsage = $Result.DefaultSelection<Prisma.$MessageUsagePayload>
/**
 * Model AnonymousUsage
 * 
 */
export type AnonymousUsage = $Result.DefaultSelection<Prisma.$AnonymousUsagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageUsage`: Exposes CRUD operations for the **MessageUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageUsages
    * const messageUsages = await prisma.messageUsage.findMany()
    * ```
    */
  get messageUsage(): Prisma.MessageUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.anonymousUsage`: Exposes CRUD operations for the **AnonymousUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnonymousUsages
    * const anonymousUsages = await prisma.anonymousUsage.findMany()
    * ```
    */
  get anonymousUsage(): Prisma.AnonymousUsageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.0
   * Query Engine version: aee10d5a411e4360c6d3445ce4810ca65adbf3e8
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    MessageUsage: 'MessageUsage',
    AnonymousUsage: 'AnonymousUsage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "messageUsage" | "anonymousUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MessageUsage: {
        payload: Prisma.$MessageUsagePayload<ExtArgs>
        fields: Prisma.MessageUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          findFirst: {
            args: Prisma.MessageUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          findMany: {
            args: Prisma.MessageUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>[]
          }
          create: {
            args: Prisma.MessageUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          createMany: {
            args: Prisma.MessageUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>[]
          }
          delete: {
            args: Prisma.MessageUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          update: {
            args: Prisma.MessageUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          deleteMany: {
            args: Prisma.MessageUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageUsagePayload>
          }
          aggregate: {
            args: Prisma.MessageUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageUsage>
          }
          groupBy: {
            args: Prisma.MessageUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageUsageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageUsageCountAggregateOutputType> | number
          }
        }
      }
      AnonymousUsage: {
        payload: Prisma.$AnonymousUsagePayload<ExtArgs>
        fields: Prisma.AnonymousUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnonymousUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnonymousUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          findFirst: {
            args: Prisma.AnonymousUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnonymousUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          findMany: {
            args: Prisma.AnonymousUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>[]
          }
          create: {
            args: Prisma.AnonymousUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          createMany: {
            args: Prisma.AnonymousUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnonymousUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>[]
          }
          delete: {
            args: Prisma.AnonymousUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          update: {
            args: Prisma.AnonymousUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          deleteMany: {
            args: Prisma.AnonymousUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnonymousUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnonymousUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>[]
          }
          upsert: {
            args: Prisma.AnonymousUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousUsagePayload>
          }
          aggregate: {
            args: Prisma.AnonymousUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnonymousUsage>
          }
          groupBy: {
            args: Prisma.AnonymousUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnonymousUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnonymousUsageCountArgs<ExtArgs>
            result: $Utils.Optional<AnonymousUsageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    messageUsage?: MessageUsageOmit
    anonymousUsage?: AnonymousUsageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    messageUsage: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messageUsage?: boolean | UserCountOutputTypeCountMessageUsageArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessageUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageUsageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subscriptionTier: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subscriptionTier: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    name: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    subscriptionTier: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    subscriptionTier?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    subscriptionTier?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    subscriptionTier?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    email: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    subscriptionTier: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionTier?: boolean
    messageUsage?: boolean | User$messageUsageArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionTier?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionTier?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionTier?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "email" | "name" | "imageUrl" | "createdAt" | "updatedAt" | "subscriptionTier", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messageUsage?: boolean | User$messageUsageArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      messageUsage: Prisma.$MessageUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string
      email: string | null
      name: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
      subscriptionTier: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messageUsage<T extends User$messageUsageArgs<ExtArgs> = {}>(args?: Subset<T, User$messageUsageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly subscriptionTier: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.messageUsage
   */
  export type User$messageUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    where?: MessageUsageWhereInput
    orderBy?: MessageUsageOrderByWithRelationInput | MessageUsageOrderByWithRelationInput[]
    cursor?: MessageUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageUsageScalarFieldEnum | MessageUsageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MessageUsage
   */

  export type AggregateMessageUsage = {
    _count: MessageUsageCountAggregateOutputType | null
    _avg: MessageUsageAvgAggregateOutputType | null
    _sum: MessageUsageSumAggregateOutputType | null
    _min: MessageUsageMinAggregateOutputType | null
    _max: MessageUsageMaxAggregateOutputType | null
  }

  export type MessageUsageAvgAggregateOutputType = {
    regularMessages: number | null
    premiumMessages: number | null
  }

  export type MessageUsageSumAggregateOutputType = {
    regularMessages: number | null
    premiumMessages: number | null
  }

  export type MessageUsageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    regularMessages: number | null
    premiumMessages: number | null
    resetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageUsageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    regularMessages: number | null
    premiumMessages: number | null
    resetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageUsageCountAggregateOutputType = {
    id: number
    userId: number
    regularMessages: number
    premiumMessages: number
    resetDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageUsageAvgAggregateInputType = {
    regularMessages?: true
    premiumMessages?: true
  }

  export type MessageUsageSumAggregateInputType = {
    regularMessages?: true
    premiumMessages?: true
  }

  export type MessageUsageMinAggregateInputType = {
    id?: true
    userId?: true
    regularMessages?: true
    premiumMessages?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageUsageMaxAggregateInputType = {
    id?: true
    userId?: true
    regularMessages?: true
    premiumMessages?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageUsageCountAggregateInputType = {
    id?: true
    userId?: true
    regularMessages?: true
    premiumMessages?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageUsage to aggregate.
     */
    where?: MessageUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageUsages to fetch.
     */
    orderBy?: MessageUsageOrderByWithRelationInput | MessageUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageUsages
    **/
    _count?: true | MessageUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageUsageMaxAggregateInputType
  }

  export type GetMessageUsageAggregateType<T extends MessageUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageUsage[P]>
      : GetScalarType<T[P], AggregateMessageUsage[P]>
  }




  export type MessageUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageUsageWhereInput
    orderBy?: MessageUsageOrderByWithAggregationInput | MessageUsageOrderByWithAggregationInput[]
    by: MessageUsageScalarFieldEnum[] | MessageUsageScalarFieldEnum
    having?: MessageUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageUsageCountAggregateInputType | true
    _avg?: MessageUsageAvgAggregateInputType
    _sum?: MessageUsageSumAggregateInputType
    _min?: MessageUsageMinAggregateInputType
    _max?: MessageUsageMaxAggregateInputType
  }

  export type MessageUsageGroupByOutputType = {
    id: string
    userId: string
    regularMessages: number
    premiumMessages: number
    resetDate: Date
    createdAt: Date
    updatedAt: Date
    _count: MessageUsageCountAggregateOutputType | null
    _avg: MessageUsageAvgAggregateOutputType | null
    _sum: MessageUsageSumAggregateOutputType | null
    _min: MessageUsageMinAggregateOutputType | null
    _max: MessageUsageMaxAggregateOutputType | null
  }

  type GetMessageUsageGroupByPayload<T extends MessageUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageUsageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageUsageGroupByOutputType[P]>
        }
      >
    >


  export type MessageUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regularMessages?: boolean
    premiumMessages?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageUsage"]>

  export type MessageUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regularMessages?: boolean
    premiumMessages?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageUsage"]>

  export type MessageUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regularMessages?: boolean
    premiumMessages?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageUsage"]>

  export type MessageUsageSelectScalar = {
    id?: boolean
    userId?: boolean
    regularMessages?: boolean
    premiumMessages?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "regularMessages" | "premiumMessages" | "resetDate" | "createdAt" | "updatedAt", ExtArgs["result"]["messageUsage"]>
  export type MessageUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessageUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageUsage"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      regularMessages: number
      premiumMessages: number
      resetDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["messageUsage"]>
    composites: {}
  }

  type MessageUsageGetPayload<S extends boolean | null | undefined | MessageUsageDefaultArgs> = $Result.GetResult<Prisma.$MessageUsagePayload, S>

  type MessageUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageUsageCountAggregateInputType | true
    }

  export interface MessageUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageUsage'], meta: { name: 'MessageUsage' } }
    /**
     * Find zero or one MessageUsage that matches the filter.
     * @param {MessageUsageFindUniqueArgs} args - Arguments to find a MessageUsage
     * @example
     * // Get one MessageUsage
     * const messageUsage = await prisma.messageUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageUsageFindUniqueArgs>(args: SelectSubset<T, MessageUsageFindUniqueArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageUsageFindUniqueOrThrowArgs} args - Arguments to find a MessageUsage
     * @example
     * // Get one MessageUsage
     * const messageUsage = await prisma.messageUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageFindFirstArgs} args - Arguments to find a MessageUsage
     * @example
     * // Get one MessageUsage
     * const messageUsage = await prisma.messageUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageUsageFindFirstArgs>(args?: SelectSubset<T, MessageUsageFindFirstArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageFindFirstOrThrowArgs} args - Arguments to find a MessageUsage
     * @example
     * // Get one MessageUsage
     * const messageUsage = await prisma.messageUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageUsages
     * const messageUsages = await prisma.messageUsage.findMany()
     * 
     * // Get first 10 MessageUsages
     * const messageUsages = await prisma.messageUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageUsageWithIdOnly = await prisma.messageUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageUsageFindManyArgs>(args?: SelectSubset<T, MessageUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageUsage.
     * @param {MessageUsageCreateArgs} args - Arguments to create a MessageUsage.
     * @example
     * // Create one MessageUsage
     * const MessageUsage = await prisma.messageUsage.create({
     *   data: {
     *     // ... data to create a MessageUsage
     *   }
     * })
     * 
     */
    create<T extends MessageUsageCreateArgs>(args: SelectSubset<T, MessageUsageCreateArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageUsages.
     * @param {MessageUsageCreateManyArgs} args - Arguments to create many MessageUsages.
     * @example
     * // Create many MessageUsages
     * const messageUsage = await prisma.messageUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageUsageCreateManyArgs>(args?: SelectSubset<T, MessageUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageUsages and returns the data saved in the database.
     * @param {MessageUsageCreateManyAndReturnArgs} args - Arguments to create many MessageUsages.
     * @example
     * // Create many MessageUsages
     * const messageUsage = await prisma.messageUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageUsages and only return the `id`
     * const messageUsageWithIdOnly = await prisma.messageUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageUsage.
     * @param {MessageUsageDeleteArgs} args - Arguments to delete one MessageUsage.
     * @example
     * // Delete one MessageUsage
     * const MessageUsage = await prisma.messageUsage.delete({
     *   where: {
     *     // ... filter to delete one MessageUsage
     *   }
     * })
     * 
     */
    delete<T extends MessageUsageDeleteArgs>(args: SelectSubset<T, MessageUsageDeleteArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageUsage.
     * @param {MessageUsageUpdateArgs} args - Arguments to update one MessageUsage.
     * @example
     * // Update one MessageUsage
     * const messageUsage = await prisma.messageUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUsageUpdateArgs>(args: SelectSubset<T, MessageUsageUpdateArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageUsages.
     * @param {MessageUsageDeleteManyArgs} args - Arguments to filter MessageUsages to delete.
     * @example
     * // Delete a few MessageUsages
     * const { count } = await prisma.messageUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageUsageDeleteManyArgs>(args?: SelectSubset<T, MessageUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageUsages
     * const messageUsage = await prisma.messageUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUsageUpdateManyArgs>(args: SelectSubset<T, MessageUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageUsages and returns the data updated in the database.
     * @param {MessageUsageUpdateManyAndReturnArgs} args - Arguments to update many MessageUsages.
     * @example
     * // Update many MessageUsages
     * const messageUsage = await prisma.messageUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageUsages and only return the `id`
     * const messageUsageWithIdOnly = await prisma.messageUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageUsage.
     * @param {MessageUsageUpsertArgs} args - Arguments to update or create a MessageUsage.
     * @example
     * // Update or create a MessageUsage
     * const messageUsage = await prisma.messageUsage.upsert({
     *   create: {
     *     // ... data to create a MessageUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageUsage we want to update
     *   }
     * })
     */
    upsert<T extends MessageUsageUpsertArgs>(args: SelectSubset<T, MessageUsageUpsertArgs<ExtArgs>>): Prisma__MessageUsageClient<$Result.GetResult<Prisma.$MessageUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageCountArgs} args - Arguments to filter MessageUsages to count.
     * @example
     * // Count the number of MessageUsages
     * const count = await prisma.messageUsage.count({
     *   where: {
     *     // ... the filter for the MessageUsages we want to count
     *   }
     * })
    **/
    count<T extends MessageUsageCountArgs>(
      args?: Subset<T, MessageUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageUsageAggregateArgs>(args: Subset<T, MessageUsageAggregateArgs>): Prisma.PrismaPromise<GetMessageUsageAggregateType<T>>

    /**
     * Group by MessageUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageUsageGroupByArgs['orderBy'] }
        : { orderBy?: MessageUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageUsage model
   */
  readonly fields: MessageUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageUsage model
   */
  interface MessageUsageFieldRefs {
    readonly id: FieldRef<"MessageUsage", 'String'>
    readonly userId: FieldRef<"MessageUsage", 'String'>
    readonly regularMessages: FieldRef<"MessageUsage", 'Int'>
    readonly premiumMessages: FieldRef<"MessageUsage", 'Int'>
    readonly resetDate: FieldRef<"MessageUsage", 'DateTime'>
    readonly createdAt: FieldRef<"MessageUsage", 'DateTime'>
    readonly updatedAt: FieldRef<"MessageUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageUsage findUnique
   */
  export type MessageUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter, which MessageUsage to fetch.
     */
    where: MessageUsageWhereUniqueInput
  }

  /**
   * MessageUsage findUniqueOrThrow
   */
  export type MessageUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter, which MessageUsage to fetch.
     */
    where: MessageUsageWhereUniqueInput
  }

  /**
   * MessageUsage findFirst
   */
  export type MessageUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter, which MessageUsage to fetch.
     */
    where?: MessageUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageUsages to fetch.
     */
    orderBy?: MessageUsageOrderByWithRelationInput | MessageUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageUsages.
     */
    cursor?: MessageUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageUsages.
     */
    distinct?: MessageUsageScalarFieldEnum | MessageUsageScalarFieldEnum[]
  }

  /**
   * MessageUsage findFirstOrThrow
   */
  export type MessageUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter, which MessageUsage to fetch.
     */
    where?: MessageUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageUsages to fetch.
     */
    orderBy?: MessageUsageOrderByWithRelationInput | MessageUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageUsages.
     */
    cursor?: MessageUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageUsages.
     */
    distinct?: MessageUsageScalarFieldEnum | MessageUsageScalarFieldEnum[]
  }

  /**
   * MessageUsage findMany
   */
  export type MessageUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter, which MessageUsages to fetch.
     */
    where?: MessageUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageUsages to fetch.
     */
    orderBy?: MessageUsageOrderByWithRelationInput | MessageUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageUsages.
     */
    cursor?: MessageUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageUsages.
     */
    skip?: number
    distinct?: MessageUsageScalarFieldEnum | MessageUsageScalarFieldEnum[]
  }

  /**
   * MessageUsage create
   */
  export type MessageUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageUsage.
     */
    data: XOR<MessageUsageCreateInput, MessageUsageUncheckedCreateInput>
  }

  /**
   * MessageUsage createMany
   */
  export type MessageUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageUsages.
     */
    data: MessageUsageCreateManyInput | MessageUsageCreateManyInput[]
  }

  /**
   * MessageUsage createManyAndReturn
   */
  export type MessageUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * The data used to create many MessageUsages.
     */
    data: MessageUsageCreateManyInput | MessageUsageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageUsage update
   */
  export type MessageUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageUsage.
     */
    data: XOR<MessageUsageUpdateInput, MessageUsageUncheckedUpdateInput>
    /**
     * Choose, which MessageUsage to update.
     */
    where: MessageUsageWhereUniqueInput
  }

  /**
   * MessageUsage updateMany
   */
  export type MessageUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageUsages.
     */
    data: XOR<MessageUsageUpdateManyMutationInput, MessageUsageUncheckedUpdateManyInput>
    /**
     * Filter which MessageUsages to update
     */
    where?: MessageUsageWhereInput
    /**
     * Limit how many MessageUsages to update.
     */
    limit?: number
  }

  /**
   * MessageUsage updateManyAndReturn
   */
  export type MessageUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * The data used to update MessageUsages.
     */
    data: XOR<MessageUsageUpdateManyMutationInput, MessageUsageUncheckedUpdateManyInput>
    /**
     * Filter which MessageUsages to update
     */
    where?: MessageUsageWhereInput
    /**
     * Limit how many MessageUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageUsage upsert
   */
  export type MessageUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageUsage to update in case it exists.
     */
    where: MessageUsageWhereUniqueInput
    /**
     * In case the MessageUsage found by the `where` argument doesn't exist, create a new MessageUsage with this data.
     */
    create: XOR<MessageUsageCreateInput, MessageUsageUncheckedCreateInput>
    /**
     * In case the MessageUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUsageUpdateInput, MessageUsageUncheckedUpdateInput>
  }

  /**
   * MessageUsage delete
   */
  export type MessageUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
    /**
     * Filter which MessageUsage to delete.
     */
    where: MessageUsageWhereUniqueInput
  }

  /**
   * MessageUsage deleteMany
   */
  export type MessageUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageUsages to delete
     */
    where?: MessageUsageWhereInput
    /**
     * Limit how many MessageUsages to delete.
     */
    limit?: number
  }

  /**
   * MessageUsage without action
   */
  export type MessageUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageUsage
     */
    select?: MessageUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageUsage
     */
    omit?: MessageUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageUsageInclude<ExtArgs> | null
  }


  /**
   * Model AnonymousUsage
   */

  export type AggregateAnonymousUsage = {
    _count: AnonymousUsageCountAggregateOutputType | null
    _avg: AnonymousUsageAvgAggregateOutputType | null
    _sum: AnonymousUsageSumAggregateOutputType | null
    _min: AnonymousUsageMinAggregateOutputType | null
    _max: AnonymousUsageMaxAggregateOutputType | null
  }

  export type AnonymousUsageAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type AnonymousUsageSumAggregateOutputType = {
    messageCount: number | null
  }

  export type AnonymousUsageMinAggregateOutputType = {
    id: string | null
    ipAddress: string | null
    messageCount: number | null
    resetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousUsageMaxAggregateOutputType = {
    id: string | null
    ipAddress: string | null
    messageCount: number | null
    resetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousUsageCountAggregateOutputType = {
    id: number
    ipAddress: number
    messageCount: number
    resetDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnonymousUsageAvgAggregateInputType = {
    messageCount?: true
  }

  export type AnonymousUsageSumAggregateInputType = {
    messageCount?: true
  }

  export type AnonymousUsageMinAggregateInputType = {
    id?: true
    ipAddress?: true
    messageCount?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousUsageMaxAggregateInputType = {
    id?: true
    ipAddress?: true
    messageCount?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousUsageCountAggregateInputType = {
    id?: true
    ipAddress?: true
    messageCount?: true
    resetDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnonymousUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousUsage to aggregate.
     */
    where?: AnonymousUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsages to fetch.
     */
    orderBy?: AnonymousUsageOrderByWithRelationInput | AnonymousUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnonymousUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnonymousUsages
    **/
    _count?: true | AnonymousUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnonymousUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnonymousUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnonymousUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnonymousUsageMaxAggregateInputType
  }

  export type GetAnonymousUsageAggregateType<T extends AnonymousUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateAnonymousUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnonymousUsage[P]>
      : GetScalarType<T[P], AggregateAnonymousUsage[P]>
  }




  export type AnonymousUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnonymousUsageWhereInput
    orderBy?: AnonymousUsageOrderByWithAggregationInput | AnonymousUsageOrderByWithAggregationInput[]
    by: AnonymousUsageScalarFieldEnum[] | AnonymousUsageScalarFieldEnum
    having?: AnonymousUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnonymousUsageCountAggregateInputType | true
    _avg?: AnonymousUsageAvgAggregateInputType
    _sum?: AnonymousUsageSumAggregateInputType
    _min?: AnonymousUsageMinAggregateInputType
    _max?: AnonymousUsageMaxAggregateInputType
  }

  export type AnonymousUsageGroupByOutputType = {
    id: string
    ipAddress: string
    messageCount: number
    resetDate: Date
    createdAt: Date
    updatedAt: Date
    _count: AnonymousUsageCountAggregateOutputType | null
    _avg: AnonymousUsageAvgAggregateOutputType | null
    _sum: AnonymousUsageSumAggregateOutputType | null
    _min: AnonymousUsageMinAggregateOutputType | null
    _max: AnonymousUsageMaxAggregateOutputType | null
  }

  type GetAnonymousUsageGroupByPayload<T extends AnonymousUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnonymousUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnonymousUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnonymousUsageGroupByOutputType[P]>
            : GetScalarType<T[P], AnonymousUsageGroupByOutputType[P]>
        }
      >
    >


  export type AnonymousUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ipAddress?: boolean
    messageCount?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousUsage"]>

  export type AnonymousUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ipAddress?: boolean
    messageCount?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousUsage"]>

  export type AnonymousUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ipAddress?: boolean
    messageCount?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousUsage"]>

  export type AnonymousUsageSelectScalar = {
    id?: boolean
    ipAddress?: boolean
    messageCount?: boolean
    resetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnonymousUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ipAddress" | "messageCount" | "resetDate" | "createdAt" | "updatedAt", ExtArgs["result"]["anonymousUsage"]>

  export type $AnonymousUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnonymousUsage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ipAddress: string
      messageCount: number
      resetDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["anonymousUsage"]>
    composites: {}
  }

  type AnonymousUsageGetPayload<S extends boolean | null | undefined | AnonymousUsageDefaultArgs> = $Result.GetResult<Prisma.$AnonymousUsagePayload, S>

  type AnonymousUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnonymousUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnonymousUsageCountAggregateInputType | true
    }

  export interface AnonymousUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnonymousUsage'], meta: { name: 'AnonymousUsage' } }
    /**
     * Find zero or one AnonymousUsage that matches the filter.
     * @param {AnonymousUsageFindUniqueArgs} args - Arguments to find a AnonymousUsage
     * @example
     * // Get one AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnonymousUsageFindUniqueArgs>(args: SelectSubset<T, AnonymousUsageFindUniqueArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnonymousUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnonymousUsageFindUniqueOrThrowArgs} args - Arguments to find a AnonymousUsage
     * @example
     * // Get one AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnonymousUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, AnonymousUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageFindFirstArgs} args - Arguments to find a AnonymousUsage
     * @example
     * // Get one AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnonymousUsageFindFirstArgs>(args?: SelectSubset<T, AnonymousUsageFindFirstArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageFindFirstOrThrowArgs} args - Arguments to find a AnonymousUsage
     * @example
     * // Get one AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnonymousUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, AnonymousUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnonymousUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnonymousUsages
     * const anonymousUsages = await prisma.anonymousUsage.findMany()
     * 
     * // Get first 10 AnonymousUsages
     * const anonymousUsages = await prisma.anonymousUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anonymousUsageWithIdOnly = await prisma.anonymousUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnonymousUsageFindManyArgs>(args?: SelectSubset<T, AnonymousUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnonymousUsage.
     * @param {AnonymousUsageCreateArgs} args - Arguments to create a AnonymousUsage.
     * @example
     * // Create one AnonymousUsage
     * const AnonymousUsage = await prisma.anonymousUsage.create({
     *   data: {
     *     // ... data to create a AnonymousUsage
     *   }
     * })
     * 
     */
    create<T extends AnonymousUsageCreateArgs>(args: SelectSubset<T, AnonymousUsageCreateArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnonymousUsages.
     * @param {AnonymousUsageCreateManyArgs} args - Arguments to create many AnonymousUsages.
     * @example
     * // Create many AnonymousUsages
     * const anonymousUsage = await prisma.anonymousUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnonymousUsageCreateManyArgs>(args?: SelectSubset<T, AnonymousUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnonymousUsages and returns the data saved in the database.
     * @param {AnonymousUsageCreateManyAndReturnArgs} args - Arguments to create many AnonymousUsages.
     * @example
     * // Create many AnonymousUsages
     * const anonymousUsage = await prisma.anonymousUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnonymousUsages and only return the `id`
     * const anonymousUsageWithIdOnly = await prisma.anonymousUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnonymousUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, AnonymousUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnonymousUsage.
     * @param {AnonymousUsageDeleteArgs} args - Arguments to delete one AnonymousUsage.
     * @example
     * // Delete one AnonymousUsage
     * const AnonymousUsage = await prisma.anonymousUsage.delete({
     *   where: {
     *     // ... filter to delete one AnonymousUsage
     *   }
     * })
     * 
     */
    delete<T extends AnonymousUsageDeleteArgs>(args: SelectSubset<T, AnonymousUsageDeleteArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnonymousUsage.
     * @param {AnonymousUsageUpdateArgs} args - Arguments to update one AnonymousUsage.
     * @example
     * // Update one AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnonymousUsageUpdateArgs>(args: SelectSubset<T, AnonymousUsageUpdateArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnonymousUsages.
     * @param {AnonymousUsageDeleteManyArgs} args - Arguments to filter AnonymousUsages to delete.
     * @example
     * // Delete a few AnonymousUsages
     * const { count } = await prisma.anonymousUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnonymousUsageDeleteManyArgs>(args?: SelectSubset<T, AnonymousUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnonymousUsages
     * const anonymousUsage = await prisma.anonymousUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnonymousUsageUpdateManyArgs>(args: SelectSubset<T, AnonymousUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousUsages and returns the data updated in the database.
     * @param {AnonymousUsageUpdateManyAndReturnArgs} args - Arguments to update many AnonymousUsages.
     * @example
     * // Update many AnonymousUsages
     * const anonymousUsage = await prisma.anonymousUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnonymousUsages and only return the `id`
     * const anonymousUsageWithIdOnly = await prisma.anonymousUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnonymousUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, AnonymousUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnonymousUsage.
     * @param {AnonymousUsageUpsertArgs} args - Arguments to update or create a AnonymousUsage.
     * @example
     * // Update or create a AnonymousUsage
     * const anonymousUsage = await prisma.anonymousUsage.upsert({
     *   create: {
     *     // ... data to create a AnonymousUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnonymousUsage we want to update
     *   }
     * })
     */
    upsert<T extends AnonymousUsageUpsertArgs>(args: SelectSubset<T, AnonymousUsageUpsertArgs<ExtArgs>>): Prisma__AnonymousUsageClient<$Result.GetResult<Prisma.$AnonymousUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnonymousUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageCountArgs} args - Arguments to filter AnonymousUsages to count.
     * @example
     * // Count the number of AnonymousUsages
     * const count = await prisma.anonymousUsage.count({
     *   where: {
     *     // ... the filter for the AnonymousUsages we want to count
     *   }
     * })
    **/
    count<T extends AnonymousUsageCountArgs>(
      args?: Subset<T, AnonymousUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnonymousUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnonymousUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnonymousUsageAggregateArgs>(args: Subset<T, AnonymousUsageAggregateArgs>): Prisma.PrismaPromise<GetAnonymousUsageAggregateType<T>>

    /**
     * Group by AnonymousUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnonymousUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnonymousUsageGroupByArgs['orderBy'] }
        : { orderBy?: AnonymousUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnonymousUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnonymousUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnonymousUsage model
   */
  readonly fields: AnonymousUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnonymousUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnonymousUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnonymousUsage model
   */
  interface AnonymousUsageFieldRefs {
    readonly id: FieldRef<"AnonymousUsage", 'String'>
    readonly ipAddress: FieldRef<"AnonymousUsage", 'String'>
    readonly messageCount: FieldRef<"AnonymousUsage", 'Int'>
    readonly resetDate: FieldRef<"AnonymousUsage", 'DateTime'>
    readonly createdAt: FieldRef<"AnonymousUsage", 'DateTime'>
    readonly updatedAt: FieldRef<"AnonymousUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnonymousUsage findUnique
   */
  export type AnonymousUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousUsage to fetch.
     */
    where: AnonymousUsageWhereUniqueInput
  }

  /**
   * AnonymousUsage findUniqueOrThrow
   */
  export type AnonymousUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousUsage to fetch.
     */
    where: AnonymousUsageWhereUniqueInput
  }

  /**
   * AnonymousUsage findFirst
   */
  export type AnonymousUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousUsage to fetch.
     */
    where?: AnonymousUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsages to fetch.
     */
    orderBy?: AnonymousUsageOrderByWithRelationInput | AnonymousUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousUsages.
     */
    cursor?: AnonymousUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousUsages.
     */
    distinct?: AnonymousUsageScalarFieldEnum | AnonymousUsageScalarFieldEnum[]
  }

  /**
   * AnonymousUsage findFirstOrThrow
   */
  export type AnonymousUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousUsage to fetch.
     */
    where?: AnonymousUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsages to fetch.
     */
    orderBy?: AnonymousUsageOrderByWithRelationInput | AnonymousUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousUsages.
     */
    cursor?: AnonymousUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousUsages.
     */
    distinct?: AnonymousUsageScalarFieldEnum | AnonymousUsageScalarFieldEnum[]
  }

  /**
   * AnonymousUsage findMany
   */
  export type AnonymousUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousUsages to fetch.
     */
    where?: AnonymousUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousUsages to fetch.
     */
    orderBy?: AnonymousUsageOrderByWithRelationInput | AnonymousUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnonymousUsages.
     */
    cursor?: AnonymousUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousUsages.
     */
    skip?: number
    distinct?: AnonymousUsageScalarFieldEnum | AnonymousUsageScalarFieldEnum[]
  }

  /**
   * AnonymousUsage create
   */
  export type AnonymousUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * The data needed to create a AnonymousUsage.
     */
    data: XOR<AnonymousUsageCreateInput, AnonymousUsageUncheckedCreateInput>
  }

  /**
   * AnonymousUsage createMany
   */
  export type AnonymousUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnonymousUsages.
     */
    data: AnonymousUsageCreateManyInput | AnonymousUsageCreateManyInput[]
  }

  /**
   * AnonymousUsage createManyAndReturn
   */
  export type AnonymousUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * The data used to create many AnonymousUsages.
     */
    data: AnonymousUsageCreateManyInput | AnonymousUsageCreateManyInput[]
  }

  /**
   * AnonymousUsage update
   */
  export type AnonymousUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * The data needed to update a AnonymousUsage.
     */
    data: XOR<AnonymousUsageUpdateInput, AnonymousUsageUncheckedUpdateInput>
    /**
     * Choose, which AnonymousUsage to update.
     */
    where: AnonymousUsageWhereUniqueInput
  }

  /**
   * AnonymousUsage updateMany
   */
  export type AnonymousUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnonymousUsages.
     */
    data: XOR<AnonymousUsageUpdateManyMutationInput, AnonymousUsageUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousUsages to update
     */
    where?: AnonymousUsageWhereInput
    /**
     * Limit how many AnonymousUsages to update.
     */
    limit?: number
  }

  /**
   * AnonymousUsage updateManyAndReturn
   */
  export type AnonymousUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * The data used to update AnonymousUsages.
     */
    data: XOR<AnonymousUsageUpdateManyMutationInput, AnonymousUsageUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousUsages to update
     */
    where?: AnonymousUsageWhereInput
    /**
     * Limit how many AnonymousUsages to update.
     */
    limit?: number
  }

  /**
   * AnonymousUsage upsert
   */
  export type AnonymousUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * The filter to search for the AnonymousUsage to update in case it exists.
     */
    where: AnonymousUsageWhereUniqueInput
    /**
     * In case the AnonymousUsage found by the `where` argument doesn't exist, create a new AnonymousUsage with this data.
     */
    create: XOR<AnonymousUsageCreateInput, AnonymousUsageUncheckedCreateInput>
    /**
     * In case the AnonymousUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnonymousUsageUpdateInput, AnonymousUsageUncheckedUpdateInput>
  }

  /**
   * AnonymousUsage delete
   */
  export type AnonymousUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
    /**
     * Filter which AnonymousUsage to delete.
     */
    where: AnonymousUsageWhereUniqueInput
  }

  /**
   * AnonymousUsage deleteMany
   */
  export type AnonymousUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousUsages to delete
     */
    where?: AnonymousUsageWhereInput
    /**
     * Limit how many AnonymousUsages to delete.
     */
    limit?: number
  }

  /**
   * AnonymousUsage without action
   */
  export type AnonymousUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousUsage
     */
    select?: AnonymousUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousUsage
     */
    omit?: AnonymousUsageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    name: 'name',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    subscriptionTier: 'subscriptionTier'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MessageUsageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    regularMessages: 'regularMessages',
    premiumMessages: 'premiumMessages',
    resetDate: 'resetDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageUsageScalarFieldEnum = (typeof MessageUsageScalarFieldEnum)[keyof typeof MessageUsageScalarFieldEnum]


  export const AnonymousUsageScalarFieldEnum: {
    id: 'id',
    ipAddress: 'ipAddress',
    messageCount: 'messageCount',
    resetDate: 'resetDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnonymousUsageScalarFieldEnum = (typeof AnonymousUsageScalarFieldEnum)[keyof typeof AnonymousUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptionTier?: StringFilter<"User"> | string
    messageUsage?: MessageUsageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionTier?: SortOrder
    messageUsage?: MessageUsageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptionTier?: StringFilter<"User"> | string
    messageUsage?: MessageUsageListRelationFilter
  }, "id" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionTier?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    subscriptionTier?: StringWithAggregatesFilter<"User"> | string
  }

  export type MessageUsageWhereInput = {
    AND?: MessageUsageWhereInput | MessageUsageWhereInput[]
    OR?: MessageUsageWhereInput[]
    NOT?: MessageUsageWhereInput | MessageUsageWhereInput[]
    id?: StringFilter<"MessageUsage"> | string
    userId?: StringFilter<"MessageUsage"> | string
    regularMessages?: IntFilter<"MessageUsage"> | number
    premiumMessages?: IntFilter<"MessageUsage"> | number
    resetDate?: DateTimeFilter<"MessageUsage"> | Date | string
    createdAt?: DateTimeFilter<"MessageUsage"> | Date | string
    updatedAt?: DateTimeFilter<"MessageUsage"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageUsageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MessageUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageUsageWhereInput | MessageUsageWhereInput[]
    OR?: MessageUsageWhereInput[]
    NOT?: MessageUsageWhereInput | MessageUsageWhereInput[]
    userId?: StringFilter<"MessageUsage"> | string
    regularMessages?: IntFilter<"MessageUsage"> | number
    premiumMessages?: IntFilter<"MessageUsage"> | number
    resetDate?: DateTimeFilter<"MessageUsage"> | Date | string
    createdAt?: DateTimeFilter<"MessageUsage"> | Date | string
    updatedAt?: DateTimeFilter<"MessageUsage"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageUsageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageUsageCountOrderByAggregateInput
    _avg?: MessageUsageAvgOrderByAggregateInput
    _max?: MessageUsageMaxOrderByAggregateInput
    _min?: MessageUsageMinOrderByAggregateInput
    _sum?: MessageUsageSumOrderByAggregateInput
  }

  export type MessageUsageScalarWhereWithAggregatesInput = {
    AND?: MessageUsageScalarWhereWithAggregatesInput | MessageUsageScalarWhereWithAggregatesInput[]
    OR?: MessageUsageScalarWhereWithAggregatesInput[]
    NOT?: MessageUsageScalarWhereWithAggregatesInput | MessageUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageUsage"> | string
    userId?: StringWithAggregatesFilter<"MessageUsage"> | string
    regularMessages?: IntWithAggregatesFilter<"MessageUsage"> | number
    premiumMessages?: IntWithAggregatesFilter<"MessageUsage"> | number
    resetDate?: DateTimeWithAggregatesFilter<"MessageUsage"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"MessageUsage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MessageUsage"> | Date | string
  }

  export type AnonymousUsageWhereInput = {
    AND?: AnonymousUsageWhereInput | AnonymousUsageWhereInput[]
    OR?: AnonymousUsageWhereInput[]
    NOT?: AnonymousUsageWhereInput | AnonymousUsageWhereInput[]
    id?: StringFilter<"AnonymousUsage"> | string
    ipAddress?: StringFilter<"AnonymousUsage"> | string
    messageCount?: IntFilter<"AnonymousUsage"> | number
    resetDate?: DateTimeFilter<"AnonymousUsage"> | Date | string
    createdAt?: DateTimeFilter<"AnonymousUsage"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousUsage"> | Date | string
  }

  export type AnonymousUsageOrderByWithRelationInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    messageCount?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ipAddress?: string
    AND?: AnonymousUsageWhereInput | AnonymousUsageWhereInput[]
    OR?: AnonymousUsageWhereInput[]
    NOT?: AnonymousUsageWhereInput | AnonymousUsageWhereInput[]
    messageCount?: IntFilter<"AnonymousUsage"> | number
    resetDate?: DateTimeFilter<"AnonymousUsage"> | Date | string
    createdAt?: DateTimeFilter<"AnonymousUsage"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousUsage"> | Date | string
  }, "id" | "ipAddress">

  export type AnonymousUsageOrderByWithAggregationInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    messageCount?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnonymousUsageCountOrderByAggregateInput
    _avg?: AnonymousUsageAvgOrderByAggregateInput
    _max?: AnonymousUsageMaxOrderByAggregateInput
    _min?: AnonymousUsageMinOrderByAggregateInput
    _sum?: AnonymousUsageSumOrderByAggregateInput
  }

  export type AnonymousUsageScalarWhereWithAggregatesInput = {
    AND?: AnonymousUsageScalarWhereWithAggregatesInput | AnonymousUsageScalarWhereWithAggregatesInput[]
    OR?: AnonymousUsageScalarWhereWithAggregatesInput[]
    NOT?: AnonymousUsageScalarWhereWithAggregatesInput | AnonymousUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnonymousUsage"> | string
    ipAddress?: StringWithAggregatesFilter<"AnonymousUsage"> | string
    messageCount?: IntWithAggregatesFilter<"AnonymousUsage"> | number
    resetDate?: DateTimeWithAggregatesFilter<"AnonymousUsage"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AnonymousUsage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AnonymousUsage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionTier?: string
    messageUsage?: MessageUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionTier?: string
    messageUsage?: MessageUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    messageUsage?: MessageUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    messageUsage?: MessageUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionTier?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUsageCreateInput = {
    id?: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMessageUsageInput
  }

  export type MessageUsageUncheckedCreateInput = {
    id?: string
    userId: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessageUsageNestedInput
  }

  export type MessageUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUsageCreateManyInput = {
    id?: string
    userId: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousUsageCreateInput = {
    id?: string
    ipAddress: string
    messageCount?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousUsageUncheckedCreateInput = {
    id?: string
    ipAddress: string
    messageCount?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    messageCount?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    messageCount?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousUsageCreateManyInput = {
    id?: string
    ipAddress: string
    messageCount?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    messageCount?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    messageCount?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageUsageListRelationFilter = {
    every?: MessageUsageWhereInput
    some?: MessageUsageWhereInput
    none?: MessageUsageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionTier?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionTier?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionTier?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MessageUsageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageUsageAvgOrderByAggregateInput = {
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
  }

  export type MessageUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageUsageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageUsageSumOrderByAggregateInput = {
    regularMessages?: SortOrder
    premiumMessages?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AnonymousUsageCountOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    messageCount?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousUsageAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type AnonymousUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    messageCount?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousUsageMinOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    messageCount?: SortOrder
    resetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousUsageSumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type MessageUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput> | MessageUsageCreateWithoutUserInput[] | MessageUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageUsageCreateOrConnectWithoutUserInput | MessageUsageCreateOrConnectWithoutUserInput[]
    createMany?: MessageUsageCreateManyUserInputEnvelope
    connect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
  }

  export type MessageUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput> | MessageUsageCreateWithoutUserInput[] | MessageUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageUsageCreateOrConnectWithoutUserInput | MessageUsageCreateOrConnectWithoutUserInput[]
    createMany?: MessageUsageCreateManyUserInputEnvelope
    connect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput> | MessageUsageCreateWithoutUserInput[] | MessageUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageUsageCreateOrConnectWithoutUserInput | MessageUsageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUsageUpsertWithWhereUniqueWithoutUserInput | MessageUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageUsageCreateManyUserInputEnvelope
    set?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    disconnect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    delete?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    connect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    update?: MessageUsageUpdateWithWhereUniqueWithoutUserInput | MessageUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUsageUpdateManyWithWhereWithoutUserInput | MessageUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageUsageScalarWhereInput | MessageUsageScalarWhereInput[]
  }

  export type MessageUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput> | MessageUsageCreateWithoutUserInput[] | MessageUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageUsageCreateOrConnectWithoutUserInput | MessageUsageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUsageUpsertWithWhereUniqueWithoutUserInput | MessageUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageUsageCreateManyUserInputEnvelope
    set?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    disconnect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    delete?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    connect?: MessageUsageWhereUniqueInput | MessageUsageWhereUniqueInput[]
    update?: MessageUsageUpdateWithWhereUniqueWithoutUserInput | MessageUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUsageUpdateManyWithWhereWithoutUserInput | MessageUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageUsageScalarWhereInput | MessageUsageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMessageUsageInput = {
    create?: XOR<UserCreateWithoutMessageUsageInput, UserUncheckedCreateWithoutMessageUsageInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessageUsageInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMessageUsageNestedInput = {
    create?: XOR<UserCreateWithoutMessageUsageInput, UserUncheckedCreateWithoutMessageUsageInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessageUsageInput
    upsert?: UserUpsertWithoutMessageUsageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessageUsageInput, UserUpdateWithoutMessageUsageInput>, UserUncheckedUpdateWithoutMessageUsageInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MessageUsageCreateWithoutUserInput = {
    id?: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUsageUncheckedCreateWithoutUserInput = {
    id?: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUsageCreateOrConnectWithoutUserInput = {
    where: MessageUsageWhereUniqueInput
    create: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput>
  }

  export type MessageUsageCreateManyUserInputEnvelope = {
    data: MessageUsageCreateManyUserInput | MessageUsageCreateManyUserInput[]
  }

  export type MessageUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageUsageWhereUniqueInput
    update: XOR<MessageUsageUpdateWithoutUserInput, MessageUsageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageUsageCreateWithoutUserInput, MessageUsageUncheckedCreateWithoutUserInput>
  }

  export type MessageUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageUsageWhereUniqueInput
    data: XOR<MessageUsageUpdateWithoutUserInput, MessageUsageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUsageUpdateManyWithWhereWithoutUserInput = {
    where: MessageUsageScalarWhereInput
    data: XOR<MessageUsageUpdateManyMutationInput, MessageUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageUsageScalarWhereInput = {
    AND?: MessageUsageScalarWhereInput | MessageUsageScalarWhereInput[]
    OR?: MessageUsageScalarWhereInput[]
    NOT?: MessageUsageScalarWhereInput | MessageUsageScalarWhereInput[]
    id?: StringFilter<"MessageUsage"> | string
    userId?: StringFilter<"MessageUsage"> | string
    regularMessages?: IntFilter<"MessageUsage"> | number
    premiumMessages?: IntFilter<"MessageUsage"> | number
    resetDate?: DateTimeFilter<"MessageUsage"> | Date | string
    createdAt?: DateTimeFilter<"MessageUsage"> | Date | string
    updatedAt?: DateTimeFilter<"MessageUsage"> | Date | string
  }

  export type UserCreateWithoutMessageUsageInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionTier?: string
  }

  export type UserUncheckedCreateWithoutMessageUsageInput = {
    id?: string
    clerkId: string
    email?: string | null
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionTier?: string
  }

  export type UserCreateOrConnectWithoutMessageUsageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessageUsageInput, UserUncheckedCreateWithoutMessageUsageInput>
  }

  export type UserUpsertWithoutMessageUsageInput = {
    update: XOR<UserUpdateWithoutMessageUsageInput, UserUncheckedUpdateWithoutMessageUsageInput>
    create: XOR<UserCreateWithoutMessageUsageInput, UserUncheckedCreateWithoutMessageUsageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessageUsageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessageUsageInput, UserUncheckedUpdateWithoutMessageUsageInput>
  }

  export type UserUpdateWithoutMessageUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutMessageUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionTier?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUsageCreateManyUserInput = {
    id?: string
    regularMessages?: number
    premiumMessages?: number
    resetDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUsageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUsageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUsageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    regularMessages?: IntFieldUpdateOperationsInput | number
    premiumMessages?: IntFieldUpdateOperationsInput | number
    resetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}