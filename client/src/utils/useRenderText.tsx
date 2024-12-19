import {useState} from "react";

export interface LineItem {
  type: "p" | "li" | "ul" | "ol" | "h3" | "h2" | "h1";
  textContent?: string;
  children?: LineItem[];
}

/**
 * Convert text to line items
 * @param {string} text - The text to convert
 * @returns {LineItem[]} - The line items
 */
function useTextConvert(text: string): LineItem[] {
  const results: LineItem[] = [];
  const paragraphTexts = text.split("\n\n");
  const currentList: LineItem[] = [];
  let isOrdered: boolean = false;

  paragraphTexts.forEach((paragraphText: string) => {
    const lineTexts = paragraphText.split("\n");
    lineTexts.forEach((lineText: string) => {
      let lineItem: LineItem;

      if(lineText.trim().startsWith("-")) {
        isOrdered = false;
        lineItem = {
          type: "li",
          textContent: lineText.replace(/^- /, "")
        }
      } else if (lineText.trim().match(/^\d+\./)) {
        isOrdered = true;
        lineItem = {
          type: "li",
          textContent: lineText.replace(/^\d+\./, "")
        }
      } else {
        if(lineText.includes("###")) {
          const header = lineText.replace(/###/, "");
          lineItem = {
            type: "h3",
            textContent: header
          }
        } else if (lineText.includes("##")) {
          const header = lineText.replace(/##/, "");
          lineItem = {
            type: "h2",
            textContent: header
          }
        } else if (lineText.includes("#")) {
          const header = lineText.replace(/#/, "");
          lineItem = {
            type: "h1",
            textContent: header
          }
        }
        // should handle bold text here 
        else if(lineText.includes("**")) {
          const boldText = lineText.replace(/\*\*(.*?)\*\*/, "<strong>$1</strong>");
          lineItem = {
            type: "p",
            textContent: boldText
          }
        } else {
          lineItem = {
            type: "p",
            textContent: lineText
          }
        }
      }

      if(lineItem.type === 'li') {
        currentList.push(lineItem);
      } else {
        if(currentList.length > 0) {
          const listType = isOrdered ? "ol" : "ul";
          const list: LineItem = {
            type: listType,
            children: currentList
          }
          results.push(list);
        }

        results.push(lineItem);
      }
    });
  });

  console.log(results);

  return results;
}

/**
 * Render text with line items
 * @param {string} text - The text to render
 * @returns {JSX.Element[]} - The rendered text
 */
export function useShowText(text: string) {
  const lineItems = useTextConvert(text);

  return lineItems.map((lineItem: LineItem, index: number) => {
    if(lineItem.type === "h1") {
      return <h1 key={index} className="text-5xl font-extrabold dark:text-white">{lineItem.textContent}</h1>
    } else if (lineItem.type === "h2") {
      return <h2 key={index} className="text-4xl font-extrabold dark:text-white">{lineItem.textContent}</h2>
    } else if (lineItem.type === "h3") {
      return <h3 key={index} className="text-3xl font-extrabold dark:text-white">{lineItem.textContent}</h3>
    } else if(lineItem.type === "p") {
      return <p key={index}>{lineItem.textContent}</p>
    } else if (lineItem.type === "ul") {
      return (
        <ul key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex}>{child.textContent}</li>
          ))}
        </ul>
      )
    } else if (lineItem.type === "ol") {
      return (
        <ol key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex}>{child.textContent}</li>
          ))}
        </ol>
      )
    }
  })
}

/**
 * Render text with line items
 * @param {string} chunk - The chunk to render
 * @returns {JSX.Element[]} - The rendered text
 */
export function useRenderText(chunk: string) {
  const lineItems: LineItem[] = useAppendChunkToText(chunk)

  return lineItems.map((lineItem: LineItem, index: number) => {
    if(lineItem.type === "h1") {
      return <h1 key={index} className="text-5xl font-extrabold dark:text-white">{lineItem.textContent}</h1>
    } else if (lineItem.type === "h2") {
      return <h2 key={index} className="text-4xl font-extrabold dark:text-white">{lineItem.textContent}</h2>
    } else if (lineItem.type === "h3") {
      return <h3 key={index} className="text-3xl font-extrabold dark:text-white">{lineItem.textContent}</h3>
    } else if (lineItem.type === "p") {
      return <p key={index} className="text-sm text-slate-50">{lineItem.textContent}</p>
    } else if (lineItem.type === "ul") {
      return (
        <ul key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex}>{child.textContent}</li>
          ))}
        </ul>
      )
    } else if (lineItem.type === "ol") {
      return (
        <ol key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex}>{child.textContent}</li>
          ))}
        </ol>
      )
    }
  })
}

/**
 * Append chunk to text
 * @param {string} chunk - The chunk to append
 * @returns {LineItem[]} - The line items
 */
function useAppendChunkToText(chunk: string): LineItem[] {
  console.log(`should append ${chunk} to the text`);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  let lineItem: LineItem;

  if(chunk.trim().startsWith("-")) {
    lineItem = {
      type: "li",
      textContent: chunk.replace(/^- /, "")
    }
    setLineItems([...lineItems, lineItem])
  } else if (chunk.trim().match(/^\d+\./)) {
    lineItem = {
      type: "li",
      textContent: chunk.replace(/^\d+\./, "")
    }
    setLineItems([...lineItems, lineItem])
  } else {
    lineItem = {
      type: "p",
      textContent: chunk
    }
    setLineItems([...lineItems, lineItem])
  }

  return lineItems;
}
