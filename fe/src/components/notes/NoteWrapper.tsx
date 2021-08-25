import React, { useContext } from "react";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { Header } from "./NoteNavBar";

import { createContext } from "react";

export const NoteContext = createContext<{ meData: MeQuery | undefined }>({
  meData: undefined,
});

interface NoteWrapperProps {}

export const NoteWrapper: React.FC<NoteWrapperProps> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  return (
    <>
      <Header me={data} />
      <NoteContext.Provider value={{ meData: data }}>
        {children}
      </NoteContext.Provider>
    </>
  );
};
