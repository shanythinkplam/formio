import React,{useState,useEffect} from "react";
import { Components, Formio } from "formiojs";
import { FormBuilder } from "@formio/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "formiojs/dist/formio.full.min.css";
import sectionLibraryData from "./sectionJSON.json";
const initialSections = [
  {
    "title": "Section1",
            "collapsible": true,
            "key": "section1",
            "type": "panel",
            "label": "Panel",
            "input": false,
            "tableView": false,
    "components": [
      {
        "label": "Input 1",
                    "placeholder": "Enter ",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validateWhenHidden": false,
                    "key": "input1",
                    "type": "textfield",
                    "input": true},
                    {
                      "label": "Input 2",
                                  "placeholder": "Enter ",
                                  "applyMaskOn": "change",
                                  "tableView": true,
                                  "validateWhenHidden": false,
                                  "key": "input2",
                                  "type": "textfield",
                                  "input": true}
    ]
  },
  {
    "title": "Section2",
            "collapsible": true,
            "key": "section2",
            "type": "panel",
            "label": "Panel",
            "input": false,
            "tableView": false,
    "components": [
      {
        "label": "Input 3",
                    "placeholder": "Enter ",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validateWhenHidden": false,
                    "key": "input3",
                    "type": "textfield",
                    "input": true},
                    {
                      "label": "Input 4",
                                  "placeholder": "Enter ",
                                  "applyMaskOn": "change",
                                  "tableView": true,
                                  "validateWhenHidden": false,
                                  "key": "input4",
                                  "type": "textfield",
                                  "input": true}
    ]
  },
];
// Extend the edit form for components
Object.keys(Components.components).forEach((key) => {
  const originalEditForm = Components.components[key]?.editForm;

  if (originalEditForm) {
    Components.components[key].editForm = (...args) => {
      const editForm = originalEditForm(...args);

      // Check if the first component is a "tabs" component
      if (editForm.components?.[0]?.type === "tabs") {
        // Filter out unwanted tabs by key
        editForm.components[0].components = editForm.components[0].components.filter(
          (tab) => tab.key !== "layout" && tab.key !== "logic"
        );

        // Add a custom tab
        editForm.components[0].components.push({
          key: "customTab",
          label: "Custom Tab",
          components: [
            {
              type: "checkbox",
              key: "customCheckbox",
              label: "Enable AI",
              input: true,
            },
            {
              type: "textfield",
              key: "customField",
              label: "Custom Text Field",
              input: true,
            },
          ],
        });
      }

      return editForm;
    };
  }
});

const sectionComponents = initialSections.reduce((components, section) => {
  components[section.key] = {
    title: section.title,
    key: section.key,
    schema: {
      ...section,
      components: section.components,
    },
  };
  return components;
}, {});
// Customize the builder options
const builderOptions = {
  builder: {
    basic: {
      title: "Basic Fields",
      weight: 0,
      components: {
        textfield: true,
        textarea: true,
        email: true,
      },
    },
    custom: {
      title: "Used Sections",
      weight: 10,
      components: {
        ...sectionComponents,
        
      },
    },
  },
};



const MyFormBuilder = () => {

  const [formSchema, setFormSchema] = useState(sectionLibraryData);
  const handleFormChange = (schema) => {
    setFormSchema(schema); // Update state with the latest form JSON
    console.log("Form JSON updated:", schema);
  };

  useEffect(() => {
    console.log("Submitted Form JSON:", formSchema);
  }, [formSchema]);

  return (
    <>
      <FormBuilder form={formSchema} options={builderOptions} onChange={handleFormChange}/>
    </>
  );
};

export default MyFormBuilder;
