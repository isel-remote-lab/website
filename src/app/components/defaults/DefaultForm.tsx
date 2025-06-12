"use client";

import { Button, Form, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getDomainConfig } from "~/server/services/domain";
import type { FormItemConfig } from "~/types/form";
import type { DomainConfig, Restrictions, RestrictionsObjects as RestrictionObjects } from "~/types/domain";
import addDurationFormComponent from "../formComponents/addDurationFormComponent";
import React from "react";
import { formatLaboratory, formatNumberToDayjs, LaboratoryFields } from "~/types/laboratory";
import type { LaboratoryRequest } from "~/types/laboratory";
import type { GroupRequest } from "~/types/group";

/**
 * Type for the request objects
 */
export type RequestTypes = LaboratoryRequest | GroupRequest;

/**
 * Type for the keys of the request objects
 */
type RequestKeys = keyof LaboratoryRequest | keyof GroupRequest;

/**
 * Labels for the request keys
 */
const requestKeysFieldLabels: Record<RequestKeys, string> = {
  name: "Nome",
  description: "Descrição",
  duration: "Duração das sessões",
  queueLimit: "Limite da fila de espera"
}

/**
 * Get the form items for a given type
 * @param config - The config for the form
 * @returns The form items
 */
interface GetFormItemsProps {
  config: RestrictionObjects;
}

/**
 * Get the min and max messages for a given component
 * @param component - The component to get the min and max messages for
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The min and max messages
 */
const getMinMaxMessages = (component: React.ReactNode, min: number, max: number) => {
  // Type for the message parts
  type MessageParts = {
    prefix: string;
    suffix: string;
    min: string;
    max: string;
  }

  // Message parts for the different component types
  const messageParts = {
    textArea: {
      prefix: "Tem de ter no",
      suffix: "caracteres!",
      min: "mínimo",
      max: "máximo"
    },
    inputNumber: {
      prefix: "Tem de ser",
      suffix: "!",
      min: "mínimo",
      max: "máximo"
    }
  } as const;

  // Get the component type
  const componentType = React.isValidElement(component) ? component.type : typeof component;

  let currentMessageParts: MessageParts;

  switch (componentType) {
    case TextArea:
      currentMessageParts = messageParts.textArea as MessageParts;
      break;
    case InputNumber:
      currentMessageParts = messageParts.inputNumber as MessageParts;
      break;
    default:
      throw new Error(`Invalid component type: ${String(componentType)}`);
  }

  // Get the min and max messages
  const minMessage = `${currentMessageParts.prefix} ${currentMessageParts.min} ${min} ${currentMessageParts.suffix}`;
  const maxMessage = `${currentMessageParts.prefix} ${currentMessageParts.max} ${max} ${currentMessageParts.suffix}`; 

  return { minMessage, maxMessage };
}

/**
 * Get the form items for a given type
 * @param config - The config for the form
 * @returns The form items
 */
const getFormItems = async ({ config }: GetFormItemsProps): Promise<FormItemConfig[]> => {
  // Initialize the form items array
  const formItems: FormItemConfig[] = [];

  // Iterate over the config and create the form items
  Object.entries(config).forEach(([str, restrictions]: [string, Restrictions]) => {
    // Convert the string to a RequestKeys type
    const fieldName = str as RequestKeys;

    // Only add form items for fields that are known
    if (fieldName in requestKeysFieldLabels) {
      // Get the label for the field
      const label = requestKeysFieldLabels[fieldName];

      // Default form item configuration
      const formItem: FormItemConfig = {
        label: label,
        name: fieldName,
        rules: [
          {
            required: !restrictions?.optional,
            message: `Por favor insira um valor!`,
          },
        ],
        component: <TextArea autoSave="true" autoCorrect="true" placeholder={label} rows={1}/>,
      };

      const min = restrictions.min;
      const max = restrictions.max;

      // Determine the appropriate component based on the field type
      switch (fieldName) {
        case LaboratoryFields.DURATION:
          addDurationFormComponent({ restrictions, formItem });
          break;
        case LaboratoryFields.QUEUE_LIMIT:
          formItem.component = <InputNumber autoSave="true" min={min} max={max}/>;
          break;
        default:
          // Get the min and max messages for the component
          const { minMessage, maxMessage } = getMinMaxMessages(formItem.component, min, max);
          
          formItem.rules.push({
            min: min,
            message: minMessage,
          });

          formItem.rules.push({
            max: max,
            message: maxMessage,
          });
      }

      formItems.push(formItem);
    }
  });

  return formItems;
};

/**
 * Default form props
 */
interface DefaultFormProps {
  configType: keyof DomainConfig;
  initialValues?: RequestTypes;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
  children?: React.ReactNode;
}

/**
 * Default form component
 */
export default function DefaultForm({
  configType,
  initialValues,
  onFinish,
  submitButtonText,
  children
}: DefaultFormProps) {
  const [form] = Form.useForm();
  const [formItems, setFormItems] = useState<FormItemConfig[]>([]);

  // Load form items and set initial values
  useEffect(() => {
    const loadFormData = async () => {
      try {
        // Get the config for the form
        const config = (await getDomainConfig())[configType];

        // Get the form items
        const formItems = await getFormItems({ config });

        // Set the form items
        setFormItems(formItems);
        
        // If there are initial values, set them in the form
        if (initialValues) {
          // Format the initial values if they are a LaboratoryRequest
          const formattedValues = LaboratoryFields.DURATION in initialValues ? formatLaboratory(initialValues) : initialValues;
          
          // Set the initial values in the form
          form.setFieldsValue(formattedValues);
        } else {
          // Set minimum values for numeric components
          const values = Object.fromEntries(
            formItems.map(formItem => {
              // Get the minimum value for the component
              const min = (config[formItem.name as keyof typeof config] as Restrictions).min;
              
              // Check if the component is a React element and get its type
              const componentType = React.isValidElement(formItem.component) ? formItem.component.type : null;
              
              // Set initial values only for numeric components
              if (componentType === InputNumber) {
                return [formItem.name, min] as [RequestKeys, number];
              }
              
              // For Duration, format the duration with minimum of 1 minute
              if (formItem.name === (LaboratoryFields.DURATION as RequestKeys)) {
                const duration = formatNumberToDayjs(min);
                return [formItem.name, duration] as [RequestKeys, ReturnType<typeof formatNumberToDayjs>];
              }
              
              // For other components (like TextArea), don't set initial value
              return [formItem.name, undefined] as [RequestKeys, undefined];
            })
          ) as Partial<RequestTypes>;
          form.setFieldsValue(values);
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    // Load the form data (defined above)
    void loadFormData();
  }, [configType, form, initialValues]);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
      >
        {formItems.map((item) => (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
          >
            {item.component}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitButtonText}
          </Button>
           {children}
        </Form.Item>
      </Form>
    </>
  );
}
