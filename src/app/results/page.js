// src/app/results/page.js
import { Suspense } from 'react';
import Results from './Results';

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
}
