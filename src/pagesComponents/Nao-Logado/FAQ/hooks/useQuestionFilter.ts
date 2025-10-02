import { useState } from 'react'

import { CategoryType, QuestionsType } from '../constants/faqData'

export const useQuestionFilter = (questions: QuestionsType) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryType>('todas')

  const filteredQuestions = searchTerm
    ? Object.values(questions)
        .flat()
        .filter(
          (q) =>
            q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.body.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    : activeCategory === 'todas'
      ? Object.values(questions).flat()
      : questions[activeCategory]

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredQuestions,
  }
}
