export interface DictionaryRow {
  word?: string
  partOfSpeech?: string
  pronunciations?: string
  glosses?: string
  examples?: string
  notes?: string
  alternateForms?: string
  etymology?: string
}

export interface DictionaryEntry {
  partOfSpeech: string
  pronunciations: string[]
  glosses: string[]
  examples: string[]
  notes: string[]
  alternateForms: string[]
  etymology: string | null,
}

export type Word = DictionaryEntry[]

export interface WordCollection {
  [word: string]: Word
}
