import { Card } from "antd"

interface DefaultPageProps {
  title?: string | null;
  children?: React.ReactNode | null;
}

export default function DefaultPage({
  title = null,
  children = null
}: DefaultPageProps) {
  return (
    <Card title={title} style={{ width: "50%", margin: "auto", padding: 20 }}>
      {children}
    </Card>
  )
}