import { Suspense } from 'react';
import Quiz from './Quiz';

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Quiz />
    </Suspense>
  );
}
