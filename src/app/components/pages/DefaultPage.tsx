import { Card } from "antd"

interface DefaultPageProps {
    title: string
    children: React.ReactNode
}

export default function DefaultPage({title, children}: DefaultPageProps) {
    return (
        <Card title={title} style={{ width:"50%", margin: "auto", padding: 20 }}>
            {children}
        </Card>
    )
}