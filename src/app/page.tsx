import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Layout, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

const labsWidth = 300;

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

const cardStyle = {
  width: labsWidth,
  height: "100%",
  hoverable: true,
  border: "none"
}

export default function Dashboard() {
  return (
    <Layout>
      <Title level={2}>Os meus laboratórios</Title>
      <Flex wrap gap="small">
        {labs.map((lab, index) => {
          const labId = index + 1;
          return (
            <Tooltip title={lab.title} key={labId}>
              <Link href={`/lab/${labId}`} key={labId}>
                <Card
                  key={labId}
                  title={lab.title}
                  style={cardStyle}
                >
                  <p>{lab.description}</p>
                </Card>
              </Link>
            </Tooltip>
          )
        })}
        <Tooltip title="Criar laboratório">
          <Link href="/lab/create">
            <Button style={cardStyle} icon={<PlusOutlined />} size="large"/>
          </Link>
        </Tooltip>
      </Flex>
    </Layout>
  );
}
