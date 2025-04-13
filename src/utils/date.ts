import dayjs, { Dayjs } from 'dayjs'

const addDays = function (current: Date, days: number) {
  current.setDate(current.getDate() + days)
  return current
}

const tinhKhoangCachNgay = (ngayBatDau: Date, ngayKetThuc: Date): number => {
  // Lấy hiệu của hai ngày
  const khoangCachMilliseconds = ngayKetThuc.getTime() - ngayBatDau.getTime()

  // Chuyển đổi khoảng cách từ milliseconds sang days
  const khoangCachNgay = khoangCachMilliseconds / (1000 * 60 * 60 * 24)

  return khoangCachNgay
}

/**
 *
 * @param date is string
 * @description date will format to YYYY-MM-DD
 */
const formatDate = (date: string) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

/**
 *
 * @param date is string format HH:mm:ss
 * @returns Date object
 */
const formatTime = (hourString: string) => {
  const d = new Date(),
    hour = hourString.split(':')[0],
    minute = hourString.split(':')[1],
    second = hourString.split(':')[2]

  return d.setHours(Number(hour), Number(minute), Number(second))
}

/**
 *
 * @param date is string (DD/MM/YYYY || YYYY-MM-DD) or Date
 * @returns DD/MM/YYYY || YYYY-MM-DD || undefined
 */
const convertToDateJsString = (date: Date | string | undefined, format = FORMAT_VN_TIME) => {
  let dayData = dayjs()
  if (!!date === false) {
    return undefined
  }

  if (typeof date == 'string') {
    if (date.includes('-')) {
      const [year, month, day] = date.split('-')
      dayData = dayData.set('date', Number(day)).set('month', Number(month) - 1).set('year', Number(year))
    } else if (date.includes('/')) {
      const [day, month, year] = date.split('/')
      dayData = dayData.set('date', Number(day)).set('month', Number(month) - 1).set('year', Number(year))
    }
  }

  return dayData?.isValid() ? dayData.format(format) : undefined
}


/**
 *
 * @param date is includes type DD MM YYYY
 * @returns Dayjs object
 */
