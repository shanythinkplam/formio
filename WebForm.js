import React,{useState,useRef,useEffect} from "react";
import { FormBuilder, Form } from '@formio/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import sectionLibraryData from "./sectionJSON.json";
import netWireData from "./netWireData.json";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
    
    const [formInstance, setFormInstance] = useState(null);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (formInstance) {
        const weightInput = formInstance.querySelector('[name="data[weight]"]');
        if(weightInput){
        const unit = weightInput.getAttribute('data-unit');
        const weightArray = netWireData?.weight || {"value":0, "unit":unit};
        weightInput.value = calculateWeight(weightArray,unit )      
        }
    }
  }, [netWireData,formInstance]);

  const calculateWeight = (weightArray,inputUnit)=> {
    const baseUnitConversions = {
      kg: 1,         // Base unit is kg
      gm: 0.001,     // 1 gm = 0.001 kg
      lb: 0.453592,  // 1 lb = 0.453592 kg
    };
    const { value, unit } = weightArray;
    if (!baseUnitConversions[unit] || !baseUnitConversions[inputUnit]) {
      console.error("Unsupported unit detected:", unit, "or", inputUnit);
      return value;  
    }
  
    
    if (unit === inputUnit) {
      return value;
    }
  
    
    const valueInBaseUnit = value * baseUnitConversions[unit]; 
    const convertedValue = valueInBaseUnit / baseUnitConversions[inputUnit]; 
  
    return convertedValue;
  }

    const formOptions = {
        //project: "https://675bdb278d337f1fd558c245.form.io",
        //projectId: "675bdb278d337f1fd558c245"
      };

      const onFormSubmit = (submission) => {
        //alert(submission)
        console.log("Form Submitted:", submission);
      };

      
    const handleFormError = (errors) => {
    setErrorMessages(errors);
    setErrorPopupOpen(true);
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

    return (
        <div>
          <h1>Form.io Builder</h1>
          <div id="builder">
            {/* <FormBuilder
              form={{
                "display": "form",
                "settings": {
                    "pdf": {
                        "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
                        "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
                    }
                },
                "components": [
                    {
                        "collapsible": false,
                        "key": "panel",
                        "type": "panel",
                        "label": "Panel",
                        "input": false,
                        "tableView": false,
                        "components": [
                            {
                                "label": "Gender",
                                "optionsLabelPosition": "right",
                                "inline": true,
                                "tableView": false,
                                "defaultValue": {
                                    "M": true,
                                    "F": false
                                },
                                "values": [
                                    {
                                        "label": "Male",
                                        "value": "M",
                                        "shortcut": ""
                                    },
                                    {
                                        "label": "Female",
                                        "value": "F",
                                        "shortcut": ""
                                    }
                                ],
                                "validate": {
                                    "onlyAvailableItems": true
                                },
                                "validateWhenHidden": false,
                                "key": "gender",
                                "type": "selectboxes",
                                "input": true,
                                "inputType": "checkbox"
                            },
                            {
                                "label": "Hus Name",
                                "applyMaskOn": "change",
                                "autoExpand": false,
                                "tableView": true,
                                "validateWhenHidden": false,
                                "key": "husName",
                                "conditional": {
                                    "show": true,
                                    "when": "gender",
                                    "eq": "F"
                                },
                                "type": "textarea",
                                "input": true
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "label": "Submit",
                        "key": "submit",
                        "disableOnInvalid": true,
                        "input": true,
                        "tableView": false
                    }
                ]
            }}
              options={{ project: 'https://675bdb278d337f1fd558c245.form.io', projectId:"675bdb278d337f1fd558c245" }} 
              onChange={(schema) => console.log('Form Schema:', schema)}
            /> */}
            <Form
            onRender={() => {
                //console.log("Form rendered");
                const formElement = document.querySelector(".formio-component-form");
                if (formElement) {
                  //console.log("Form instance element:", formElement);
                  setFormInstance(formElement);
                }
              }}
        form={sectionLibraryData}
        options={formOptions}
        onSubmit={onFormSubmit}
        onError={handleFormError} 
      />
          </div>
          <Dialog open={errorPopupOpen} onClose={closeErrorPopup}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {errorMessages.length > 0 ? (
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          ) : (
            <p>No errors found.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeErrorPopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      );
}
  
  export default App;