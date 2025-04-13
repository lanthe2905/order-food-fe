import messages from './message'
import { renderToString } from 'react-dom/server'
import TableToExcel from '@linways/table-to-excel'
import { message } from 'antd'

const IMAGE_PATH = process.env.NODE_ENV === 'production' ? 'icons' : '/icons'
const LIMIT_INIT = 10

const getMessage = (id: string, ...params: Array<any>): string => {
  const message = messages[id] || id
  const result = message.replace(/\{(\d+)\}/g, (_match: any, index: any) => params[index])
  return result
}

export const tableFalsyToNull = (item?: string | number, to?: string): any => {
  const customTo = to || ''
  return item ? item : customTo
}

// Nếu dữ liệu = underfine hay '' thường lúc gởi data api hay bị xoá ta thiết lập null để BE có thể nhận được
const convertEmptyToNull = (item: any): any => {
  const obj = { ...item }
  const keys = obj && Object.keys(obj)
  if (keys) {
    for (const key of keys) {
      const value = obj[key]
      if (typeof value === 'string' && value.trim() === '') {
        obj[key] = null
      } else if (typeof value === 'undefined') {
        obj[key] = null
      }
    }
  }
  return obj
}

const removeNull = (item: any): any => {
  const obj = { ...item }
  const keys = obj && Object.keys(obj)
  if (keys) {
    for (const key of keys) {
      const value = obj[key]
      if (typeof value === 'string' && value.trim() === '') {
        obj[key] = ''
      }
    }
  }
  return obj
}

//Dùng để clear null cho bộ lọc tìm kiếm
const removeNullFilter = (obj: any) => {
  return Object.keys(obj as any)
    .filter((key, index) => obj[key] != null)
    .reduce((acc, key) => {
      return { ...acc, [key]: obj[key] }
    }, {} as any)
}

const debounce = (timeOutId: any, milliseconds: number, fc: Function) => {
  timeOutId && clearTimeout(timeOutId)
  return setTimeout(() => {
    fc()
  }, milliseconds)
}

const createUniqueKey = () => {
  return Math.floor(Math.random() * (1000 - 1 + 1)) + 1
}

const regexGetNumber = (num: string | number): string => {
  return String(renderCurrency(num)).replace(/[^0-9.-]/g, '')
}

const renderCurrency = (num: any) => {
  num = String(num).replace(/[^0-9.-]/g, '')
  if (isNaN(Number(num)) == true) return 0
  return Number(num).toLocaleString('en-US')
}

const toFixedNumber = ({ num, fixed = 1 }: { num: number | string; fixed?: number }) => {
  if (isNaN(Number(num)) === true) return ''
  let temp = Number(num)
  if (temp == 0) return ''
  return temp.toFixed(fixed)
}

const renderOptions = <T>(data: T[], labelKey: keyof T | Array<keyof T>, valueKey: keyof T | Array<keyof T>) => {
  const defaulValue = {
    value: '',
    label: 'Vui lòng chọn',
  }

  function getValue<T>(obj: T, keys: Array<keyof T>): any {
    return keys.reduce((acc: any, key: any) => acc[key], obj)
  }

  const options =
    data?.map((item: T) => {
      return {
        label: getValue(item, typeof labelKey === 'object' ? labelKey : [labelKey]),
        value: getValue(item, typeof valueKey === 'object' ? valueKey : [valueKey]),
      }
    }) ?? []

  options.unshift(defaulValue)
  return options
}