export const convertStringToDayJs = (date: string, format: string) => {
  let dayData = dayjs()
  if (!!date === false) {
    return undefined
  }

  const dateParts = date.split(/[-/.]/)
  let day, month, year
  // Kiểm tra có phải là ISO-8601 khống
  let checkISODate = date.includes('T')
  format = checkISODate ? 'ISO-8601' : format

  switch (format) {
    case 'DD/MM/YYYY':
      [day, month, year] = dateParts
      break
    case 'MM/YYYY':
      [month, year] = dateParts
      day = 1 // default day if not provided
      break
    case 'YYYY/MM':
      [year, month] = dateParts
      day = 1 // default day if not provided
      break
    case 'MM/YYYY':
      [month, year] = dateParts
      day = 1 // default day if not provided
      break
    case 'YYYY-MM-DD':
      [year, month, day] = dateParts
      break
    case 'ISO-8601':
      [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-')
      break

    default:
      // YYYY-MM-DD HH:mm:ss
      [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-')
      break // unsupported format
  }

  dayData = dayData.set('date', Number(day)).set('month', Number(month) - 1).set('year', Number(year))

  return dayData.isValid() ? dayData : undefined
}

export function parseDateWithRegex(date: string | null) {
  let day, month, year, hh, mm, ss;

  // Các biểu thức regex để phát hiện định dạng
  const regexPatterns = {
    'DD/MM/YYYY': /^(\d{2})\/(\d{2})\/(\d{4})$/, // 25/11/2024
    'DD/M/YYYY': /^(\d{2})\/(\d{1})\/(\d{4})$/, // 25/1/2024
    'D/MM/YYYY': /^(\d{1})\/(\d{2})\/(\d{4})$/, // 25/1/2024
    'MM/YYYY': /^(\d{2})\/(\d{4})$/,             // 11/2024
    'YYYY/MM': /^(\d{4})\/(\d{2})$/,             // 2024/11
    'YYYY': /^(\d{4})$/,                          // 2024
    'YYYY-MM-DD': /^(\d{4})-(\d{2})-(\d{2})$/,   // 2024-11-25
    'ISO-8601-Z': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, // ISO 8601
    'ISO-8601': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}$/, // 2024-11-25T16:02:19.088+07:00
    'DEFAULT': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, // 2024-11-25 00:00:00
  };

  if (date == null) throw new Error('Not null value')

  for (const [format, regex] of Object.entries(regexPatterns)) {
    const match = date.match(regex);

    if (match) {
      switch (format) {
        case 'DD/MM/YYYY':
          [day, month, year] = match.slice(1);
          break;
        case 'DD/M/YYYY':
          [day, month, year] = match.slice(1);
          break;
        case 'D/MM/YYYY':
          [day, month, year] = match.slice(1);
          break;

        case 'MM/YYYY':
          [month, year] = match.slice(1);
          day = '01'; // Mặc định ngày '01' nếu không được cung cấp
          break;

        case 'YYYY/MM':
          [year, month] = match.slice(1);
          day = '01'; // Mặc định ngày 1 nếu không được cung cấp
          break;

        case 'YYYY-MM-DD':
          [year, month, day] = match.slice(1);
          break;

        case 'ISO-8601-Z':
          [year, month, day, hh, mm, ss] = dayjs(date).format('YYYY-MM-DD-hh-mm-ss').split('-');
          break;
        case 'ISO-8601':
          [year, month, day, hh, mm, ss] = dayjs(date).format('YYYY-MM-DD-hh-mm-ss').split('-');
          break;
        case 'DEFAULT':
          [year, month, day, hh, mm, ss] = dayjs(date).format('YYYY-MM-DD-hh-mm-ss').split('-');
          break;

        default:
          throw new Error('Không hổ trọ định dạng này: ' + date);
      }

      // Trả về đối tượng chuẩn hóa với dayjs
      if (hh && mm && ss)
        return dayjs(`${year}-${month}-${day}:${hh}:${mm}:${ss}`, 'YYYY-MM-DD:hh:mm:ss');

      // Xử lý nếu day và month chỉ có 1 số thì thêm số 0 đằng trước
      if (day.length === 1) day = '0' + day;
      if (month.length === 1) month = '0' + month;
      return dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    }
  }

  throw new Error('Định dạng ngày không hợp lệ: ' + date);
}

export function parseDate(date: string | null): string | null {
  let day, month, year;

  // Các biểu thức regex để phát hiện định dạng
  const regexPatterns = {
    'DD/MM/YYYY': /^(\d{2})\/(\d{2})\/(\d{4})$/, // 25/11/2024
    'DD/M/YYYY': /^(\d{2})\/(\d{1})\/(\d{4})$/, // 25/1/2024
    'D/MM/YYYY': /^(\d{1})\/(\d{2})\/(\d{4})$/, // 25/1/2024
    'MM/YYYY': /^(\d{2})\/(\d{4})$/,             // 11/2024
    'YYYY/MM': /^(\d{4})\/(\d{2})$/,             // 2024/11
    'YYYY': /^(\d{4})$/,                          // 2024
    'YYYY-MM-DD': /^(\d{4})-(\d{2})-(\d{2})$/,   // 2024-11-25
    'ISO-8601-Z': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, // ISO 8601
    'ISO-8601': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}$/, // 2024-11-25T16:02:19.088+07:00
    'DEFAULT': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, // 2024-11-25 00:00:00

  };

  if (date == null) return null;

  for (const [format, regex] of Object.entries(regexPatterns)) {
    const match = date.match(regex);
    if (match) {
      switch (format) {
        case 'DD/MM/YYYY':
          [day, month, year] = match.slice(1);
          break;
        case 'DD/M/YYYY':
          [day, month, year] = match.slice(1);
          break;
        case 'D/MM/YYYY':
          [day, month, year] = match.slice(1);
          break;

        case 'MM/YYYY':
          [month, year] = match.slice(1);
          day = '01'; // Mặc định ngày '01' nếu không được cung cấp
          break;

        case 'YYYY/MM':
          [year, month] = match.slice(1);
          day = '01'; // Mặc định ngày 1 nếu không được cung cấp
          break;

        case 'YYYY-MM-DD':
          [year, month, day] = match.slice(1);
          break;

        case 'ISO-8601-Z':
          [year, month, day] = dayjs(date).format('YYYY-MM-DD-hh-mm-ss').split('-');
          break;
        case 'ISO-8601':
          [year, month, day] = dayjs(date).format('YYYY-MM-DD-hh-mm-ss').split('-');
          break;
        case 'DEFAULT':
          [year, month, day] = dayjs(date).format('YYYY-MM-DD-HH-mm-ss').split('-');
          break;

        default:
          return date;
      }

      // Xử lý nếu day và month chỉ có 1 số thì thêm số 0 đằng trước
      if (day && day.length === 1) day = '0' + day;
      if (month && month.length === 1) month = '0' + month;


      return `${day}/${month}/${year}`;
    }
  }

  // Nếu không khớp các định dạng trên thì thử đưa vào dayjs 
  const dayJsObject: Dayjs = dayjs(date)

  if (dayJsObject.isValid() == true) {
    return dayJsObject.format('DD/MM/YYYY')
  }

  // Trả về chuỗi gốc nếu không khớp định dạng
  return date;
}

export const getDefaultPreviousMonth = () => {
  const currentDay = dayjs()
  return currentDay.subtract(1, 'month')
}

const getDaysDifference = (date1: string | undefined, date2: string | undefined) => {
  if (!date1 || !date2) return 0

  return parseDateWithRegex(date2).diff(parseDateWithRegex(date1), 'd')
}

export const checkDayjsValid = (date: string | undefined) => {
  try {
    if (!date) return false
    parseDateWithRegex(date)
    return true
  } catch (error) {
    return false
  }
}

export { addDays, tinhKhoangCachNgay, formatDate, formatTime, convertToDateJsString, getDaysDifference }
