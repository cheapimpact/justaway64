import React, { useState } from "react";
import { Header } from "@components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { Editor } from "@tinymce/tinymce-react";

const CreateNote: React.FC<{}> = ({}) => {
  const [value, setValue] = useState(
    "<p>The quick brown fox jumps over the lazy dog</p>"
  );
  const [text, setText] = useState("");
  return (
    <>
      <Header />
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <pre>{JSON.stringify(text, null, 2)}</pre>

      <Editor
        init={{
          height: 500,
          plugins: "link image code",
          toolbar:
            "undo redo | image  media | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help ",
        }}
        onBeforePaste={(e) => {
          alert("beford");
        }}
        onPaste={(e: any) => {
          const { clipboardData } = e;
          console.log({ clipboardData });

          if (e.clipboardData.files.length) {
            const fileObject = e.clipboardData.files[0];
            console.log({ fileObject });
            e.preventDefault();
            return null;
          }
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: "text" }));
        }}
      />
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(CreateNote);
