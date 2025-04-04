"use client"

import { Form, Input } from "antd";
import DefaultPage from "~/app/components/pages/DefaultPage";

const formItems = [
  {
    label: "Nome",
    name: "name",
    rules: [{ required: true, message: "Por favor insira um nome!" }],
    component: <Input placeholder="Nome do laboratório" />,
  },
  {
    label: "Descrição",
    name: "description",
    rules: [{ required: true, message: "Por favor insira uma descrição!" }],
    component: <Input.TextArea placeholder="Descrição do laboratório" />,
  },
  {
    label: "Máquinas",
    name: "machines",
    rules: [{ required: true, message: "Por favor insira as máquinas!" }],
    component: <Input.TextArea placeholder="Máquinas do laboratório" />,
  },
  {
    label: "Data de início",
    name: "startDate",
    rules: [{ required: true, message: "Por favor insira uma data de início!" }],
    component: <Input placeholder="Data de início" />,
  },
  {
    label: "Data de término",
    name: "endDate",
    rules: [{ required: true, message: "Por favor insira uma data de término!" }],
    component: <Input placeholder="Data de término" />,
  }
]

export default function CreateLab() {
    return (
      <DefaultPage title="Criar laboratório">
        <Form>
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
        </Form>
      </DefaultPage>
    )
  }
