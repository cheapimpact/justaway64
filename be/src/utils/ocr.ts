import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "185810990299"; //wasted-64
const location = "us"; // Format is 'us' or 'eu'
// const processorId = "feb66c34a26dc6da"; // Create processor in Cloud Console {OCR} wasted-64
const processorId = "20d61ded071e29dc"; //cheapimapct64 {from p}
const client = new DocumentProcessorServiceClient({
  apiEndpoint: `${location}-documentai.googleapis.com`,
  keyFilename: "wasted2.json",
});

export const doOCR = async (
  encodedImage: string,
  mimetype: string,
  boundingPoly: boolean = false
) => {
  try {
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Process the output
    const responseJson: any = {};
    // console.log({ encodedImage, mimetype });

    // Recognizes text entities in the PDF document
    const [result]: any = await client.processDocument({
      name,
      document: {
        content: encodedImage,
        mimeType: mimetype,
      },
    });
    const { document } = result;
    // Get all of the document text as one big string

    const { text, pages }: any = document;
    console.log({ pages });

    responseJson["text"] = text;
    // Extract shards from the text field
    const getText = (textAnchor: any) => {
      if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
        return "";
      }
      // First shard in document doesn't have startIndex property
      const startIndex = textAnchor.textSegments[0].startIndex || 0;
      const endIndex = textAnchor.textSegments[0].endIndex;
      return text.substring(startIndex, endIndex);
    };
    // Read the text recognition output from the processor
    const textInParagraphs: Array<object> = [];
    // const formInPages: Array<object> = [];
    // const tableInPages: Array<object> = [];
    const formValue: Array<object> = [];
    const tableValue: Array<object> = [];
    pages.forEach((page: any, pageIndex: number) => {
      const { paragraphs, formFields, tables } = page;
      // getting value from paragraphs
      for (const paragraph of paragraphs) {
        const paragraphText = getText(paragraph.layout.textAnchor);
        const paragraphTextBoundinng = paragraph.layout.boundingPoly;
        let data: any = {
          text: paragraphText,
          pageIndex,
        };
        if (boundingPoly) {
          data.boundingPoly = paragraphTextBoundinng;
        }
        textInParagraphs.push(data);
      }
      // // getting value from formFields
      for (const field of formFields) {
        const fieldName = getText(field.fieldName.textAnchor);
        const fieldNameBoundinng = field.fieldName.boundingPoly;
        const fieldValue = getText(field.fieldValue.textAnchor);
        const fieldValueBoundinng = field.fieldValue.boundingPoly;
        let data: any = {
          key: fieldName,
          value: fieldValue,
          pageIndex,
        };
        if (boundingPoly) {
          data.keyBoundingPoly = fieldNameBoundinng;
          data.valueBoundingPoly = fieldValueBoundinng;
        }
        formValue.push(data);
      }
      // formInPages[pageIndex] = formValue;

      // TABLE GAN

      tables.forEach((table: any, i: number) => {
        const [headerRow] = table.headerRows;
        const headerResponse = [];

        for (const tableCell of headerRow.cells) {
          if (tableCell.layout.textAnchor.textSegments) {
            const textAnchor = tableCell.layout.textAnchor;
            const text = getText(textAnchor);
            headerResponse.push(text);
          }
        }
        const bodyRows = table.bodyRows;
        const bodyResponse: any = [];
        bodyRows.forEach((row: any) => {
          for (const tableCell of row.cells) {
            if (tableCell.layout.textAnchor.textSegments) {
              const textAnchor = tableCell.layout.textAnchor;
              const text = getText(textAnchor);
              bodyResponse.push(text);
            }
          }
        });
        console.log({ bodyResponse });

        const tableResponse = {
          header: headerResponse,
          body: bodyResponse,
          pageIndex,
        };
        tableValue[i] = tableResponse;
      });
      // tableInPages[pageIndex] = tableValue;
    });
    responseJson["paragraphs"] = textInParagraphs;
    responseJson["form"] = formValue;
    responseJson["table"] = tableValue;
    responseJson["text"] = text.split("\n");
    // responseJson["raw"] = document;
    return responseJson;
  } catch (err) {
    if (err.code === 3) {
      return Promise.resolve({ error: err.details });
    }
    return Promise.reject(err);
  }
};
