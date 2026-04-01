"use client"

import Image from "next/image"
import { useState } from "react"
import Toast from "typescript-toastify"
import { survey } from "@/mocks/testMock"
import { ResultTier } from "@/app/types"
import SurveyCard from "@/components/SurveyCard"
import ResultCard from "@/components/ResultCard"
import DecorativeBlobs from "@/components/DecorativeBlobs"

const RESULT_TIERS: ResultTier[] = [
  {
    title: "Comenzando el Viaje",
    subtitle: "Tu coaching tiene potencial — es hora de estructurarlo",
    description:
      "Aún estás en la etapa de descubrimiento. Puede que tengas el corazón en el coaching pero te faltan las herramientas y la estructura para convertirlo en un negocio real. La buena noticia: con la guía correcta, puedes construir desde cero de forma ordenada y efectiva. Este es el mejor momento para establecer bases sólidas.",
    color: "bg-gradient-to-r from-[#E9CCDB] to-[#EEAE91]",
    emoji: "🌱",
  },
  {
    title: "En Construcción",
    subtitle: "Tienes bases — necesitas la estrategia para escalar",
    description:
      "Ya tienes idea de lo que haces y para quién, pero aún hay piezas sueltas. Tal vez generates algunos clientes, pero de forma inconsistente. Lo que te falta es un sistema claro: cómo comunicar, cómo vender, cómo cobrar con confianza. Con acompañamiento estratégico puedes dar el salto de \"trabajo esporádico\" a \"negocio predecible\".",
    color: "bg-gradient-to-r from-[#EEAE91] to-[#5D6D8F]",
    emoji: "🔨",
  },
  {
    title: "Lista para Despegar",
    subtitle: "Tienes claridad — es momento de acelerar",
    description:
      "Ya sabes a quién ayudas, cómo lo haces y cuánto cobras. Tu mensaje es claro y hablas con confianza de tu servicio. Ahora el reto es escalar: conseguir más clientes de forma consistente, optimizar tu sistema de ventas y llevar tu negocio al siguiente nivel. Estás lista para resultados más grandes.",
    color: "bg-gradient-to-r from-[#5D6D8F] to-[#E9CCDB]",
    emoji: "🚀",
  },
]

function getTier(score: number): ResultTier {
  if (score <= 21) return RESULT_TIERS[0]
  if (score <= 30) return RESULT_TIERS[1]
  return RESULT_TIERS[2]
}

// step: "quiz" → "form" → "result"
type Step = "quiz" | "form" | "result"

