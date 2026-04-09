import { ResultTier } from "@/app/types"

type ResultCardProps = {
  score: number
  tier: ResultTier
  onRetry: () => void
  name: string
}

export default function ResultCard({ score, tier, onRetry, name }: ResultCardProps) {
  const maxScore = 48
  const minScore = 16
  const percentage = Math.round(((score - minScore) / (maxScore - minScore)) * 100)
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#E9CCDB]/50 overflow-hidden px-8 lg:px-12 py-10 flex flex-col items-center gap-8">
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${tier.color}`} />

      <div className="text-center flex flex-col items-center gap-3">
        <span className="text-6xl">{tier.emoji}</span>
        <p className="text-sm uppercase tracking-widest text-[#EEAE91] font-bold">Tu resultado</p>
        {name && (
          <p className="text-base text-gray-500 font-medium">
            Hola, <span className="font-bold text-[#5D6D8F]">{name}</span> 👋
          </p>
        )}
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#5D6D8F] leading-tight">{tier.title}</h2>
        <p className="text-lg text-[#5D6D8F]/70 font-medium italic">{tier.subtitle}</p>
      </div>

      {/* Score bar */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex justify-between w-full text-xs text-gray-400 font-medium px-1">
          <span>Inicio</span>
          <span className="text-[#5D6D8F] font-bold text-sm">{score} / {maxScore} puntos</span>
          <span>Avanzado</span>
        </div>
        <div className="w-full h-3 bg-[#EEF2DC] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, #E9CCDB, #EEAE91, #5D6D8F)"
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#EEF2DC]/60 rounded-2xl px-6 py-5 w-full">
        <p className="text-gray-700 text-base leading-relaxed text-center whitespace-pre-line">{tier.description}</p>
      </div>

      {/* Risk */}
      {tier.risk && (
        <div className="bg-[#EEAE91]/20 border border-[#EEAE91]/40 rounded-2xl px-6 py-4 w-full">
          <p className="text-sm font-bold text-[#EEAE91] mb-1">⚠️ Tu mayor riesgo</p>
          <p className="text-gray-700 text-sm leading-relaxed">{tier.risk}</p>
        </div>
      )}

      {/* Next step */}
      {tier.nextStep && (
        <div className="w-full text-center">
          <p className="text-sm font-bold text-[#5D6D8F] mb-1">Tu siguiente paso</p>
          <p className="text-gray-600 text-sm leading-relaxed">{tier.nextStep}</p>
        </div>
      )}

      {/* CTA → WhatsApp */}
      <div className="flex flex-col items-center gap-3 w-full">
        <a
          href={tier.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1ebe59] hover:scale-105 active:scale-100 transition-all duration-200 shadow-lg shadow-[#25D366]/30 text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 shrink-0">
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.736 5.476 2.02 7.784L0 32l8.444-2.008A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.23 22.382c-.34.957-1.98 1.828-2.73 1.946-.695.11-1.573.156-2.536-.16a22.993 22.993 0 0 1-2.295-.847c-4.04-1.743-6.678-5.802-6.878-6.07-.2-.268-1.632-2.17-1.632-4.14s1.034-2.94 1.4-3.34c.366-.4.8-.5 1.066-.5.267 0 .534.002.768.014.246.013.577-.093.903.69.34.814 1.155 2.814 1.257 3.017.1.2.167.44.034.71-.133.27-.2.44-.4.676-.2.234-.42.523-.6.703-.2.2-.408.415-.176.815.233.4 1.036 1.705 2.222 2.76 1.526 1.36 2.812 1.782 3.214 1.982.4.2.633.168.867-.1.234-.268 1.003-1.166 1.27-1.566.266-.4.533-.334.9-.2.367.133 2.334 1.1 2.734 1.3.4.2.667.3.767.467.1.167.1.966-.24 1.923z"/>
          </svg>
          {tier.ctaLabel}
        </a>
        <button
          onClick={onRetry}
          className="text-sm text-[#5D6D8F]/60 hover:text-[#5D6D8F] transition-colors underline underline-offset-2"
        >
          Volver a hacer el test
        </button>
      </div>
    </div>
  )
}
