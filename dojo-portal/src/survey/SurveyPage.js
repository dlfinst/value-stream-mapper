import React, { Component } from 'react';
import * as Survey from "survey-react";
import '../App.css';

const surveyJSON = require('./baseline-survey.json');

window.survey = new Survey.Model(surveyJSON);

class SurveyPage extends Component {
      onValueChanged(result) {
        console.log("value changed!");
      }
    
      onComplete(result) {
        console.log("Complete! " + result);
      }
    
      render() {
        Survey.Survey.cssType = "bootstrap";
        var model = new Survey.Model(surveyJSON);
        return (
          <div>
            <div className="surveyjs">
              <Survey.Survey
                model={model}
                onComplete={this.onComplete}
                onValueChanged={this.onValueChanged}
              />
            </div>
          </div>
        );
      }
    }

export default SurveyPage;