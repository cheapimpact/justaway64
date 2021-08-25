import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Card } from "../../components/customs/Card/Card";
import { NoteWrapper } from "../../components/notes/NoteWrapper";
import { useNoteQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

interface ViewNoteProps {}

const ViewNote: React.FC<ViewNoteProps> = ({}) => {
  // const { meData } = useContext(NoteContext);

  const intId = useGetIntId();
  const { colorMode } = useColorMode();
  const [{ data, fetching, error }] = useNoteQuery({
    // -1 kalau misal dapet id yg params aneh aneh, jadi gausah ngirim respon ke server
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  return (
    <NoteWrapper>
      <Card w="80%">
        <Heading>{data?.note?.title}</Heading>
        <Box dangerouslySetInnerHTML={{ __html: data?.note?.text as string }} />
      </Card>
    </NoteWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ViewNote);
