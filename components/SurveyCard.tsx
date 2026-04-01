"use client"

import { SurveyCardProps } from "@/app/types"

export default function SurveyCard({ question, id, onPointsChange, selectedValue, answers }: SurveyCardProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm shadow-md border border-[#E9CCDB]/40 rounded-2xl px-6 lg:px-10 py-7">
      <h2 className="text-[#5D6D8F] text-lg lg:text-xl mb-6 font-bold leading-snug">
        <span className="inline-block bg-[#EEAE91]/20 text-[#EEAE91] text-sm font-bold px-2 py-0.5 rounded-full mr-2">
          {id}
        </span>
        {question}
      </h2>
      <div className="flex flex-col gap-3">
        {answers.map((a) => {
          const isSelected = selectedValue === a.value
          return (
            <label
              key={a.text}
              className={`flex items-start gap-3 cursor-pointer rounded-xl px-4 py-3 border transition-all duration-200 group
                ${isSelected
                  ? "bg-[#5D6D8F]/10 border-[#5D6D8F] shadow-sm"
                  : "bg-white border-[#E9CCDB]/60 hover:border-[#5D6D8F]/40 hover:bg-[#EEF2DC]/40"
                }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200
                ${isSelected
                  ? "border-[#5D6D8F] bg-[#5D6D8F]"
                  : "border-[#E9CCDB] group-hover:border-[#5D6D8F]/50"
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <input
                type="radio"
                name={`question-${id}`}
                className="sr-only"
                value={a.value}
                checked={isSelected}
                onChange={() => onPointsChange(id, a.value)}
              />
              <span className={`text-sm lg:text-base leading-relaxed transition-colors duration-200
                ${isSelected ? "text-[#5D6D8F] font-medium" : "text-gray-600"}`}>
                {a.text}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
