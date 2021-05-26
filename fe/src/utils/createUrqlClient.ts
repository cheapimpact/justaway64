import { dedupExchange, fetchExchange } from "urql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4200/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    // updating cache in every query listed here
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
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
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
