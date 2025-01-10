import {useState} from "react";

export interface LineItem {
  type: "p" | "li" | "ul" | "ol" | "h3" | "h2" | "h1";
  textContent?: string;
  children?: LineItem[];
}

interface ParsedContent {
  isCode: boolean;
  language?: string;
  content: string;
}

export const parseContent = (text: string): ParsedContent[] => {
  const result: ParsedContent[] = [];
  const stack: string[] = [];
  let currentContent: string = "";
  
  text.split("\n").forEach((line: string) => {
    // Add newline to previous content if it's not empty
    if (currentContent) {
      currentContent += "\n";
    }

    const lineText = line;  // Don't trim to preserve formatting

    if (lineText.match(/^```(\w+)/)) {
      // should push remaining content to result
      if (currentContent.length > 0) {
        result.push({
          isCode: false,
          content: currentContent.trim()
        });
      }
      
      currentContent = "";  // Don't include the opening fence in content
      stack.push(lineText);
    } else if (lineText.match(/^```/)) {
      const code = stack.pop()!;
      const language = code.replace(/^```(\w+)/, "$1");
      
      // check if there is a code block wrapping this
      if (stack.length === 0) {
        result.push({
          isCode: true,
          language,
          content: currentContent.trim()
        });
        currentContent = "";
      } else {
        currentContent += lineText;
      }
    } else {
      currentContent += lineText;
    }
  });

  if (currentContent.length > 0) {
    result.push({
      isCode: false,
      content: currentContent.trim()
    });
  }

  return result;
};

/**
 * Convert text to line items
 * @param {string} text - The text to convert
 * @returns {LineItem[]} - The line items
 */
function convertText2LineItems(text: string): LineItem[] {
  const results: LineItem[] = [];
  const paragraphTexts = text.split("\n\n");
  let currentList: LineItem[] = [];
  let isOrdered: boolean = false;

  paragraphTexts.forEach((paragraphText: string) => {
    const lineTexts = paragraphText.split("\n");
    lineTexts.forEach((lineText: string) => {
      let lineItem: LineItem;

      // should handle bold & italic here
      if(lineText.includes("**")) {
        lineText = lineText.replace(/\*\*(.*?)\*\*/, "<strong>$1</strong>");
      }
      if(lineText.includes("*")) {
        lineText = lineText.replace(/\*(.*?)\*/, "<em>$1</em>");
      }

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
          currentList = [];
        }

        results.push(lineItem);
      }
    });
  });
  return results;
}

/**
 * Render text with line items
 * @param {string} text - The text to render
 * @returns {JSX.Element[]} - The rendered text
 */
export function useShowText(text: string) {
  const lineItems = convertText2LineItems(text);
  console.log(lineItems);

  return lineItems.map((lineItem: LineItem, index: number) => {
    if(lineItem.type === "h1") {
      return <h1 key={index} className="text-3xl font-extrabold dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h1>
    } else if (lineItem.type === "h2") {
      return <h2 key={index} className="text-2xl dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h2>
    } else if (lineItem.type === "h3") {
      return <h3 key={index} className="text-xl dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h3>
    } else if(lineItem.type === "p") {
      return <p key={index} className="text-sm text-slate-50" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></p>
    } else if (lineItem.type === "ul") {
      return (
        <ul key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex} dangerouslySetInnerHTML={{ __html: child.textContent || "" }}></li>
          ))}
        </ul>
      )
    } else if (lineItem.type === "ol") {
      return (
        <ol key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex} dangerouslySetInnerHTML={{ __html: child.textContent || "" }}></li>
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
export function useRenderStreamingText(chunk: string) {
  const lineItems: LineItem[] = useAppendChunkToText(chunk)

  return lineItems.map((lineItem: LineItem, index: number) => {
    if(lineItem.type === "h1") {
      return <h1 key={index} className="text-5xl font-extrabold dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h1>
    } else if (lineItem.type === "h2") {
      return <h2 key={index} className="text-4xl font-extrabold dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h2>
    } else if (lineItem.type === "h3") {
      return <h3 key={index} className="text-3xl font-extrabold dark:text-white" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></h3>
    } else if (lineItem.type === "p") {
      return <p key={index} className="text-sm text-slate-50" dangerouslySetInnerHTML={{ __html: lineItem.textContent || "" }}></p>
    } else if (lineItem.type === "ul") {
      return (
        <ul key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex} dangerouslySetInnerHTML={{ __html: child.textContent || "" }}></li>
          ))}
        </ul>
      )
    } else if (lineItem.type === "ol") {
      return (
        <ol key={index}>
          {lineItem.children?.map((child: LineItem, childIndex: number) => (
            <li key={childIndex} dangerouslySetInnerHTML={{ __html: child.textContent || "" }}></li>
          ))}
        </ol>
      )
    }
  })
}

/**
 * Append chunk to text. This is used for streaming responses
 * @param {string} chunk - The chunk to append
 * @returns {LineItem[]} - The line items
 */
function useAppendChunkToText(chunk: string): LineItem[] {
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
