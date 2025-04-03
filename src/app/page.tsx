import { PlusOutlined } from '@ant-design/icons';
import { Card, Flex, Layout } from 'antd';
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

const cardSyle = {
  width: labsWidth,
  height: "100%",
  hoverable: true
}

export default function Dashboard() {
  return (
    <Layout>
      <Flex wrap gap="small">
        {labs.map((lab, index) => {
          const labId = index + 1;
          return <Link href={`/lab/${labId}`} key={labId}>
            <Card
              key={labId}
              title={lab.title}
              style={cardSyle}
            >
              <p>{lab.description}</p>
            </Card>
          </Link>
        })}
      </Flex>
    </Layout>
  );
}
