import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Storage from "./Store";
// ReactDOM.render(
//     <MuiThemeProvider theme={theme}>
//       <App />
//     </MuiThemeProvider>,
//   document.getElementById('root')
// );
 ReactDOM.render(
   <Provider store={Storage}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );


