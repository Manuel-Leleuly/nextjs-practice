export class ObjectUtils {
  static keys = <T extends Record<string, unknown>>(data: T): [keyof T] => {
    return Object.keys(data) as [keyof T];
  };

  static cloneObject = <T extends Record<string, unknown>>(data: T): T => {
    return JSON.parse(JSON.stringify(data)) as T;
  };
}
