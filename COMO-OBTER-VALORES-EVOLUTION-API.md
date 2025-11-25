# Como Obter os Valores das 3 Variáveis da Evolution API

Este guia explica **passo a passo** como obter os valores das 3 variáveis que você precisa configurar na Vercel após instalar a Evolution API.

---

## 📋 Resumo das 3 Variáveis

1. **EVOLUTION_API_BASE_URL** - URL base da sua Evolution API
2. **EVOLUTION_API_APIKEY** - Chave de autenticação da Evolution API
3. **EVOLUTION_API_INSTANCE_ID** - ID da instância do WhatsApp criada

---

## 🔑 1. EVOLUTION_API_APIKEY (Chave de API)

### O que é:
Chave de autenticação que você **define** ao configurar a Evolution API. É uma chave secreta que você mesmo cria.

### Como obter/criar:

#### Opção A: Gerar uma chave segura (Recomendado)

Na sua VPS, execute:

```bash
openssl rand -base64 32
```

Isso vai gerar algo como:
```
aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=
```

**Esta é a chave que você vai usar!**

#### Opção B: Definir manualmente

Você pode criar qualquer string segura, por exemplo:
```
sonia-evolution-api-key-2024-secure-random-string
```

### Onde usar:

1. **No arquivo `.env` da VPS** (durante instalação):
   ```bash
   EVOLUTION_API_APIKEY=aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=
   ```

2. **No `docker-compose.yml`** (referência):
   ```yaml
   environment:
     - AUTHENTICATION_API_KEY=${EVOLUTION_API_APIKEY}
   ```

3. **Na Vercel** (variável de ambiente):
   ```
   EVOLUTION_API_APIKEY=aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=
   ```

⚠️ **IMPORTANTE**: Use a **mesma chave** em todos os lugares!

---

## 🌐 2. EVOLUTION_API_BASE_URL (URL Base)

### O que é:
A URL completa onde sua Evolution API está acessível publicamente (com HTTPS).

### Como obter:

#### Passo 1: Definir o domínio

Você precisa ter um domínio apontando para o IP da sua VPS, por exemplo:
- `evolution.sonia.onsmart.ai`
- Ou qualquer subdomínio que você escolher

#### Passo 2: Configurar DNS

No seu provedor de DNS, crie um registro A apontando para o IP da VPS:
```
Tipo: A
Nome: evolution.sonia (ou @)
Valor: IP_DA_SUA_VPS
TTL: 3600
```

#### Passo 3: Configurar SSL (Let's Encrypt)

Após configurar o Nginx e obter o certificado SSL, sua URL será:
```
https://evolution.sonia.onsmart.ai
```

### Valor final:

```
EVOLUTION_API_BASE_URL=https://evolution.sonia.onsmart.ai
```

⚠️ **IMPORTANTE**: 
- Deve começar com `https://`
- Não deve terminar com `/`
- Deve ser acessível publicamente

### Como testar:

```bash
curl https://evolution.sonia.onsmart.ai/health
```

Se retornar algo (mesmo que seja erro 404), o domínio está funcionando.

---

## 📱 3. EVOLUTION_API_INSTANCE_ID (ID da Instância)

### O que é:
O nome/ID da instância do WhatsApp que você cria na Evolution API. É o identificador da conexão do WhatsApp.

### Como obter:

#### Passo 1: Evolution API deve estar rodando

Certifique-se de que a Evolution API está funcionando:
```bash
docker ps
docker logs evolution-api
```

#### Passo 2: Criar a instância

Execute o comando para criar a instância (ajustar conforme doc v2):

```bash
curl -X POST https://evolution.sonia.onsmart.ai/instance/create \
  -H "apikey: SUA_CHAVE_API_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "sonia-whatsapp",
    "token": "",
    "qrcode": true
  }'
```

⚠️ **AJUSTAR**:
- URL do endpoint (conforme doc v2)
- Nome do header de autenticação (pode ser `apikey`, `Authorization`, etc.)
- Estrutura do payload