export default function Home() {
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: number }>({})
  const [step, setStep] = useState<Step>("quiz")
  const [score, setScore] = useState(0)
  const [tier, setTier] = useState<ResultTier>(RESULT_TIERS[0])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const answeredCount = Object.keys(selectedValues).length
  const totalQuestions = survey.length
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const handleAddPoints = (id: number, newValue: number) => {
    setSelectedValues((prev) => ({ ...prev, [id]: newValue }))
  }

  // Step 1: validate quiz answers and advance to form
  const handleQuizSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (answeredCount < totalQuestions) {
      new Toast({
        position: "bottom-right",
        toastMsg: `Faltan ${totalQuestions - answeredCount} pregunta(s) por responder`,
        autoCloseTime: 3000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: "light",
      })
      return
    }
    setStep("form")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Step 2: submit name/email and show result
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const totalScore = Object.values(selectedValues).reduce((acc, val) => acc + val, 0)
    setScore(totalScore)
    setTier(getTier(totalScore))
    setStep("result")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRetry = () => {
    setSelectedValues({})
    setStep("quiz")
    setScore(0)
    setName("")
    setEmail("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--background)" }}>
      <DecorativeBlobs />

      <main className="relative z-10 flex flex-col items-center px-4 py-10 lg:py-16 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-[#E9CCDB]/30">
            <Image
              src="/logo.png"
              alt="Gladys Garcia Coach"
              width={180}
              height={90}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col items-center gap-3 mt-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#5D6D8F] leading-tight">
              ¿Estás Lista para Vivir del Coaching?
            </h1>
            <p className="text-base lg:text-lg text-gray-500 font-medium max-w-lg">
              Descubre en qué etapa está tu negocio de coaching en solo 3 minutos.
            </p>
          </div>
        </div>

        {/* ── STEP: RESULT ── */}
        {step === "result" && (
          <div className="w-full flex flex-col items-center gap-6">
            <ResultCard score={score} tier={tier} onRetry={handleRetry} name={name} />
          </div>
        )}

        {/* ── STEP: FORM (name + email) ── */}
        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-6">
            <div className="bg-white/90 backdrop-blur-sm border border-[#E9CCDB]/50 rounded-2xl px-8 py-8 shadow-md flex flex-col gap-6">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#5D6D8F]">¡Ya casi está! 🎉</p>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Ingresa tus datos para ver tu diagnóstico personalizado.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-bold text-[#5D6D8F]">
                  Tu nombre
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Ej. María González"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#E9CCDB] rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5D6D8F]/40 focus:border-[#5D6D8F] transition-all bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-bold text-[#5D6D8F]">
                  Tu correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E9CCDB] rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5D6D8F]/40 focus:border-[#5D6D8F] transition-all bg-white"
                />
              </div>

              <p className="text-xs text-gray-400 text-center">
                🔒 Tu información es privada y nunca será compartida con terceros.
              </p>

              <button
                type="submit"
                className="w-full bg-[#5D6D8F] text-white font-extrabold text-lg py-4 rounded-xl hover:bg-[#4a5a7a] hover:scale-105 active:scale-100 transition-all duration-200 shadow-lg shadow-[#5D6D8F]/20"
              >
                Ver mi resultado →
              </button>

              <button
                type="button"
                onClick={() => setStep("quiz")}
                className="text-sm text-[#5D6D8F]/50 hover:text-[#5D6D8F] transition-colors text-center underline underline-offset-2"
              >
                ← Volver al test
              </button>
            </div>
          </form>
        )}

        {/* ── STEP: QUIZ ── */}
        {step === "quiz" && (
          <form onSubmit={handleQuizSubmit} className="w-full flex flex-col gap-5">
            {/* Intro card */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E9CCDB]/40 rounded-2xl px-6 py-6 shadow-sm text-center flex flex-col gap-3">
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Responde estas <strong className="text-[#5D6D8F]">13 preguntas</strong> con total honestidad —
                no hay respuestas correctas ni incorrectas. Al finalizar, obtendrás un diagnóstico de tu perfil como coach empresarial.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-xs bg-[#EEF2DC] text-[#5D6D8F] font-semibold px-3 py-1 rounded-full">⏱ ~3 minutos</span>
                <span className="text-xs bg-[#E9CCDB]/60 text-[#5D6D8F] font-semibold px-3 py-1 rounded-full">🎯 Resultado inmediato</span>
              </div>
            </div>

            {/* Progress bar */}
            {answeredCount > 0 && (
              <div className="flex flex-col gap-1.5 px-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{answeredCount} de {totalQuestions} respondidas</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#E9CCDB]/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #E9CCDB, #EEAE91)"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Questions */}
            {survey.map((q) => (
              <SurveyCard
                key={q.id}
                id={q.id}
                question={q.question}
                answers={q.answers}
                selectedValue={selectedValues[q.id] ?? null}
                onPointsChange={handleAddPoints}
              />
            ))}

            {/* Submit */}
            <div className="flex flex-col items-center gap-3 mt-4 mb-8">
              {answeredCount < totalQuestions && answeredCount > 0 && (
                <p className="text-sm text-[#EEAE91] font-medium">
                  Faltan {totalQuestions - answeredCount} pregunta(s) por responder
                </p>
              )}
              <button
                type="submit"
                className={`w-full max-w-sm py-4 rounded-xl font-extrabold text-lg transition-all duration-200 shadow-lg
                  ${answeredCount === totalQuestions
                    ? "bg-[#5D6D8F] text-white hover:bg-[#4a5a7a] hover:scale-105 hover:shadow-[#5D6D8F]/30 active:scale-100"
                    : "bg-[#5D6D8F]/30 text-[#5D6D8F]/60 cursor-not-allowed"
                  }`}
              >
                Continuar →
              </button>
            </div>
          </form>
        )}

        {/* Footer — suppressHydrationWarning fixes date mismatch between SSR and client */}
        <footer className="mt-8 text-center text-xs text-gray-400" suppressHydrationWarning>
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Gladys Garcia Coach · Todos los derechos reservados
          </p>
        </footer>
      </main>
    </div>
  )
}
