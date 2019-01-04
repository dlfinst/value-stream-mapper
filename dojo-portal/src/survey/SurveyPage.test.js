import React from 'react';
import ReactDOM from 'react-dom';
import SurveyPage from './SurveyPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SurveyPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it.skip('renders valid survey', () =>{
    // check page for valid survey
})