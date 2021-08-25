import { useFormikContext } from "formik";
import debounce from "just-debounce-it";
import React from "react";

interface autosaveFormikProps {
  debounceMs?: number;
  lastSaved: string;
  setLastSaved: React.Dispatch<any>;
}

export const AutosaveFormik: React.FC<autosaveFormikProps> = ({
  debounceMs = 3000,
  lastSaved,
  setLastSaved,
}) => {
  const formik = useFormikContext();
  const debouncedSubmit = React.useCallback(
    debounce(
      () =>
        formik
          .submitForm()
          .then(() =>
            setLastSaved(
              `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            )
          ),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  );

  React.useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  let result = null;

  if (!!formik.isSubmitting) {
    result = "saving...";
  } else if (Object.keys(formik.errors).length > 0) {
    result = `ERROR: ${formik.errors}`;
  } else if (lastSaved !== null) {
    result = `Last Saved: ${lastSaved}`;
  }
  return <>{result}</>;
};
