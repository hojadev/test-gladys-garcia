import { Survey } from "@/app/types";

// Answers within every question are intentionally shuffled so the
// scoring order (1 / 2 / 3 pts) is not visually predictable to the user.

export const survey: Survey = [
  {
    id: 1,
    question: "¿Qué tan claro tienes a quién acompañas y qué problema específico resuelves con tu coaching?",
    answers: [
      { text: "Tengo una idea de mi cliente ideal, pero me cuesta expresarlo con claridad.", value: 2 },
      { text: "Sé exactamente a quién acompaño, qué problema tiene y qué resultado obtendrá conmigo.", value: 3 },
      { text: "Siento que si elijo un nicho estoy limitando a quién puedo acompañar.", value: 1 },
    ],
  },
  {
    id: 2,
    question: "¿Cuál es el resultado que le prometes a un cliente?",
    answers: [
      { text: "Prometo un resultado específico, tangible y medible en un plazo definido.", value: 3 },
      { text: "Promesas generales como \"sentirse mejor\" o \"tener más claridad\".", value: 1 },
      { text: "Ofrezco herramientas o sesiones, pero sin un resultado final claro.", value: 2 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo describes tu coaching cuando alguien te pregunta qué haces?",
    answers: [
      { text: "Me cuesta explicarlo sin usar palabras técnicas o confusas.", value: 1 },
      { text: "Lo explico con claridad, conecto y genero interés en seguir la conversación.", value: 3 },
      { text: "Puedo explicarlo, pero no logro generar interés.", value: 2 },
    ],
  },
  {
    id: 4,
    question: "¿Cuál es el problema específico que tu coaching resuelve?",
    answers: [
      { text: "Describo un área general, pero sin enfocarme en un problema concreto.", value: 2 },
      { text: "Resuelvo un problema específico, urgente y claramente identificable.", value: 3 },
      { text: "Acompaño a cualquier persona que quiera mejorar su vida.", value: 1 },
    ],
  },
  {
    id: 5,
    question: "¿Cómo vendes actualmente tu servicio?",
    answers: [
      { text: "Programa estructurado con etapas claras y un resultado definido.", value: 3 },
      { text: "Sesiones sin estructura clara; cada sesión depende del momento.", value: 1 },
      { text: "Paquetes de sesiones, pero sin un proceso definido.", value: 2 },
    ],
  },
  {
    id: 6,
    question: "¿Con qué frecuencia haces ofertas directas de tu coaching?",
    answers: [
      { text: "Casi nunca; espero a que la gente llegue sola.", value: 1 },
      { text: "Hago ofertas directas de forma intencional y constante.", value: 3 },
      { text: "A veces lo menciono, pero sin una invitación clara.", value: 2 },
    ],
  },
  {
    id: 7,
    question: "¿Qué tan constante eres en compartir contenido o hablar de tu coaching?",
    answers: [
      { text: "Publico a veces, pero sin estrategia ni consistencia.", value: 2 },
      { text: "No publico ni hablo mucho porque no sé bien qué decir.", value: 1 },
      { text: "Soy constante y mi comunicación está alineada con mi servicio.", value: 3 },
    ],
  },
  {
    id: 8,
    question: "¿Qué te detiene hoy mismo para lanzar una oferta clara?",
    answers: [
      { text: "Nada me detiene; ya estoy comunicando, pero quiero escalar.", value: 3 },
      { text: "Tengo algo listo, pero me da miedo que nadie compre.", value: 2 },
      { text: "Siento que necesito aprender más antes de ofrecer mi servicio.", value: 1 },
    ],
  },
  {
    id: 9,
    question: "Cuando alguien muestra interés en tu coaching, ¿qué haces?",
    answers: [
      { text: "Tengo una forma clara de guiar la conversación hacia una decisión.", value: 3 },
      { text: "Le doy información y espero que decida por su cuenta.", value: 1 },
      { text: "Intento explicarle, pero no tengo un proceso claro.", value: 2 },
    ],
  },
  {
    id: 10,
    question: "¿Qué pasa después de que explicas lo que haces?",
    answers: [
      { text: "Muestran interés, pero no sé cómo cerrar.", value: 2 },
      { text: "La conversación se queda en lo superficial.", value: 1 },
      { text: "Logro llevar la conversación hacia una invitación clara.", value: 3 },
    ],
  },
  {
    id: 11,
    question: "¿Cómo te sientes cuando piensas en vender tus servicios?",
    answers: [
      { text: "Me siento cómodo vendiendo, pero quiero hacerlo de forma más estratégica.", value: 3 },
      { text: "Sé que es necesario, pero me genera incomodidad o inseguridad.", value: 2 },
      { text: "Siento que vender no va con el coaching.", value: 1 },
    ],
  },
  {
    id: 12,
    question: "¿Cómo te sientes al hablar del precio de tu servicio?",
    answers: [
      { text: "Lo hago, pero con inseguridad.", value: 2 },
      { text: "Me incomoda y evito ese momento.", value: 1 },
      { text: "Lo comunico con seguridad y claridad.", value: 3 },
    ],
  },
  {
    id: 13,
    question: "¿Cuál describe mejor tu situación actual con los clientes?",
    answers: [
      { text: "He logrado clientes de pago y sé que mi método funciona, pero el proceso de venta es manual y agotador.", value: 3 },
      { text: "No he tenido clientes.", value: 1 },
      { text: "He tenido algunos, pero sin constancia.", value: 2 },
    ],
  },
  {
    id: 14,
    question: "Si hoy tuvieras que vivir solo de tu coaching, ¿qué pasaría?",
    answers: [
      { text: "Podría, pero necesito hacerlo más predecible.", value: 3 },
      { text: "Podría, pero con mucha inestabilidad.", value: 2 },
      { text: "No podría sostenerme económicamente.", value: 1 },
    ],
  },
  {
    id: 15,
    question: "¿Has invertido en mentoría o formación específica de negocios y ventas para coaches?",
    answers: [
      { text: "He hecho una inversión significativa. Entiendo que la mentoría de negocios es clave para vender y escalar mi servicio.", value: 3 },
      { text: "He comprado libros o cursos online de bajo costo, pero no he invertido en acompañamiento directo y estratégico.", value: 2 },
      { text: "No he invertido nada. Con el certificado de coaching y mi conocimiento es suficiente; lo demás lo descubriré sobre la marcha.", value: 1 },
    ],
  },
  {
    id: 16,
    question: "Si sigues igual los próximos tres meses, ¿qué crees que pasará?",
    answers: [
      { text: "Estoy lista para hacerlo realidad con la guía adecuada.", value: 3 },
      { text: "Seguiré sin resultados y con frustración.", value: 1 },
      { text: "Podría avanzar un poco, pero sé que necesito ayuda.", value: 2 },
    ],
  },
];