#### Passo 3: Verificar resposta

A resposta deve conter informações sobre a instância criada. O `instanceName` que você definiu é o **INSTANCE_ID**.

**Exemplo de resposta**:
```json
{
  "instance": {
    "instanceName": "sonia-whatsapp",
    "status": "created",
    ...
  }
}
```

#### Passo 4: Obter QR Code para conectar

```bash
curl -X GET https://evolution.sonia.onsmart.ai/instance/connect/sonia-whatsapp \
  -H "apikey: SUA_CHAVE_API_AQUI"
```

Isso retorna o QR Code que você escaneia com o WhatsApp.

#### Passo 5: Verificar instâncias existentes

```bash
curl -X GET https://evolution.sonia.onsmart.ai/instance/fetchInstances \
  -H "apikey: SUA_CHAVE_API_AQUI"
```

Isso lista todas as instâncias. O `instanceName` que você criou é o valor que você precisa.

### Valor final:

Se você criou a instância com o nome `sonia-whatsapp`, então:

```
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp
```

⚠️ **IMPORTANTE**: 
- Use o **mesmo nome** que você usou ao criar a instância
- Geralmente é um nome simples, sem espaços, em minúsculas
- Exemplos: `sonia-whatsapp`, `sonia`, `whatsapp-sonia`

---

## 📝 Checklist Completo

### Durante a Instalação (VPS):

- [ ] ✅ Gerar `EVOLUTION_API_APIKEY` com `openssl rand -base64 32`
- [ ] ✅ Adicionar no arquivo `.env` da VPS
- [ ] ✅ Configurar domínio e DNS
- [ ] ✅ Configurar SSL (Let's Encrypt)
- [ ] ✅ Testar acesso: `curl https://seu-dominio.com/health`
- [ ] ✅ Criar instância do WhatsApp
- [ ] ✅ Conectar WhatsApp (escanear QR Code)
- [ ] ✅ Verificar status da instância

### Após Instalação (Vercel):

- [ ] ✅ Adicionar `EVOLUTION_API_BASE_URL=https://seu-dominio.com`
- [ ] ✅ Adicionar `EVOLUTION_API_APIKEY=<chave_gerada>`
- [ ] ✅ Adicionar `EVOLUTION_API_INSTANCE_ID=<nome_da_instancia>`
- [ ] ✅ Fazer redeploy na Vercel

---

## 🔍 Verificação Final

Após configurar tudo, teste se está funcionando:

### 1. Testar envio de mensagem via Evolution API:

```bash
curl -X POST https://evolution.sonia.onsmart.ai/message/sendText/sonia-whatsapp \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999",
    "text": "Teste"
  }'
```

### 2. Verificar logs na Vercel:

- Acesse o painel da Vercel
- Vá em **Deployments** → deployment mais recente
- Clique em **Functions** → `api/whatsapp/webhook`
- Verifique se não há erros relacionados às variáveis

---

## ⚠️ Problemas Comuns

### Erro: "API key not configured"
- Verifique se `EVOLUTION_API_APIKEY` está configurada na Vercel
- Verifique se a chave é a mesma usada na VPS

### Erro: "Could not connect to Evolution API"
- Verifique se `EVOLUTION_API_BASE_URL` está correto
- Verifique se o domínio está acessível: `curl https://seu-dominio.com`
- Verifique se o SSL está funcionando

### Erro: "Instance not found"
- Verifique se `EVOLUTION_API_INSTANCE_ID` está correto
- Verifique se a instância existe: `curl .../instance/fetchInstances`
- Verifique se o nome da instância está exatamente igual

---

## 📚 Referências

- Documentação Evolution API v2: https://doc.evolution-api.com/v2/
- Guia de Instalação: `INSTALACAO-EVOLUTION-API.md`
- Guia de Testes: `TESTES-POSTMAN.md`

