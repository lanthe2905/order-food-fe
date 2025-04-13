import React from 'react';
import PropTypes from 'prop-types';

export interface StyledCellProps {
  key?: number | string
  children?: React.ReactNode;
  fontName?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  wrapText?: boolean;
  borderStyle?: 'thin' | 'medium' | 'thick' | 'none';
  borderTop?: 'thin' | 'medium' | 'thick' | 'none';
  borderLeft?: 'thin' | 'medium' | 'thick' | 'none';
  borderRight?: 'thin' | 'medium' | 'thick' | 'none';
  borderBottom?: 'thin' | 'medium' | 'thick' | 'none';
  colSpan?: number;
  rowSpan?: number;
}

const StyledCell: React.FC<StyledCellProps> = ({
  children,
  key,
  fontName = 'Times New Roman',
  fontSize = 11,
  bold = false,
  italic = false,
  textAlign = 'center',
  verticalAlign = 'middle',
  wrapText = false,
  borderStyle = 'thin',
  borderTop = 'none',
  borderLeft = 'none',
  borderRight = 'none',
  borderBottom = 'none',
  colSpan,
  rowSpan,
}) => {
  const borderStyleMap = borderStyle == 'none' ? {
    'data-b-t-s': borderTop,
    'data-b-r-s': borderRight,
    'data-b-b-s': borderBottom,
    'data-b-l-s': borderLeft,
  } : {
    'data-b-a-s': borderStyle
  }

  return (
    <td
      key={key}
      data-f-name={fontName}
      data-f-sz={fontSize}
      data-f-bold={bold}
      data-f-italic={italic}
      data-a-h={textAlign}
      data-a-v={verticalAlign}
      data-a-wrap={wrapText}
      {...borderStyleMap}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
};

StyledCell.propTypes = {
  children: PropTypes.node,
  fontName: PropTypes.string,
  fontSize: PropTypes.number,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  wrapText: PropTypes.bool,
  borderStyle: PropTypes.oneOf(['thin', 'medium', 'thick', 'none']),
};

export default StyledCell;