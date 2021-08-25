import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import Router from "next/router";
import { dedupExchange, Exchange, stringifyVariables } from "urql";
import { pipe, tap } from "wonka";
import {
  CreateNoteMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  NoteDocument,
  NoteQuery,
  RegisterMutation,
  UploadImageMutation,
} from "../generated/graphql";
import notes from "../pages/notes";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    // console.log({ entityKey, fieldName });
    const allFields = cache.inspectFields(entityKey);
    // console.log({ allFields });
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    // console.log({ fieldKey });
    if (size === 0) {
      return undefined;
    }

    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "notes"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    let results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "notes") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      // const _hasMore = cache.resolve();
      results.push(...data);
    });

    return {
      __typename: "PaginatedNotes",
      hasMore,
      notes: results,
    };
  };
};

const invalidateAllNotes = (cache: Cache) => {
  // ini untuk invalidate, jadi pada saa createPOst dipanggil dia ngerefetch data lagi, bukan pake data cache
  // console.log(cache.inspectFields("Query"));
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "notes");
  // console.log({ fieldInfos });

  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "notes", fi.arguments || {});
  });

  // cache.invalidate("Query", "posts", {
  //   limit: 15,
  // });
  // console.log(cache.inspectFields("Query"));
};

// https://github.com/FormidableLabs/urql/issues/225
const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  // ssr thing
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: "http://localhost:4200/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      // updating cache in every query listed here
      cacheExchange({
        keys: { PaginatedNotes: () => null },
        resolvers: {
          Query: {
            notes: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            login: (_result, args, cache, info) => {
              console.log({ _result, args, cache, info });

              // login: (_result: any, args, cache, info) => {
              //   cache.updateQuery({ query: MeDocument }, (data: any): any => {
              //     data.me = _result.login.user;
              //     return data;
              //   });
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => {
                  return {
                    me: null,
                  };
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
            createNote: (_result, args, cache, info) => {
              // betterUpdateQuery<CreateNoteMutation, NoteQuery>(
              //   cache,
              //   { query: MeDocument },
              //   _result,
              //   (result, query) => {
              //     if (result.createNote.errors) {
              //       return query;
              //     } else {
              //       const data = result.createNote.note;
              //       return {
              //         note: null,
              //       };
              //     }
              //   }
              // );
              invalidateAllNotes(cache);
            },
            updateNote: (_result, args, cache, info) => {
              invalidateAllNotes(cache);
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange,
    ],
  };
};