const createOptionBy2DArray = <T>(
  data: T[],
  labelKey: keyof T | Array<keyof T> | Array<Array<keyof T>>,
  valueKey: keyof T | Array<keyof T>,
  {
    splitBy = ' - ',
    defaultValue = {
      value: '',
      label: 'Vui lòng chọn',
    } as SELECT_OPTION_TYPE[0] | null,
  },
) => {
  let is2dArray = false

  if (Array.isArray(labelKey)) {
    // @ts-ignore
    is2dArray = labelKey.every((key) => Array.isArray(key))
  }

  function getValue<T>(obj: T, keys: Array<keyof T>): any {
    return keys.reduce((acc: any, key: any) => acc[key], obj)
  }

  function get2DValue<T>(obj: T, keys: Array<Array<keyof T>>): any {
    const data = keys
      ?.map((key) => {
        return key.reduce((acc: any, key: any) => acc[key], obj)
      })
      .join(splitBy)

    return data
  }

  const options = data.map((item: T) => {
    return {
      // @ts-ignore
      label: is2dArray ? get2DValue(item, labelKey) : getValue(item, Array.isArray(labelKey) ? labelKey : [labelKey]),
      // @ts-ignore
      value: getValue(item, Array.isArray(valueKey) ? valueKey : [valueKey]),
    }
  })

  if (!!defaultValue) {
    options.unshift(defaultValue)
  }

  return options
}

function dowloadExcelByBase64(xlsxBase64: any) {
  var mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
  var a = document.createElement('a')
  a.href = mediaType + xlsxBase64
  a.download = 'du_lieu_loi.xlsx'
  a.textContent = 'Download file!'
  a.click()
}


function parseHtmlToDOM(component: React.JSX.Element, html: string) {
  const parse = new DOMParser()
  const dom = parse.parseFromString(html, 'text/html')
  const root = dom.getElementById('root')
  const contentString = renderToString(component)
  root!.innerHTML = contentString

  return dom
}

function handlePrint(component: React.JSX.Element, html: string) {
  const dom = parseHtmlToDOM(component, html)
  const blob = new Blob([dom.documentElement.outerHTML], {
    type: 'text/html',
  })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.target = '_blank' // Mở trong tab mới
  link.click()
  URL.revokeObjectURL(url)
}

function handleDowloadHTML(component: React.JSX.Element, html: string, name: string) {
  const dom = parseHtmlToDOM(component, html)

  const blob = new Blob([dom.documentElement.outerHTML], {
    type: 'text/html',
  })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = name + ".html"
  link.click()
  URL.revokeObjectURL(url)
}

function handleExcel(component: React.JSX.Element, html: string, fileName: string) {
  const dom = parseHtmlToDOM(component, html)

  try {
    TableToExcel.convert(dom.getElementById('table'), {
      name: fileName + '.xlsx',
      sheet: {
        name: 'Sheet 1',
      },
    })
  } catch (error) {
    message.error('Không xử lý được file này')
  }
}

function handleExcelWithSheets(component: React.JSX.Element, html: string, fileName: string,
  sheets: Array<{
    name: string,
    idTable: string
  }>
) {
  const dom = parseHtmlToDOM(component, html);
  let book = null;

  try {
    for (let i = 0; i < sheets.length; i++) {
      if (!book)
        book = TableToExcel.tableToBook(dom.getElementById(sheets[i].idTable), { sheet: { name: sheets[i].name } });
      else
        TableToExcel.tableToSheet(book, dom.getElementById(sheets[i].idTable), { sheet: { name: sheets[i].name } });
    }

    TableToExcel.save(book, `${fileName}.xlsx`)
  } catch (error) {
    console.log(error)
    message.error('Không xử lý được file này')
  }
}

async function convertExcelToBinary(component: React.JSX.Element, html: string) {
  const dom = parseHtmlToDOM(component, html)

  return await TableToExcel.convertToExcel(dom.getElementById('table'))
}

export function deepClone<T>(obj: T): T | null {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  }

  return null;
}

export function totalInArray(nums: number[]) {
  return nums?.filter(i => i).reduce((a, b) => a + b, 0)
}

export {
  IMAGE_PATH,
  LIMIT_INIT,
  handleExcelWithSheets,
  handleExcel,
  getMessage,
  convertEmptyToNull,
  removeNull,
  removeNullFilter,
  debounce,
  dowloadExcelByBase64,
  createUniqueKey,
  regexGetNumber,
  renderCurrency,
  toFixedNumber,
  renderOptions,
  createOptionBy2DArray,
  handlePrint,
  handleDowloadHTML,
  convertExcelToBinary,

}
