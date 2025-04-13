declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module 'mockjs';
declare module 'react-fittext';

// dev
declare const PAGE_SIZE: 10 | 20 | 50 | 100;

declare module '@linways/table-to-excel' {
  declare function convertToExcel(table: HTMLElement | null);
  declare function tableToBook(table: HTMLElement | null, opts: any);
  declare function convert(table: HTMLElement | null, options: any);
  declare function tableToSheet(book: any, table: HTMLElement | null, options: any);
  declare function save(table: HTMLElement | null, name: string);
}

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const ODS_API_URL: string;
