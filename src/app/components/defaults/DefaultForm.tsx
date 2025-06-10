"use client";

import { Button, Form, InputNumber, TimePicker, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getDomainConfig } from "~/server/services/domain";
import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";
import DefaultDrawer from "./DefaultDrawer";
import { FormItemConfig } from "~/types/form";
import DomainConfig, { RestrictionsObjects } from "~/types/domain";
import addDurationFormComponent, { formatDuration } from "../formComponents/addDurationFormComponent";
import React from "react";
import Link from "next/link";
import { GroupOutlined, SettingOutlined, UsergroupAddOutlined } from "@ant-design/icons";

/**
 * Get the label for a field based on its name
 * @param name - The name of the field
 * @returns The label for the field
 */
const getFieldLabel = (name: string): string => {
  let label: string;

  if (name.endsWith('Name')) {
    label = "Nome";
  } else if (name.endsWith('Description')) {
    label = "Descrição";
  } else {
    switch (name) {
      case "labDuration":
        label = "Duração das sessões";
        break;
      case "labQueueLimit":
        label = "Limite da fila de espera";
        break;
      default:
        label = name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  return label;
};

/**
 * Get the form items for a given type
 * @param config - The config for the form
 * @returns The form items
 */
interface GetFormItemsProps {
  config: RestrictionsObjects;
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
  Object.entries(config).forEach(([name , restrictions]) => {
    const label = getFieldLabel(name);
    const placeholder = label + " do " + (name.includes('Duration') ? "laboratório" : "grupo");

    // Default form item configuration
    const formItem: FormItemConfig = {
      label: label,
      name: name,
      rules: [
        {
          required: !restrictions.optional,
          message: `Por favor insira um valor!`,
        },
      ],
      component: <TextArea autoSave="true" autoCorrect="true" placeholder={placeholder} rows={1}/>,
    };

    // Determine the appropriate component based on the field type
    if (name.includes('Duration')) {
      addDurationFormComponent({ restrictions, formItem });
    } else {
      if (name.includes('QueueLimit')) {
        formItem.component = <InputNumber autoSave="true" min={restrictions.min} max={restrictions.max}/>;
      } else {
        const message = `Tem de ter no`;
        const minMessage = `${message} mínimo ${restrictions.min} caracteres!`;
        const maxMessage = `${message} máximo ${restrictions.max} caracteres!`;

        // Add min/max rules if they exist and if the field is not a duration
        if (restrictions.min !== undefined) {
          formItem.rules.push({
            min: restrictions.min,
            message: minMessage,
          });
        }
        if (restrictions.max !== undefined) {
          formItem.rules.push({
            max: restrictions.max,
            message: maxMessage,
          });
        }
      }
    }

    formItems.push(formItem);
  });

  return formItems;
};

/**
 * Default form props
 */
interface DefaultFormProps {
  type: keyof DomainConfig;
  initialValues?: Record<string, any>;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

/**
 * Default form component
 */
export default function DefaultForm({
  type,
  initialValues,
  onFinish,
  submitButtonText
}: DefaultFormProps) {
  const [form] = Form.useForm();
  const [isGroupsDrawerOpen, setIsGroupsDrawerOpen] = useState(false);
  const [formItems, setFormItems] = useState<FormItemConfig[]>([]);
  const [initialFormValues, setInitialFormValues] = useState<Record<string, any>>({});

  // Load form items and set initial values
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const config = (await getDomainConfig())[type];
        const items = await getFormItems({ config });
        setFormItems(items);
        
        if (initialValues) {
          const formattedValues = { ...initialValues };
          if (initialValues?.labDuration) {
            formattedValues.labDuration = formatDuration(initialValues.labDuration);
          }
          form.setFieldsValue(formattedValues);
        } else {
          // Set initial values based on restrictions
          const values = Object.fromEntries(
            items.map(item => {
              const restrictions = config[item.name as keyof RestrictionsObjects] as { min?: number };
              
              // Check if the component is a React element and get its type
              const componentType = React.isValidElement(item.component) ? item.component.type : null;
              
              // Set initial values only for numeric components
              if (componentType === InputNumber) {
                return [item.name, restrictions.min];
              }
              
              // For Duration, format the duration with minimum of 1 minute
              if (item.name.includes('Duration')) {
                const duration = formatDuration(restrictions.min!);
                return [item.name, duration];
              }
              
              // For other components (like TextArea), don't set initial value
              return [item.name, undefined];
            })
          );
          setInitialFormValues(values);
          form.setFieldsValue(values);
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadFormData();
  }, [type, form]);

  // Check if the form is being used to edit a laboratory
  const isEditLaboratory = Boolean(initialValues?.id && type === "laboratory");

  const handleGroupsDrawerClose = () => {
    setIsGroupsDrawerOpen(false);
    window.history.pushState({}, '', `/labs/${initialValues?.id}/settings`);
  };

  return (
    <>
      <Form
        form={form}
        initialValues={initialFormValues}
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
          {isEditLaboratory && (
          <Tooltip title="Gerir Grupos" key="groups">
            <Button type="default" style={{ marginLeft: 8 }}>
              <Link href={`/labs/${initialValues?.id}/settings/groups`}>
                <UsergroupAddOutlined />
              </Link>
            </Button>
          </Tooltip>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
