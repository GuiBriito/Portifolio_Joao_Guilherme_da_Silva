import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Code2, Copy, CheckCircle2, ExternalLink } from 'lucide-react';

/**
 * Design Philosophy: Gradient Moderno com Vibrância Controlada
 * Modelo: Plataforma P2P de Mentorias entre Humanos
 * IA: Gera Briefing Técnico nos bastidores para ambos os participantes
 * Jitsi: Sala colaborativa real para múltiplos usuários
 */

interface BriefingResult {
  title: string;
  summary: string;
  keyPoints: string[];
  recommendations: string[];
}

export default function Home() {
  const [codeInput, setCodeInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefingResult, setBriefingResult] = useState<BriefingResult | null>(null);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [jitsiRoomId, setJitsiRoomId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Simular geração de Briefing Técnico por IA
  const generateTechnicalBriefing = (code: string): BriefingResult => {
    return {
      title: 'Briefing Técnico da Mentoria',
      summary: `Análise do código fornecido: ${code.substring(0, 40)}...`,
      keyPoints: [
        'Estrutura de dados otimizada para escalabilidade',
        'Padrões de design aplicáveis ao projeto',
        'Oportunidades de refatoração e manutenibilidade'
      ],
      recommendations: [
        '🔄 Refatore loops aninhados: Use map/filter em vez de for loops para melhor legibilidade',
        '⚡ Otimize chamadas de API: Implemente debounce e cache para reduzir requisições',
        '🛡️ Adicione validação de entrada: Sempre valide dados antes de processar'
      ]
    };
  };

  // Gerar ID único para sala Jitsi
  const generateJitsiRoomId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `mentoria_${random}_${timestamp}`;
  };

  const handleStartMentorship = async () => {
    if (!codeInput.trim()) {
      alert('Por favor, insira um link de repositório ou snippet de código');
      return;
    }

    // Iniciar geração de briefing
    setIsGenerating(true);
    setShowBriefingModal(true);

    // Simular processamento (2 segundos)
    setTimeout(() => {
      const briefing = generateTechnicalBriefing(codeInput);
      setBriefingResult(briefing);
      
      // Gerar ID da sala Jitsi
      const roomId = generateJitsiRoomId();
      setJitsiRoomId(roomId);
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyInvite = () => {
    if (jitsiRoomId) {
      const jitsiUrl = `https://meet.jit.si/${jitsiRoomId}`;
      const inviteText = `Vamos fazer uma mentoria colaborativa! Acesse: ${jitsiUrl}`;
      navigator.clipboard.writeText(inviteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenJitsi = () => {
    if (jitsiRoomId) {
      const jitsiUrl = `https://meet.jit.si/${jitsiRoomId}`;
      window.open(jitsiUrl, '_blank');
    }
  };

  const handleCloseModal = () => {
    setShowBriefingModal(false);
    setBriefingResult(null);
    setJitsiRoomId(null);
    setCodeInput('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Container Principal */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 mb-6 shadow-lg">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            Mentoria Dev
          </h1>
          
          {/* Frase de Impacto */}
          <p className="text-lg text-slate-300 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Transformando código em conhecimento através de mentorias colaborativas.
          </p>
        </div>

        {/* Card Principal com Glassmorphism */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 mb-6 hover:bg-white/15 transition-all duration-300">
          {/* Input Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-200 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Link do Repositório ou Snippet de Código
            </label>
            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Cole aqui seu link GitHub ou snippet de código para análise..."
              className="w-full h-32 px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 resize-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleStartMentorship}
            disabled={isGenerating}
            className="w-full h-12 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-75"
            style={{
              background: 'linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando Briefing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Code2 className="w-5 h-5" />
                Iniciar Mentoria
              </span>
            )}
          </Button>
        </Card>

        {/* Texto Descritivo */}
        <div className="text-center text-sm text-slate-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <p>Compartilhe seu código, receba um briefing técnico e convide seu mentor para uma sessão colaborativa.</p>
        </div>
      </div>

      {/* Modal de Briefing Técnico */}
      {showBriefingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="backdrop-blur-xl bg-slate-900/95 border border-white/20 shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            {isGenerating ? (
              // Estado de Carregamento
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30" />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"
                    style={{ animation: 'spin 2s linear infinite' }}
                  />
                </div>
                <p className="text-slate-300 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Analisando código e gerando briefing técnico...
                </p>
              </div>
            ) : briefingResult && jitsiRoomId ? (
              // Resultado do Briefing
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {briefingResult.title}
                  </h2>
                  <p className="text-sm text-slate-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {briefingResult.summary}
                  </p>
                </div>

                {/* Pontos-Chave */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-cyan-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Pontos-Chave
                  </h3>
                  {briefingResult.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recomendações */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-pink-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Recomendações de IA
                  </h3>
                  {briefingResult.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-pink-500/20"
                    >
                      <span className="text-xs text-slate-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {rec}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sala Jitsi */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <p className="text-xs text-slate-400 uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Sala de Conferência
                  </p>
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded p-2 truncate">
                    <span className="text-xs text-slate-300 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      meet.jit.si/{jitsiRoomId}
                    </span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    onClick={handleCopyInvite}
                    className="w-full h-10 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Convite Copiado!' : 'Copiar Convite'}
                  </Button>
                  
                  <Button
                    onClick={handleOpenJitsi}
                    className="w-full h-10 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Entrar na Sala Jitsi
                  </Button>

                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    className="w-full h-10 rounded-lg font-semibold border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Voltar
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      )}

      {/* CSS para animações */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
