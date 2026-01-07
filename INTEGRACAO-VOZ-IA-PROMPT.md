# 🚀 PROMPT: Integração de Conversa por Voz com IA

## 📋 Visão Geral

Este prompt serve para orientar a implementação da funcionalidade de conversa por voz com uma IA em um webchat já existente. O objetivo é permitir que usuários possam falar e ouvir respostas da IA, tornando a experiência mais natural e acessível.

---

## 🎤 Funcionalidades de Voz

- **Reconhecimento de voz**: Captura e transcreve a fala do usuário para texto usando a Web Speech API do navegador.
- **Síntese de voz**: Converte as respostas da IA em áudio, utilizando ElevenLabs (opcional) ou a API nativa do navegador.
- **Controles de áudio**: Permite iniciar/parar gravação, mutar áudio e alternar entre texto e voz.
- **Fallback automático**: Se ElevenLabs não estiver disponível, utiliza a síntese de voz nativa do navegador.

---

## 🛠️ Passos de Implementação

1. **Reconhecimento de Voz (Entrada)**
   - Utilize a Web Speech API (`window.SpeechRecognition` ou `window.webkitSpeechRecognition`).
   - Configure o idioma conforme o público-alvo (ex: `pt-BR`).
   - Ao finalizar a transcrição, envie o texto para a IA processar.

2. **Síntese de Voz (Saída)**
   - (Opcional) Integre com ElevenLabs para respostas mais naturais.
   - Caso não utilize ElevenLabs, use `window.speechSynthesis` para ler as respostas da IA.
   - Permita ao usuário controlar o áudio (play, pause, mute).

3. **Controles de Interface**
   - Adicione botões para iniciar/parar gravação e alternar entre modos.
   - Exiba feedback visual durante a gravação e reprodução de áudio.

4. **Configuração de Variáveis de Ambiente**
   - Para ElevenLabs:
     - `ELEVENLABS_API_KEY` e `ELEVENLABS_AGENT_ID` (se aplicável).
   - Para Web Speech API, não é necessário configuração extra.

---

## 🧩 Exemplo de Fluxo

1. Usuário clica no botão de microfone.
2. Navegador solicita permissão e inicia gravação.
3. Fala do usuário é transcrita e enviada para a IA.
4. Resposta da IA é recebida em texto.
5. Resposta é convertida em áudio e reproduzida para o usuário.

---

## 🔗 Referências Úteis

- [Web Speech API (Reconhecimento)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Web Speech API (Síntese)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [ElevenLabs API](https://docs.elevenlabs.io/)

---

## ⚠️ Observações

- Sempre ofereça fallback para navegadores que não suportam APIs de voz.
- Garanta acessibilidade e feedback visual para todos os estados (gravando, reproduzindo, erro).
- Adapte textos e controles conforme o público e o contexto do seu projeto.

---

**Pronto! Use este prompt para guiar a integração da opção de voz com IA no seu webchat.**
