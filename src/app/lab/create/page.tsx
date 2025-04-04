"use client"

import { Button, Form, Input, TimePicker } from "antd";
import DefaultPage from "~/app/components/pages/DefaultPage";

const formItems = [
  {
    label: "Nome",
    name: "name",
    rules: [{ required: true, message: "Por favor insira um nome!" }],
    component: <Input autoFocus={true} autoSave="true" autoCorrect="true" placeholder="Nome do laboratório" />,
  },
  {
    label: "Duração das sessões",
    name: "duration",
    rules: [{ required: true, message: "Por favor insira a duração!" }],
    component: <TimePicker autoSave="true" minuteStep={15} showSecond={false} showNow={false} changeOnScroll needConfirm={false} placeholder="Duração das sessões" />
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
          <Form.Item>
            <Button type="primary">Criar laboratório</Button>
          </Form.Item>
        </Form>
      </DefaultPage>
    )
  }
