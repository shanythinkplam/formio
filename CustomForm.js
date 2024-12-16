import React from "react";
import { FormBuilder } from '@formio/react';
import sectionLibraryData from "./sectionJSON.json";
const CustomForm = () => {
    return (
        <div>
          <h1>Form.io Builder</h1>
          <div id="builder">
            <FormBuilder
              form={sectionLibraryData}
              onChange={(schema) => console.log('Form Schema:', schema)}
            />
          </div>
        </div>
      );
}
  
  export default CustomForm;