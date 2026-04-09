"use client"

import Image from "next/image"
import React, { useState } from "react"
import Toast from "typescript-toastify"
import { survey } from "@/mocks/testMock"
import { ResultTier } from "@/app/types"
import SurveyCard from "@/components/SurveyCard"
import ResultCard from "@/components/ResultCard"
import DecorativeBlobs from "@/components/DecorativeBlobs"

// WhatsApp number (with country code, no +)
const WA_NUMBER = "5215543400295" // WhatsApp Mexico number provided by user

// Per-tier contextualised WhatsApp links
// The message body is pre-filled so Gladys knows which stage the lead is at
const WA_MESSAGES = {
  tier1: encodeURIComponent(
    "Hola Gladys, acabo de hacer tu test y estoy en la Etapa 1 (Gestación). Me gustaría agendar una sesión de diagnóstico para entender cómo empezar. ¿Cuándo tienes disponibilidad?"
  ),
  tier2: encodeURIComponent(
    "Hola Gladys, hice tu test y estoy en la Etapa 2 (Construcción). Quiero dejar de improvisar y tener clientes reales. ¿Podemos hablar sobre la Sesión de Diagnóstico?"
  ),
  tier3: encodeURIComponent(
    "Hola Gladys, hice tu test y estoy en la Etapa 3 (Despegue). Quiero auditar mi negocio y profesionalizar mi estructura. ¿Cuándo podemos agendar?"
  ),
}

