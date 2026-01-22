
export enum LessonId {
  BASICS = 'basics',
  OHMS_LAW = 'ohms-law',
  COMPONENTS = 'components',
  CIRCUITS = 'circuits',
  ARDUINO = 'arduino',
  SIMULATOR = 'simulator'
}

export interface Lesson {
  id: LessonId;
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ComponentState {
  voltage: number;
  resistance: number;
  current: number;
}
