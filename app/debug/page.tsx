"use client";

import { supabase } from "@/lib/supabase/clients/createClient";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);

  const handleSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setSupabaseUser(user);
      toast.success("Usuário autenticado com sucesso!");
    } else {
      toast.error("Nenhum usuário encontrado");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSupabaseUser(null);
    toast.info("Você foi desconectado");
  };

  // Funções de teste dos toasts
  const showSuccessToast = () => {
    toast.success("Operação realizada com sucesso!");
  };

  const showErrorToast = () => {
    toast.error("Ocorreu um erro ao processar a solicitação");
  };

  const showWarningToast = () => {
    toast.warning("Atenção! Verifique os dados antes de continuar");
  };

  const showInfoToast = () => {
    toast.info("Esta é uma mensagem informativa");
  };

  const showLoadingToast = () => {
    toast.loading("Carregando...");
  };

  const showDefaultToast = () => {
    toast("Esta é uma notificação padrão");
  };

  const showToastWithDescription = () => {
    toast.success("Arquivo enviado", {
      description: "O arquivo foi enviado com sucesso para o servidor",
    });
  };

  const showToastWithAction = () => {
    toast("Alterações pendentes", {
      description: "Você tem alterações não salvas",
      action: {
        label: "Salvar",
        onClick: () => toast.success("Alterações salvas!"),
      },
    });
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 3000));

    toast.promise(promise, {
      loading: "Processando...",
      success: "Processo concluído!",
      error: "Erro no processo",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-width mx-auto space-y-8">
        {/* Sessão de autenticação */}
        <Card className="p-6 space-y-4">
          <h2 className="title-4">Teste de Autenticação</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSession}>Verificar login</Button>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
          {supabaseUser && (
            <p className="text-muted-foreground">
              Usuário: {supabaseUser.email}
            </p>
          )}
        </Card>

        {/* Testes de Toast */}
        <Card className="p-6 space-y-6">
          <h2 className="title-4">Teste de Toasts</h2>

          {/* Toasts básicos */}
          <div className="space-y-3">
            <h3 className="title-5 text-muted-foreground">Tipos Básicos</h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={showSuccessToast} className="bg-primary">
                Success Toast
              </Button>
              <Button onClick={showErrorToast} className="bg-destructive">
                Error Toast
              </Button>
              <Button
                onClick={showWarningToast}
                className="bg-chart-5 text-background"
              >
                Warning Toast
              </Button>
              <Button
                onClick={showInfoToast}
                className="bg-chart-3 text-background"
              >
                Info Toast
              </Button>
              <Button onClick={showLoadingToast}>Loading Toast</Button>
              <Button onClick={showDefaultToast}>Default Toast</Button>
            </div>
          </div>

          {/* Toasts avançados */}
          <div className="space-y-3">
            <h3 className="title-5 text-muted-foreground">
              Variações Avançadas
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={showToastWithDescription}>Com Descrição</Button>
              <Button onClick={showToastWithAction}>Com Ação</Button>
              <Button onClick={showPromiseToast}>Promise Toast</Button>
            </div>
          </div>

          {/* Exemplos de código */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="title-5 text-muted-foreground">Exemplos de Uso</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2 font-mono text-sm">
              <p className="text-chart-1">
                toast.success(&quot;Mensagem&quot;)
              </p>
              <p className="text-destructive">
                toast.error(&quot;Mensagem&quot;)
              </p>
              <p className="text-chart-5">
                toast.warning(&quot;Mensagem&quot;)
              </p>
              <p className="text-chart-3">toast.info(&quot;Mensagem&quot;)</p>
              <p className="text-muted-foreground">
                toast.loading(&quot;Mensagem&quot;)
              </p>
              <p className="text-foreground">
                toast(&quot;Mensagem padrão&quot;)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
