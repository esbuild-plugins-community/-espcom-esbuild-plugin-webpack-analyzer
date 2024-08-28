import { TypeOptions } from '../types';
import { pluginName } from '../constants.js';

export function validateOptions(options?: TypeOptions) {
  if (typeof options !== 'undefined') {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error(`${pluginName}: Options must be a plain object`);
    }

    if (typeof options.host !== 'undefined') {
      if (typeof options.host !== 'string') {
        throw new Error(`${pluginName}: The "host" parameter must be a string`);
      }
      if (!options.host) {
        throw new Error(`${pluginName}: The "host" parameter must be a non-empty string`);
      }
    }

    if (typeof options.port !== 'undefined') {
      if (typeof options.port !== 'number') {
        throw new Error(`${pluginName}: The "port" parameter must be a number`);
      }
    }

    if (typeof options.open !== 'undefined') {
      if (typeof options.open !== 'boolean') {
        throw new Error(`${pluginName}: The "open" parameter must be a boolean`);
      }
    }

    if (typeof options.getAnalyzerServer !== 'undefined') {
      if (typeof options.getAnalyzerServer !== 'function') {
        throw new Error(`${pluginName}: The "getAnalyzerServer" parameter must be a function`);
      }
    }
  }
}