const RESULT_TIERS: ResultTier[] = [
  {
    title: "El Coach Invisible",
    subtitle: "Con el título en la mano, pero sin voz en el mercado",
    description:
      "Tienes algo muy valioso: la vocación de ayudar. Pero hoy eso no se ha convertido en un negocio real. Te falta claridad entre tantas herramientas y crees que te falta \"un curso más\" para hacerlo realidad. La verdad es que no te faltan conocimientos de coaching — te falta identidad profesional.",
    risk: "Que pasen los meses y sigas exactamente igual: con el título, las ganas, pero sin clientes ni ingresos. Y poco a poco, empieces a dudar si esto realmente puede funcionar para ti.",
    nextStep:
      "No necesitas más información. Necesitas definir quién eres como coach, a quién ayudas y cómo lo comunicas con claridad. Agenda una sesión de diagnóstico si te cuesta explicar a qué te dedicas, tu contenido no conecta o las conversaciones no avanzan.",
    ctaLabel: "Agenda tu sesión de diagnóstico →",
    whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGES.tier1}`,
    color: "bg-gradient-to-r from-[#E9CCDB] to-[#EEAE91]",
    emoji: "🌱",
  },
  {
    title: "El Coach en el Limbo",
    subtitle: "Sabes mucho, pero no lo estás convirtiendo en clientes",
    description:
      "Estás en un punto frustrante: ya sabes que no eres para todo el mundo y tienes algo de estructura, pero tus ingresos son una montaña rusa. Te escondes detrás de \"preparar contenido\" o \"arreglar la web\" para evitar el momento de la venta porque, en el fondo, dudas de tu valor o de cómo sostener tu precio con seguridad.",
    risk:
      "El agotamiento. Trabajar mucho en lo que no genera dinero te hará tirar la toalla pronto. Seguir en cosas que no generan ingresos hasta que el cansancio te haga cuestionarte si vale la pena.",
    nextStep:
      "Necesitas seguridad, autenticidad y estructura. Un sistema que te permita comunicar tu valor, hacer ofertas claras y cerrar clientes sin forzarte. Saber de coaching y saber sostener un negocio son cosas distintas.",
    ctaLabel: "Quiero dejar de improvisar y tener clientes reales →",
    whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGES.tier2}`,
    color: "bg-gradient-to-r from-[#EEAE91] to-[#5D6D8F]",
    emoji: "🔨",
  },
  {
    title: "El Coach de Alto Potencial",
    subtitle: "Lista para la Rentabilidad Real",
    description:
      "¡Felicidades! Ya validaste tu servicio y tienes claridad. Sin embargo, sientes que tu negocio depende de la suerte, del \"boca a boca\" o de un esfuerzo heroico cada mes. Tienes clientes, pero no tienes un sistema predecible que los traiga y los sostenga de manera consciente.",
    risk:
      "El estancamiento. Si no profesionalizas tu estructura ahora, podrías quedarte en un esquema donde tus ingresos dependen siempre de cuánto trabajas.",
    nextStep:
      "Pasar de \"operar todo\" a dirigir un negocio propio. Necesitas estrategia pura y procesos accionables para que tu negocio sea sostenible y predecible sin depender de esfuerzo heroico.",
    ctaLabel: "Quiero auditar mi negocio hoy →",
    whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGES.tier3}`,
    color: "bg-gradient-to-r from-[#5D6D8F] to-[#E9CCDB]",
    emoji: "🚀",
  },
]

function getTier(score: number): ResultTier {
  if (score <= 26) return RESULT_TIERS[0]
  if (score <= 37) return RESULT_TIERS[1]
  return RESULT_TIERS[2]
}

// step: "quiz" → "form" → "result"
type Step = "quiz" | "form" | "result"

export default function Home() {
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: number }>({})
  const [step, setStep] = useState<Step>("quiz")
  const [tier, setTier] = useState<ResultTier>(RESULT_TIERS[0])
  const [score, setScore] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const honeypotRef = React.useRef<HTMLInputElement>(null)

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
    
    new Toast({
      position: "bottom-right",
      toastMsg: "¡Test completado exitosamente!",
      autoCloseTime: 2000,
      canClose: true,
      showProgress: true,
      pauseOnHover: true,
      type: "success",
      theme: "light",
    })

    setStep("form")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Step 2: submit name/email and show result
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Honeypot check - if filled, silently succeed without doing anything
    if (honeypotRef.current && honeypotRef.current.value) {
      console.warn("Bot detectado")
      return
    }

    const totalScore = Object.values(selectedValues).reduce((acc, val) => acc + val, 0)
    const resultTier = getTier(totalScore)
    
    // Format answers to send to Gladys
    const formattedAnswers = survey.map((q) => {
      const selectedValue = selectedValues[q.id]
      const answerText = q.answers.find((a) => a.value === selectedValue)?.text || "No respondida"
      return { question: q.question, answer: answerText, points: selectedValue }
    })

    setScore(totalScore)
    setTier(resultTier)
    setStep("result")
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Send email via API in background (don't await or block the UI)
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        score: totalScore,
        tierTitle: resultTier.title,
        tierSubtitle: resultTier.subtitle,
        tierDescription: resultTier.description,
        tierEmoji: resultTier.emoji,
        answers: formattedAnswers
      }),
    })
    .then((res) => {
      if (res.ok) {
        new Toast({
          position: "bottom-right",
          toastMsg: "Diagnóstico enviado a tu correo exitosamente",
          autoCloseTime: 4000,
          canClose: true,
          showProgress: true,
          type: "success",
          theme: "light",
        })
      } else {
        new Toast({
          position: "bottom-right",
          toastMsg: "Hubo un error enviando el correo",
          autoCloseTime: 4000,
          canClose: true,
          showProgress: true,
          type: "error",
          theme: "light",
        })
      }
    })
    .catch((err) => {
      console.error("Error al enviar email:", err)
    })
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
              ¿Por qué no tienes clientes si eres coach certificado?
            </h1>
            <p className="text-base lg:text-lg text-gray-500 font-medium max-w-lg">
              Descubre en qué etapa estás como coach y qué te está frenando para tener clientes constantes.
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

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-bold text-[#5D6D8F]">
                  Tu número de WhatsApp (Opcional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+52 1 55 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#E9CCDB] rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5D6D8F]/40 focus:border-[#5D6D8F] transition-all bg-white"
                />
              </div>

              {/* Honeypot field (hidden from real users, bots will fill it) */}
              <input
                ref={honeypotRef}
                type="text"
                name="website_url"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

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
                Responde estas <strong className="text-[#5D6D8F]">16 preguntas</strong> con total honestidad —
                no hay respuestas correctas ni incorrectas. Al finalizar, obtendrás un diagnóstico de tu etapa como coach.
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
