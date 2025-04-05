import { Modal } from "antd";

interface DefaultModelProps {
    children?: React.ReactNode | null
    url?: string | null
    isModalOpen?: boolean
    handleCancel?: () => void
}

const modalOptions = {
    footer: null,
    width: 400,
    centered: true
}

export default function DefaultModal({
    children = null,
    url = null,
    isModalOpen = false,
    handleCancel = () => {},
}: DefaultModelProps) {
    return (
        <Modal open={isModalOpen} onCancel={() => handleCancel()} onClose={() => handleCancel()}{...modalOptions}>
            {children}
        </Modal>
    )
}