"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountOption() {
    const router = useRouter()

    const [openAccount, setOpenAccount] = useState(false)
    
    useEffect(() => {
        // Obtém a URL atual
        const currentUrl = window.location.href;
        // Modifica a URL adicionando ou alterando parâmetros de consulta
        const newUrl = `${currentUrl}account`;
        // Atualiza a URL sem recarregar a página
        window.history.pushState({}, '', newUrl);

        router.refresh();
    }, [openAccount]);

    return (
        <div onClick={() => setOpenAccount(!openAccount)}>
            Conta
        </div>
    )
}