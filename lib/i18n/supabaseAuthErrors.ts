export const supabaseAuthErrorsPTBR = {
  anonymous_provider_disabled: "Logins anônimos estão desativados.",
  bad_code_verifier:
    "Falha na validação do código. Isso indica um erro na implementação do app.",
  bad_json: "O corpo da requisição não está em formato JSON válido.",
  bad_jwt: "O token enviado no cabeçalho Authorization é inválido.",
  bad_oauth_callback:
    "O retorno do login OAuth está incompleto. Verifique a integração com o provedor.",
  bad_oauth_state:
    "O estado retornado pelo provedor OAuth está inválido. Verifique a integração.",
  captcha_failed:
    "Falha na verificação do CAPTCHA. Verifique a configuração do provedor.",
  conflict:
    "Houve um conflito no banco de dados. Tente novamente em alguns instantes.",
  email_address_invalid:
    "Esse endereço de email não é válido para cadastro. Use outro email.",
  email_address_not_authorized:
    "Não é permitido enviar email para este endereço com o SMTP padrão.",
  email_conflict_identity_not_deletable:
    "Não é possível desvincular essa conta porque o email já está em uso.",
  email_exists: "Este email já está cadastrado.",
  email_not_confirmed: "Login não permitido: email ainda não confirmado.",
  email_provider_disabled: "Cadastro por email e senha está desativado.",
  flow_state_expired: "A sessão expirou. Peça para o usuário entrar novamente.",
  flow_state_not_found:
    "O estado da autenticação não foi encontrado. Peça para entrar novamente.",
  hook_payload_invalid_content_type:
    "O payload enviado não tem um Content-Type válido.",
  hook_payload_over_size_limit: "O payload enviado é muito grande.",
  hook_timeout: "O servidor demorou demais para responder.",
  hook_timeout_after_retry: "O servidor não respondeu após várias tentativas.",
  identity_already_exists: "Essa identidade já está vinculada a outro usuário.",
  identity_not_found: "Identidade não encontrada ou já foi removida.",
  insufficient_aal:
    "É necessário um nível de segurança maior. Complete a verificação MFA.",
  invalid_credentials: "Email ou senha incorretos.",
  invite_not_found: "Convite expirado ou inválido.",
  manual_linking_disabled:
    "Não é permitido vincular contas manualmente neste servidor.",
  mfa_challenge_expired: "O desafio MFA expirou. Solicite um novo código.",
  mfa_factor_name_conflict: "Já existe um fator MFA com esse nome.",
  mfa_factor_not_found: "Fator MFA não encontrado.",
  mfa_ip_address_mismatch: "A verificação MFA deve ser feita no mesmo IP.",
  mfa_phone_enroll_not_enabled: "Cadastro de MFA via telefone está desativado.",
  mfa_phone_verify_not_enabled: "Verificação via telefone está desativada.",
  mfa_totp_enroll_not_enabled: "Cadastro de MFA TOTP está desativado.",
  mfa_totp_verify_not_enabled: "Verificação via TOTP está desativada.",
  mfa_verification_failed: "Código MFA incorreto.",
  mfa_verification_rejected: "Verificação MFA rejeitada. Tente novamente.",
  mfa_verified_factor_exists:
    "Já existe um número verificado. Remova o anterior para continuar.",
  mfa_web_authn_enroll_not_enabled: "Cadastro de MFA WebAuthn está desativado.",
  mfa_web_authn_verify_not_enabled: "Verificação via WebAuthn está desativada.",
  no_authorization: "Cabeçalho Authorization não foi enviado.",
  not_admin: "Acesso negado: usuário não é admin.",
  oauth_provider_not_supported: "Provedor OAuth desativado.",
  otp_disabled: "Login por OTP (link mágico/email) está desativado.",
  otp_expired: "O código expirou. Tente novamente.",
  over_email_send_rate_limit:
    "Muitos emails enviados. Aguarde um pouco antes de tentar novamente.",
  over_request_rate_limit:
    "Muitas requisições. Tente novamente em alguns minutos.",
  over_sms_send_rate_limit:
    "Muitos SMS enviados. Aguarde um pouco antes de tentar novamente.",
  phone_exists: "Este número de telefone já está cadastrado.",
  phone_not_confirmed: "Login não permitido: telefone não confirmado.",
  phone_provider_disabled: "Cadastro por telefone e senha está desativado.",
  provider_disabled: "Este provedor está desativado no servidor.",
  provider_email_needs_verification:
    "O provedor OAuth não confirmou o email. Enviamos um email de verificação.",
  reauthentication_needed: "É necessário reautenticar para alterar a senha.",
  reauthentication_not_valid:
    "Reautenticação inválida. Solicite um novo código.",
  refresh_token_already_used: "Este token já foi usado. Faça login novamente.",
  refresh_token_not_found: "Sessão não encontrada.",
  request_timeout: "A requisição demorou demais. Tente novamente.",
  same_password: "A nova senha deve ser diferente da atual.",
  saml_assertion_no_email:
    "O provedor SAML não retornou email. Verifique a configuração.",
  saml_assertion_no_user_id:
    "O provedor SAML não retornou user ID. Verifique a configuração.",
  saml_entity_id_mismatch:
    "Não foi possível atualizar o provedor SAML. Crie um novo provedor.",
  saml_idp_already_exists: "Provedor SAML já existe.",
  saml_idp_not_found: "Provedor SAML não encontrado.",
  saml_metadata_fetch_failed: "Falha ao buscar os dados do provedor SAML.",
  saml_provider_disabled: "SSO SAML está desativado.",
  saml_relay_state_expired: "O estado SAML expirou. Faça login novamente.",
  saml_relay_state_not_found:
    "O estado SAML não foi encontrado. Faça login novamente.",
  session_expired: "Sessão expirada. Faça login novamente.",
  session_not_found: "Sessão não encontrada.",
  signup_disabled: "Cadastro de novos usuários está desativado.",
  single_identity_not_deletable:
    "Não é possível remover a única identidade do usuário.",
  sms_send_failed: "Falha ao enviar SMS. Tente novamente mais tarde.",
  sso_domain_already_exists:
    "Já existe um domínio SSO cadastrado para este provedor.",
  sso_provider_not_found: "Provedor SSO não encontrado.",
  too_many_enrolled_mfa_factors: "Limite de fatores MFA atingido.",
  unexpected_audience: "Requisição inválida. O token não é para este serviço.",
  unexpected_failure:
    "Falha inesperada no serviço. Tente novamente mais tarde.",
  user_already_exists: "Usuário já cadastrado.",
  user_banned: "Usuário banido. Aguarde até o ban ser removido.",
  user_not_found: "Usuário não encontrado.",
  user_sso_managed: "Usuário SSO não pode alterar este campo.",
  validation_failed:
    "Dados inválidos. Verifique as informações e tente novamente.",
  weak_password: "Senha fraca. Use uma senha mais forte.",
} as const;
