import { Card, Flex, Layout } from 'antd';
import Link from 'next/link';

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
        {labs.map((lab, index) => {
          const labId = index + 1;
          return <Link href={`/lab/${labId}`} key={labId}>
            <Card
              key={labId}
              title={lab.title}
              style={{ width: 300}}
            >
              <p>{lab.description}</p>
            </Card>
          </Link>
        })}
      </Flex>
    </Layout>
  );
}
