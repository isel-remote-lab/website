import { Button, Form, Select } from "antd";
import { FormItemConfig } from "~/types/form";
import { GroupFields } from "~/types/group";

interface AddElementFormProps {
  elements: any[];
  allElements: any[];
  onFinish: (values: unknown) => Promise<void>;
}

/**
   * Form to add a group to the lab
   * @returns The form to add a group to the lab
   */
export default function AddElementForm({ onFinish, elements, allElements, elementName }: AddElementFormProps) {
    const filteredElements = elements.filter((element) => !allElements.some((e) => e.id === element.id));

    return (
      <Form onFinish={onFinish}>
        <Form.Item name="group" label="Grupo">
          <Select options={filteredElements.map((element) => ({ label: element[GroupFields.NAME], value: element.id }))} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
      </Form>
    );
  }