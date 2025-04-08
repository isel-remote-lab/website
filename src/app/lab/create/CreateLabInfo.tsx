"use client";

import { Button, Form, InputNumber, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";

const formItems = [
  {
    label: "Nome",
    name: "name",
    rules: [{ required: true, message: "Por favor insira um nome!" }],
    component: (
      <TextArea
        autoFocus={true}
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

export default function CreateLabInfo() {
  return (
    <Form
      initialValues={{
        queueLimit: 1,
      }}
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
        <Button type="primary">Criar laboratório</Button>
      </Form.Item>
    </Form>
  );
}
