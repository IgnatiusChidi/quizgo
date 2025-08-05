'use client'
import { useRouter, useSearchParams } from "next/navigation";

export default function Results() {

    const router = useRouter()
    const searchParams = useSearchParams();

    const numberOfQuestions = searchParams.get('no')
    const category = searchParams.get('category')
    const difficulty = searchParams.get('level')
    const score = searchParams.get('score')

    return (
      <div id="results-page">
        <div id="results">
          <h1>You Scored<span className="green">:</span></h1>
          <h1>{score}<span className="green"> / </span>{numberOfQuestions}</h1>
          <h1>on</h1>
          <h1><span className="green">{category}</span></h1>
          <h1>Difficulty:<span className="green"> {difficulty}</span></h1>
        </div>
      </div>
    );
  }