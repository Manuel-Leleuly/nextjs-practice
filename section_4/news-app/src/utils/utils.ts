import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export class Utils {
  static sleepAsync = async (durationMs: number) => {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  };

  static sanitize = (text: string) => {
    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(text);
  };
}
