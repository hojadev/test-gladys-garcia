import { Survey } from "@/app/types";

// Note: answers within each question are intentionally shuffled
// so scoring order (1/2/3) is not visually predictable to the user.

export const survey: Survey = [
  {
    id: 1,
    question: "¿Cómo describes tu coaching cuando alguien te pregunta qué haces?",
    answers: [
      { text: "Puedo explicarlo, pero no logro que la gente se interese o me pregunte más.", value: 2 },
      { text: "Tengo un servicio estructurado con un método claro y lo comunico con confianza.", value: 3 },
      { text: "Me cuesta explicarlo sin usar palabras técnicas o confusas.", value: 1 },
    ],
  },
  {
    id: 2,
    question: "¿Cuál es el problema específico que tu coaching resuelve?",
    answers: [
      { text: "Ayudo a un perfil muy concreto a resolver un dolor medible y urgente (ej. CEOs, madres primerizas).", value: 3 },
      { text: "Ayudo a \"cualquier persona\" que quiera mejorar su vida; el coaching es universal y no quiero limitarme.", value: 1 },
      { text: "Describo un área general pero me cuesta enfocarme en un solo tipo de cliente o problema (ej. liderazgo, bienestar).", value: 2 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo vendes actualmente tu servicio?",
    answers: [
      { text: "\"Programa de Transformación\": Tengo un servicio con nombre, etapas claras y un objetivo medible que comunico como un proceso cerrado y profesional.", value: 3 },
      { text: "Un bono de horas de coaching: Vendo un paquete de sesiones con descuento, pero si me preguntan qué pasará en la sesión 3 o 4, no sé decírselo con exactitud.", value: 2 },
      { text: "\"Acompañamiento a la carta\": No tengo un orden fijo; en cada sesión el cliente trae un tema nuevo y yo fluyo con lo que pase ahí, sin un objetivo de transformación final claro.", value: 1 },
    ],
  },
  {
    id: 4,
    question: "Si sigues igual los próximos tres meses, ¿qué crees que pasará con tu sueño de vivir del coaching?",
    answers: [
      { text: "Seguiré gastando energía sin ver ingresos, sintiendo la frustración de tener el título de coach guardado en un cajón.", value: 1 },
      { text: "Estoy lista para hacer que suceda, solo necesito una guía estratégica.", value: 3 },
      { text: "Podría avanzar, pero sé que necesito ayuda para lograrlo.", value: 2 },
    ],
  },
  {
    id: 5,
    question: "¿Cuál describe mejor tu situación actual con los clientes?",
    answers: [
      { text: "He tenido algunos, pero de forma esporádica o por recomendación.", value: 2 },
      { text: "No he tenido clientes aún.", value: 1 },
      { text: "Tengo clientes constantes o estoy cerrando procesos de forma regular.", value: 3 },
    ],
  },
  {
    id: 6,
    question: "¿Qué pasa después de que explicas lo que haces?",
    answers: [
      { text: "La conversación se queda en lo superficial. No pasa nada más.", value: 1 },
      { text: "Logro llevar la conversación hacia una invitación clara a trabajar conmigo.", value: 3 },
      { text: "Muestran interés, pero no sé cómo llevarlos a una venta.", value: 2 },
    ],
  },
  {
    id: 7,
    question: "¿Cómo te sientes al momento de hablar del precio de tu servicio?",
    answers: [
      { text: "Lo hago, pero con inseguridad o sin claridad en mi valor.", value: 2 },
      { text: "Puedo hablar de mi servicio y de su valor con seguridad y sin miedo.", value: 3 },
      { text: "Me incomoda, siento que vender no va con el coaching.", value: 1 },
    ],
  },
  {
    id: 8,
    question: "¿Qué tan constante eres en compartir contenido o hablar de tu coaching en redes o con tu entorno?",
    answers: [
      { text: "Soy constante y mi comunicación está alineada con mi servicio.", value: 3 },
      { text: "No hablo mucho ni publico porque todavía no sé bien qué decir.", value: 1 },
      { text: "A veces comparto cosas, pero no tengo una estrategia ni consistencia.", value: 2 },
    ],
  },
  {
    id: 9,
    question: "Cuando alguien muestra interés en tu coaching, ¿qué haces?",
    answers: [
      { text: "Intento explicarle, pero no tengo un proceso claro para cerrar.", value: 2 },
      { text: "Le doy información general y espero a que decida.", value: 1 },
      { text: "Tengo una forma clara de llevar la conversación hacia una decisión.", value: 3 },
    ],
  },
  {
    id: 10,
    question: "¿Qué tan claro tienes a quién ayudas y qué problema específico resuelves con tu coaching?",
    answers: [
      { text: "Sé exactamente a quién ayudo, qué problema tiene y qué resultado obtendrá conmigo.", value: 3 },
      { text: "Tengo una idea de mi cliente ideal, pero me cuesta expresarlo con claridad.", value: 2 },
      { text: "Siento que si decido tener un nicho, estoy perdiendo dinero o dejando fuera a gente que puedo ayudar.", value: 1 },
    ],
  },
  {
    id: 11,
    question: "¿Has invertido en mentoría o formación específica de negocios y ventas para coaches?",
    answers: [
      { text: "He comprado libros o cursos online de bajo costo, pero no he invertido en acompañamiento directo y estratégico.", value: 2 },
      { text: "No he invertido nada. Con el certificado de coaching y mi conocimiento es suficiente; lo demás lo descubriré sobre la marcha.", value: 1 },
      { text: "Una inversión significativa. Entiendo que la mentoría de negocios es la clave para vender y escalar mi servicio.", value: 3 },
    ],
  },
  {
    id: 12,
    question: "¿Cuál es el resultado que le prometes a un cliente?",
    answers: [
      { text: "\"Herramientas\" o \"conciencia\", esperando que el cliente logre su resultado con eso, pero sin prometer un cambio final.", value: 2 },
      { text: "Un cambio tangible y medible en un plazo definido (ej. \"Tener 3 clientes nuevos en 60 días\", \"Superar el miedo a hablar en público\").", value: 3 },
      { text: "Algo como \"mejorar su autoestima\" o \"encontrar el equilibrio y la felicidad\".", value: 1 },
    ],
  },
  {
    id: 13,
    question: "¿Con qué frecuencia haces ofertas directas de tu coaching?",
    answers: [
      { text: "Hago ofertas directas de forma intencional y constante.", value: 3 },
      { text: "Casi nunca. Espero a que la gente me pregunte o llegue sola.", value: 1 },
      { text: "A veces lo menciono, pero me cuesta hacer una invitación clara.", value: 2 },
    ],
  },
];
