import { setConfig } from "./config";

export default class Muitils {
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
