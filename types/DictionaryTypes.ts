export interface SheetRow {
  word?: string
  partOfSpeech?: string
  pronunciations?: string
  glosses?: string
  examples?: string
  notes?: string
  alternateForms?: string
}

export interface DictionaryEntry {
  word: string
  partOfSpeech: string
  pronunciations: string[]
  glosses: string[]
  examples: string[]
  notes: string[]
  alternateForms: string[]
}
