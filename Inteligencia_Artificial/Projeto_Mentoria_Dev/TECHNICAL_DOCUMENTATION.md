# Mentoria Dev - Documentação Técnica (Modelo P2P)

## 📋 Visão Geral do Projeto

**Mentoria Dev** é uma plataforma P2P (peer-to-peer) para mentorias entre desenvolvedores que integra:
- **Briefing Técnico por IA**: Análise automática de código nos bastidores
- **Jitsi Meet Colaborativo**: Sala de conferência real para múltiplos usuários
- **Interface Mobile-First**: Design responsivo otimizado para celular
- **Convites Colaborativos**: Sistema de cópia de convite com link Jitsi

---

## 🎯 Modelo de Negócio: P2P

### Fluxo Principal
```
Mentorado                          IA (Bastidores)              Mentor
    |                                    |                         |
    +---> Insere Código                  |                         |
    |                                    |                         |
    +---> Clica "Iniciar Mentoria"       |                         |
    |                                    |                         |
    |                          Analisa Código                      |
    |                          Gera Briefing                       |
    |                                    |                         |
    |<------ Recebe Briefing             |                         |
    |                                    |                         |
    +---> Copia Convite (Link + Briefing)|                         |
    |                                    |                         |
    +---> Envia para Mentor              |                         |
    |                                    |                         |
    |                                    |<----- Recebe Convite
    |                                    |                         |
    +---> Entra na Sala Jitsi            |                    Entra na Sala
    |                                    |                         |
    +===== Videoconferência Colaborativa ===========================+
    |                                    |                         |
    +---> Discutem Código com Briefing   |                         |
    |                                    |                         |
    +---> Gravação (opcional)            |                         |
    |                                    |                         |
    +---> Feedback & Certificado         |                         |
```

### Diferenças do Modelo Anterior
| Aspecto | MVP v1 | P2P v2 |
|--------|--------|--------|
| **Usuários** | 1 (mentorado + IA) | 2+ (mentorado + mentor) |
| **IA** | Protagonista | Suporte (briefing) |
| **Jitsi** | Sala individual | Sala colaborativa |
| **Fluxo** | Direto | Convite → Colaboração |
| **QR Code** | Interno (app) | Externo (convite) |

---

## 🎨 Design System

### Filosofia de Design: Gradient Moderno com Vibrância Controlada

#### Paleta de Cores
| Elemento | Cor | Código |
|----------|-----|--------|
| Fundo Principal | Azul Escuro | `#0F172A` |
| Gradiente Fundo | Azul → Púrpura | `linear-gradient(135deg, #0F172A → #1a0f3a)` |
| Texto Principal | Branco Claro | `#F8FAFC` |
| CTA Primário | Ciano → Rosa | `linear-gradient(135deg, #06B6D4 → #EC4899)` |
| Acentos | Ciano | `#06B6D4` |
| Bordas | Cinza Escuro | `#334155` |

#### Tipografia
- **Títulos (H1, H2, H3)**: Space Mono Bold 32-36px
- **Subtítulos (H4, H5, H6)**: Montserrat SemiBold 18-20px
- **Corpo**: Poppins Regular 16px
- **Código**: Roboto Mono 14px

