import { Card, Flex, Layout } from 'antd';

const labs = [
  {
    title: 'Lab 1',
    description: 'Test',
  },
  {
    title: 'Lab 2',
    description: 'Test',
  }
];

export default function Dashboard() {
  return (
    <Layout>
      <Flex wrap gap="small">
        {labs.map((lab, index) => (
          <Card
            key={index}
            title={lab.title}
            style={{ width: 300}}
          >
            <p>{lab.description}</p>
          </Card>
        ))}
      </Flex>
    </Layout>
  );
}
