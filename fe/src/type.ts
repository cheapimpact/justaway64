export type MyOCR = {
  error?: string;
  paragraphs?: [
    {
      text: string;
      boundingPoly?: any;
    }
  ];
  form?: [{ key: string; value: any; boundingPoly: any }];
  table?: [{ header: string[]; body: string[] }];
  text?: string[];
};
