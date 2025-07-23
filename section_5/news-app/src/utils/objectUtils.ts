export class ObjectUtils {
  static keys = <T extends Record<string, unknown>>(data: T): [keyof T] => {
    return Object.keys(data) as [keyof T];
  };
}
