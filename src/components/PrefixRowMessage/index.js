import React from 'react';
import PropTypes from 'prop-types';
import { Txt } from 'rendition';

/**
 * Component to show a row with the given message in a table.
 *
 * @param {Object} obj - Main parameter.
 * @param {number} obj.colSpan - Column span.
 * @param {string} obj.message - Message to be shown.
 * @returns {Object} ReactElement.
 * */
export default function PrefixRowMessage({ colSpan, message }) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <Txt.p align="center">
          {message}
        </Txt.p>
      </td>
    </tr>
  );
}

PrefixRowMessage.propTypes = {
  colSpan: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
