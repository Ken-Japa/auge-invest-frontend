import { type FC, useState } from 'react'

import type { QuestionType } from '../../constants/faqData'

import { QuestionListSkeleton } from './QuestionListSkeleton'
import { NoResultsContainer, QuestionContainer, StyledExpandIcon } from './styled'

interface QuestionListProps {
  questions: QuestionType[]
  isLoading?: boolean
}

export const QuestionList: FC<QuestionListProps> = ({ questions, isLoading }) => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null)

  if (isLoading) {
    return <QuestionListSkeleton />
  }

  if (questions.length === 0) {
    return (
      <NoResultsContainer>
        <p>Nenhuma pergunta encontrada com os critérios de busca.</p>
        <p>Tente outros termos ou categorias.</p>
      </NoResultsContainer>
    )
  }

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id)
  }

  return (
    <div>
      {questions.map((question, index) => {
        const questionId = (question as any).id || `question-${index}`

        return (
          <QuestionContainer key={questionId}>
            <button
              className="question-header"
              onClick={() => toggleQuestion(questionId)}
              aria-expanded={openQuestionId === questionId}
            >
              <h3 className="question-title">{question.title}</h3>
              <StyledExpandIcon isOpen={openQuestionId === questionId} />
            </button>
            <div className={`question-answer ${openQuestionId === questionId ? 'open' : 'closed'}`}>
              <div className="answer-content" dangerouslySetInnerHTML={{ __html: question.body }} />
            </div>
          </QuestionContainer>
        )
      })}
    </div>
  )
}
