export class FormatLib {
  static formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-us", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };
}
