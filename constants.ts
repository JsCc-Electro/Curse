
import { Lesson, LessonId } from './types';

export const LESSONS: Lesson[] = [
  {
    id: LessonId.BASICS,
    title: "Fundamentos de Electricidad",
    description: "¿Qué es la electricidad? Voltaje, Corriente y Resistencia.",
    icon: "fa-bolt"
  },
  {
    id: LessonId.OHMS_LAW,
    title: "La Ley de Ohm",
    description: "La relación matemática más importante en la electrónica.",
    icon: "fa-calculator"
  },
  {
    id: LessonId.COMPONENTS,
    title: "Componentes Básicos",
    description: "Resistencias, LEDs, Capacitores y más.",
    icon: "fa-microchip"
  },
  {
    id: LessonId.CIRCUITS,
    title: "Serie vs Paralelo",
    description: "Cómo conectar componentes de diferentes formas.",
    icon: "fa-project-diagram"
  },
  {
    id: LessonId.ARDUINO,
    title: "Introducción a Arduino",
    description: "Primeros pasos con microcontroladores y programación.",
    icon: "fa-infinity"
  },
  {
    id: LessonId.SIMULATOR,
    title: "Laboratorio Virtual",
    description: "Experimenta con un circuito real en tiempo real.",
    icon: "fa-flask"
  }
];
