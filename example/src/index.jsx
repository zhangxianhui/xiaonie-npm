/*** examples/src/index.jsx ***/
import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../src/index.jsx';
const App = () => (
 <MyComponent />
);
render(<App />, document.getElementById("root"));