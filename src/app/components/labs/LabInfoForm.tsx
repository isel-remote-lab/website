"use client";

import { Button, Form, InputNumber, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Rule } from "antd/es/form";
import Laboratory from "~/types/laboratory";
import { 
  labDescriptionOptional, 
  labDurationOptional,
  labDurationUnit,
  labNameMax, 
  labNameMin, 
  labNameOptional, 
  labQueueLimitOptional,
  labDescriptionMax,
  labDescriptionMin,
  labDurationMax,
  labDurationMin,
  labQueueLimitMax,
  labQueueLimitMin,
} from "~/services/domain";

interface FormItemConfig {
  label: string;
  name: string;
  rules?: Rule[];
  component: React.ReactNode;
}

export const formItems: FormItemConfig[] = [
  {
    label: "Nome",
    name: "name",
    rules: [
      { required: !labNameOptional, message: "Por favor insira um nome!" },
      { min: labNameMin, message: `O nome deve ter pelo menos ${labNameMin} caracteres!` },
      { max: labNameMax, message: `O nome deve ter no máximo ${labNameMax} caracteres!` }
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
      { required: !labDescriptionOptional, message: "Por favor insira uma descrição!" },
      { min: labDescriptionMin, message: `A descrição deve ter pelo menos ${labDescriptionMin} caracteres!` },
      { max: labDescriptionMax, message: `A descrição deve ter no máximo ${labDescriptionMax} caracteres!` }
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
      { required: !labDurationOptional, message: "Por favor insira a duração!" },
      {
        validator: (_: any, value: dayjs.Dayjs | null | undefined) => {
          if (value) {
            const totalMinutes = value.hour() * 60 + value.minute();
            if (labDurationMin !== undefined && totalMinutes < labDurationMin) {
              return Promise.reject(new Error(`A duração mínima é de ${labDurationMin / 60} horas!`));
            }
            if (labDurationMax !== undefined && totalMinutes > labDurationMax) {
              return Promise.reject(new Error(`A duração máxima é de ${labDurationMax / 60} horas!`));
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
          const maxMinutes = labDurationMax;
          return {
            disabledHours: () => Array.from({length: 24}, (_, i) => i).filter(h => h * 60 > maxMinutes),
            disabledMinutes: (selectedHour) => {
              if (selectedHour * 60 >= maxMinutes) {
                return Array.from({length: 60}, (_, i) => i);
              }
              if ((selectedHour + 1) * 60 > maxMinutes) {
                return Array.from({length: 60}, (_, i) => i).filter(m => selectedHour * 60 + m > maxMinutes);
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
      { required: !labQueueLimitOptional, message: "Por favor insira o limite!" },
      { type: 'number', min: labQueueLimitMin, message: `O limite da fila deve ser no mínimo ${labQueueLimitMin}!` },
      { type: 'number', max: labQueueLimitMax, message: `O limite da fila deve ser no máximo ${labQueueLimitMax}!` }
    ],
    component: (
      <InputNumber
        autoSave="true"
        min={labQueueLimitMin}
        max={labQueueLimitMax}
        placeholder="Limite da fila de espera"
      />
    ),
  },
];

interface LabInfoFormProps {
  initialValues?: Laboratory;
  onFinish: (values: any) => void;
  submitButtonText: string;
}

export default function LabInfoForm({ initialValues, onFinish, submitButtonText }: LabInfoFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        duration: initialValues.labDuration ? dayjs(initialValues.labDuration, "HH:mm") : undefined,
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