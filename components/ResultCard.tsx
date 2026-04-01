import { ResultTier } from "@/app/types"

type ResultCardProps = {
  score: number
  tier: ResultTier
  onRetry: () => void
  name: string
}

export default function ResultCard({ score, tier, onRetry, name }: ResultCardProps) {
  const maxScore = 39
  const minScore = 13
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
          <span>Avanzada</span>
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
        <p className="text-gray-700 text-base leading-relaxed text-center">{tier.description}</p>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 w-full">
        <p className="text-sm text-gray-500 text-center max-w-sm">
          ¿Lista para transformar tu coaching en un negocio rentable y estructurado?
        </p>
        <a
          href="https://www.instagram.com/gladysgarciacoach"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#5D6D8F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#4a5a7a] hover:scale-105 active:scale-100 transition-all duration-200 shadow-lg shadow-[#5D6D8F]/30 text-center"
        >
          Quiero trabajar con Gladys →
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