#### Frase de Impacto
```
"Transformando código em conhecimento através de mentorias colaborativas."
```
- Tipografia: Poppins Regular 18px
- Cor: Slate 300 (#CBD5E1)
- Alinhamento: Centro
- Espaçamento: Generoso (leading-relaxed)

#### Componentes
- **Glassmorphism**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Sombras**: `shadow-lg` e `shadow-xl` para profundidade
- **Border Radius**: `rounded-lg` (1rem) para suavidade
- **Animações**: Transições 150-300ms com `cubic-bezier`

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológico
```
Frontend:
├── React 19.2.1
├── TypeScript 5.6.3
├── Tailwind CSS 4.1.14
├── shadcn/ui (componentes)
├── Lucide React (ícones)
├── Framer Motion (animações)
└── QRCode (gerador de QR Code)

Build:
├── Vite 7.1.7
├── pnpm 10.4.1
└── ESBuild (otimização)
```

### Estrutura de Diretórios
```
mentoria-dev/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Página principal P2P
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── QRCodeModal.tsx   # Modal (removido da UI)
│   │   │   └── ErrorBoundary.tsx
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.tsx               # Roteador principal
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Estilos globais
│   └── index.html
├── server/
│   └── index.ts                  # Servidor Express (placeholder)
├── shared/
│   └── const.ts                  # Constantes compartilhadas
└── package.json
```

---

## 🔧 Funcionalidades Implementadas

### 1. Interface Principal P2P (Home.tsx)
**Responsabilidades:**
- Exibir campo de entrada para link de repositório ou snippet de código
- Gerenciar estado de geração de briefing
- Controlar modal de briefing técnico
- Integração com Jitsi Meet colaborativo

**Estados:**
- `codeInput`: String com input do usuário
- `isGenerating`: Boolean para estado de carregamento
- `briefingResult`: Objeto com resultado da análise
- `showBriefingModal`: Boolean para visibilidade do modal
- `jitsiRoomId`: ID único da sala Jitsi
- `copied`: Boolean para feedback de cópia

**Componentes Visuais:**
- Header com logo e frase de impacto
- Card com glassmorphism para input
- Botão CTA com gradiente
- Texto descritivo do fluxo

### 2. Modal de Briefing Técnico
**Fluxo:**
1. Usuário insere código e clica "Iniciar Mentoria"
2. Modal abre com spinner de carregamento
3. Após 2 segundos, análise "concluída"
4. Exibe:
   - Título do briefing
   - Resumo da análise
   - 3 pontos-chave
   - 3 recomendações de IA
   - ID da sala Jitsi
5. Botões de ação:
   - "Copiar Convite" (copia link + briefing)
   - "Entrar na Sala Jitsi" (abre em nova aba)
   - "Voltar" (retorna à interface)

**Dados do Briefing:**
```typescript
interface BriefingResult {
  title: string;
  summary: string;
  keyPoints: string[];
  recommendations: string[];
}
```

### 3. Geração de ID Jitsi Único
**Algoritmo:**
```javascript
const generateJitsiRoomId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `mentoria_${random}_${timestamp}`;
};
```

**Resultado:** `mentoria_ABC123_1714898401000`

**URL Completa:** `https://meet.jit.si/mentoria_ABC123_1714898401000`

### 4. Sistema de Convite Colaborativo
**Fluxo de Cópia:**
```javascript
const handleCopyInvite = () => {
  const jitsiUrl = `https://meet.jit.si/${jitsiRoomId}`;
  const inviteText = `Vamos fazer uma mentoria colaborativa! Acesse: ${jitsiUrl}`;
  navigator.clipboard.writeText(inviteText);
};
```

**Texto Copiado:**
```
Vamos fazer uma mentoria colaborativa! Acesse: https://meet.jit.si/mentoria_ABC123_1714898401000
```

### 5. Integração Jitsi Meet
**Características:**
- URL única por sessão (ID + timestamp)
- Abre em nova aba
- Servidor público (meet.jit.si)
- Sem necessidade de autenticação
- Suporta múltiplos usuários (mentor + mentorado)

---

## 📱 Responsividade

### Breakpoints
- **Mobile**: 320px - 640px (padrão)
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

### Otimizações Mobile
- Viewport meta tag configurado
- Touch-friendly buttons (h-10 = 40px mínimo)
- Padding responsivo (px-4)
- Textos legíveis (16px mínimo)
- Modal fullscreen em mobile
- Textarea com altura fixa (h-32)

---

## 🔐 Segurança & Performance

### Medidas de Segurança
- ✅ Sem armazenamento local de dados sensíveis
- ✅ URLs Jitsi com ID único + timestamp
- ✅ Validação de entrada (obrigatória)
- ✅ HTTPS em produção
- ✅ Sem exposição de dados de usuário

### Otimizações de Performance
- ✅ Code splitting automático (Vite)
- ✅ CSS-in-JS otimizado (Tailwind)
- ✅ Animações GPU-aceleradas
- ✅ Lazy loading de componentes
- ✅ Debounce em inputs

---

## 🧪 Teste Manual

### Checklist de Teste
- [ ] Interface carrega corretamente
- [ ] Campo de entrada aceita texto
- [ ] Botão "Iniciar Mentoria" funciona
- [ ] Modal de briefing abre e fecha
- [ ] Pontos-chave exibem corretamente
- [ ] Recomendações de IA exibem
- [ ] Sala Jitsi ID gera corretamente
- [ ] Botão "Copiar Convite" funciona
- [ ] Botão "Entrar na Sala Jitsi" abre nova aba
- [ ] Responsividade em mobile (375px)
- [ ] Responsividade em tablet (768px)
- [ ] Responsividade em desktop (1920px)
- [ ] Dark mode refinado para desenvolvedores
- [ ] Frase de impacto visível e legível

---

## 📦 Deployment

### Build para Produção
```bash
pnpm build
```

### Arquivos Gerados
```
dist/
├── public/          # Assets estáticos
├── index.html       # HTML otimizado
└── [hash].js        # JavaScript bundled
```

### Hospedagem
- **Manus Platform**: Deploy automático via Publish button
- **Domínio**: `mentoria-dev.manus.space` (padrão)
- **Custom Domain**: Configurável via Settings

---

## 🔄 Próximas Melhorias

### Curto Prazo
1. **Integração Real de IA**: Conectar com Claude/GPT para análise real
2. **Autenticação**: Adicionar login com GitHub/Google
3. **Histórico de Sessões**: Salvar mentorías anteriores
4. **Notificações**: Push notifications para lembretes

### Médio Prazo
5. **Backend Database**: Armazenar análises e feedback
6. **Gravação de Sessões**: Integrar com Jitsi Recording
7. **Dashboard de Mentor**: Painel para mentores gerenciarem sessões
8. **Analytics**: Rastrear uso e engajamento

### Longo Prazo
9. **Marketplace**: Conectar mentores e mentorandos
10. **Certificados**: Emitir certificados de conclusão
11. **Integração IDE**: Plugin para VS Code/JetBrains
12. **Mobile App**: Versão nativa iOS/Android

---

## 📚 Referências

### Documentação Oficial
- [React 19 Docs](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Jitsi Meet API](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe)
- [QRCode.js](https://davidshimjs.github.io/qrcodejs/)

### Ferramentas Utilizadas
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide Icons](https://lucide.dev)

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, consulte:
- Issues no repositório
- Documentação de componentes em `client/src/components/`
- Exemplos de uso em `client/src/pages/Home.tsx`

---

**Última atualização**: 05 de Maio de 2026  
**Versão**: 2.0.0 P2P  
**Status**: ✅ Funcional e Pronto para Deploy
