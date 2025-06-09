"use client";

import { Button, Form, InputNumber, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import dayjs from "dayjs";
import { type Rule } from "antd/es/form";
import type Laboratory from "~/types/laboratory";
import { getDomainConfig } from "~/services/domain";

interface FormItemConfig {
  label: string;
  name: string;
  rules?: Rule[];
  component: React.ReactNode;
}

const labConfig = (await getDomainConfig()).laboratory;

export const formItems: FormItemConfig[] = [
  {
    label: "Nome",
    name: "name",
    rules: [
      {
        required: !labConfig.labName.optional,
        message: "Por favor insira um nome!",
      },
      {
        min: labConfig.labName.min,
        message: `O nome deve ter pelo menos ${labConfig.labName.min} caracteres!`,
      },
      {
        max: labConfig.labName.max,
        message: `O nome deve ter no máximo ${labConfig.labName.max} caracteres!`,
      },
    ],
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
    rules: [
      {
        required: !labConfig.labDescription.optional,
        message: "Por favor insira uma descrição!",
      },
      {
        min: labConfig.labDescription.min,
        message: `A descrição deve ter pelo menos ${labConfig.labDescription.min} caracteres!`,
      },
      {
        max: labConfig.labDescription.max,
        message: `A descrição deve ter no máximo ${labConfig.labDescription.max} caracteres!`,
      },
    ],
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
    rules: [
      {
        required: !labConfig.labDuration.optional,
        message: "Por favor insira a duração!",
      },
      {
        validator: (_: unknown, value: dayjs.Dayjs | null | undefined) => {
          if (value) {
            const totalMinutes = value.hour() * 60 + value.minute();
            if (
              labConfig.labDuration.min !== undefined &&
              totalMinutes < labConfig.labDuration.min
            ) {
              return Promise.reject(
                new Error(
                  `A duração mínima é de ${labConfig.labDuration.min / 60} horas!`,
                ),
              );
            }
            if (
              labConfig.labDuration.max !== undefined &&
              totalMinutes > labConfig.labDuration.max
            ) {
              return Promise.reject(
                new Error(
                  `A duração máxima é de ${labConfig.labDuration.max / 60} horas!`,
                ),
              );
            }
          }
          return Promise.resolve();
        },
      },
    ],
    component: (
      <TimePicker
        format="HH:mm"
        autoSave="true"
        minuteStep={1}
        showSecond={false}
        showNow={false}
        changeOnScroll
        needConfirm={false}
        placeholder="Duração das sessões"
        disabledTime={() => {
          const maxMinutes = labConfig.labDuration.max;
          return {
            disabledHours: () =>
              Array.from({ length: 24 }, (_, i) => i).filter(
                (h) => h * 60 > maxMinutes,
              ),
            disabledMinutes: (selectedHour) => {
              if (selectedHour * 60 >= maxMinutes) {
                return Array.from({ length: 60 }, (_, i) => i);
              }
              if ((selectedHour + 1) * 60 > maxMinutes) {
                return Array.from({ length: 60 }, (_, i) => i).filter(
                  (m) => selectedHour * 60 + m > maxMinutes,
                );
              }
              return [];
            },
          };
        }}
      />
    ),
  },
  {
    label: "Limite da fila de espera",
    name: "queueLimit",
    rules: [
      {
        required: !labConfig.labQueueLimit.optional,
        message: "Por favor insira o limite!",
      },
      {
        type: "number",
        min: labConfig.labQueueLimit.min,
        message: `O limite da fila deve ser no mínimo ${labConfig.labQueueLimit.min}!`,
      },
      {
        type: "number",
        max: labConfig.labQueueLimit.max,
        message: `O limite da fila deve ser no máximo ${labConfig.labQueueLimit.max}!`,
      },
    ],
    component: (
      <InputNumber
        autoSave="true"
        min={labConfig.labQueueLimit.min}
        max={labConfig.labQueueLimit.max}
        placeholder="Limite da fila de espera"
      />
    ),
  },
];

interface LabInfoFormProps {
  initialValues?: Laboratory;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

export default function LabInfoForm({
  initialValues,
  onFinish,
  submitButtonText,
}: LabInfoFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        duration: initialValues.labDuration
          ? dayjs(initialValues.labDuration, "HH:mm")
          : undefined,
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
