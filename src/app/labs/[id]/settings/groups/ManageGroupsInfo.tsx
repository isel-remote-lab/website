import { List, Typography, Button } from 'antd';
import type { Laboratory } from '~/types/laboratory';

interface ManageGroupsInfoProps {
  laboratory: Laboratory;
}

export default function ManageGroupsInfo({ laboratory }: ManageGroupsInfoProps) {
  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Criar Grupo
      </Button>
      <List
        dataSource={laboratory.groups}
        renderItem={(group) => (
          <List.Item>
            <div>
              <Typography.Title level={5}>{group.groupName}</Typography.Title>
              <Typography.Paragraph>{group.groupDescription}</Typography.Paragraph>
              <Typography.Text type="secondary">
                Created at: {new Date(group.createdAt).toLocaleDateString()}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
