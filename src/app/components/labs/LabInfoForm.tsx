"use client";

import { Button, Form, InputNumber, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import dayjs from "dayjs";

export const formItems = [
  {
    label: "Nome",
    name: "name",
    rules: [{ required: true, message: "Por favor insira um nome!" }],
    component: (
      <TextArea
        autoFocus
        autoSave="true"
        autoCorrect="true"
        placeholder="Nome do laboratório"
      />
    ),
  },
  {
    label: "Descrição",
    name: "description",
    rules: [{ message: "Por favor insira uma descrição!" }],
    component: (
      <TextArea
        autoSave="true"
        autoCorrect="true"
        placeholder="Descrição do laboratório"
      />
    ),
  },
  {
    label: "Duração das sessões",
    name: "duration",
    rules: [{ required: true, message: "Por favor insira a duração!" }],
    component: (
      <TimePicker
        format="HH:mm"
        autoSave="true"
        minuteStep={15}
        showSecond={false}
        showNow={false}
        changeOnScroll
        needConfirm={false}
        placeholder="Duração das sessões"
      />
    ),
  },
  {
    label: "Limite da fila de espera",
    name: "queueLimit",
    rules: [{ required: true, message: "Por favor insira o limite!" }],
    component: (
      <InputNumber
        autoSave="true"
        min={1}
        placeholder="Limite da fila de espera"
      />
    ),
  },
];

interface LabInfoFormProps {
  initialValues?: {
    name: string;
    description: string;
    duration: string;
    queueLimit: number;
  };
  onFinish: (values: any) => void;
  submitButtonText: string;
}

export default function LabInfoForm({ initialValues, onFinish, submitButtonText }: LabInfoFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        duration: initialValues.duration ? dayjs(initialValues.duration, "HH:mm") : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      initialValues={{
        queueLimit: 1,
      }}
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
      </Form.Item>
    </Form>
  );
} 