import moment, {Moment} from "moment";

export function apiUrl(path: string): string {
  if (!path) {
    throw new Error("Url is not defined");
  }

  if (path.startsWith("/")) {
    path = path.substring(1);
  }

  return `/${path}`;
}

export function formatToTableValue(value: any): string {
  if (!value) {
    return "n/a";
  } else {
    return String(value);
  }
}

export function formatValueToDate(value: string): string {
  if (!value) {
    return "n/a";
  } else {
    return moment(value).format("DD.MM.YYYY-T:HH:MM");
  }
}
export function getDate(value: string | Moment, format: string): string {
  if(!value) {
    return 'n/a'
  }
  else {
    return moment(value).format(format);
  }
}

export const getCurrentDate = (dateFormat?: string) => moment().format(dateFormat);
