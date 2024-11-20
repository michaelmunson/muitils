import { setConfig } from "./config";

/**
 * @description A class that contains static methods for configuring the components, among other things.
*/
export class Muitils {
  /**
   * @description Set configuration for the components
   * @example
   * ```tsx
   * import {ThemeProvider, createTheme} from '@mui/material'
   * import Muitils from 'muitils'
   *
   * const theme = createTheme()
   * 
   * Muitils.configure({
   *   Form: {
   *     sx: {
   *       classes: {
   *         'form_input_row': {
   *           color: 'red'
   *         }
   *       }
   *     },
   *     transform: (component) => (
   *      <ThemeProvider theme={theme}>
   *         {component}
   *       </ThemeProvider>
   *     )
   *   }
   * })
   * ```
   */
  static configure = setConfig;
}
