export interface DictionaryRow {
  word?: string
  partOfSpeech?: string
  pronunciations?: string
  glosses?: string
  examples?: string
  notes?: string
  alternateForms?: string
}

export interface DictionaryEntry {
  partOfSpeech: string
  pronunciations: string[]
  glosses: string[]
  examples: string[]
  notes: string[]
  alternateForms: string[]
}

export type Word = DictionaryEntry[]

export interface WordCollection {
  [word: string]: Word
}
