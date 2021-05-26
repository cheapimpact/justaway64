import { withUrqlClient } from "next-urql";
import React from "react";
import { Header } from "@components/NavBar";
import { useNotesQuery } from "../../generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [{ data }] = useNotesQuery();
  return (
    <>
      <Header />
      {data?.notes.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
