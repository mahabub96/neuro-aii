import React from 'react';
import './ResearchReference.css';

const modelNotes = {
  brain: {
    text: '🔬 Research-Backed Model — This model is developed based on our peer-reviewed research published in IEEE Xplore at the 5th International Conference on Electrical, Computer & Telecommunication Engineering (ICECTE), 2026. The multiple backbone feature fusion ensemble CNN architecture and evaluation methodology have been validated through rigorous academic review.',
    linkLabel: '📄 Read the full paper on IEEE Xplore →',
    link: 'https://doi.org/10.1109/ICECTE69292.2026.11429333',
  },
  pneumonia: {
    text: '🔬 Research-Backed Model — This model is based on our ongoing research currently under peer review for publication. The model architecture and methodology have been developed following rigorous academic standards. Publication details will be updated upon acceptance.',
  },
  drowsiness: {
    text: '🔬 Research-Backed Model — This model is based on our ongoing research currently under peer review for publication. The model architecture and methodology have been developed following rigorous academic standards. Publication details will be updated upon acceptance.',
  },
};

const ResearchReference = ({ model }) => {
  const activeNote = modelNotes[model] || modelNotes.pneumonia;

  return (
    <section className="research-reference" aria-label="Research references">
      <div className="research-reference__note">
        <p>{activeNote.text}</p>
        {activeNote.link && (
          <p className="research-reference__note-link-row">
            <a href={activeNote.link} target="_blank" rel="noreferrer">
              {activeNote.linkLabel}
            </a>
          </p>
        )}
      </div>

      <details className="research-reference__publications">
        <summary>📑 View Associated Research Publications</summary>

        <div className="research-reference__papers">
          <article className="research-reference__paper">
            <h4>Paper 1 — Brain Tumour Detection [✅ Published]</h4>
            <p>
              <strong>Title:</strong> A Multiple Backbone Feature Fusion Ensemble CNN for Brain Tumor
              Detection and Classification from MRI Images
            </p>
            <p><strong>Authors:</strong> Mahabub Alam, Shadman Yaser, Abdur Rahman</p>
            <p>
              <strong>Published In:</strong> 2026 5th International Conference on Electrical, Computer &
              Telecommunication Engineering (ICECTE)
            </p>
            <p><strong>Publisher:</strong> IEEE</p>
            <p><strong>Pages:</strong> 1-6</p>
            <p>
              <strong>DOI:</strong>{' '}
              <a
                href="https://doi.org/10.1109/ICECTE69292.2026.11429333"
                target="_blank"
                rel="noreferrer"
              >
                10.1109/ICECTE69292.2026.11429333
              </a>
            </p>
          </article>

          <article className="research-reference__paper">
            <h4>Paper 2 — Pneumonia Detection [🔄 Under Review]</h4>
            <p><strong>Title:</strong> To be announced upon acceptance</p>
            <p><strong>Authors:</strong> Mahabub Alam and team</p>
            <p><strong>Status:</strong> Currently under peer review</p>
            <p>Details will be updated upon acceptance</p>
          </article>

          <article className="research-reference__paper">
            <h4>Paper 3 — Drowsiness Detection [🔄 Under Review]</h4>
            <p><strong>Title:</strong> To be announced upon acceptance</p>
            <p><strong>Authors:</strong> Mahabub Alam and team</p>
            <p><strong>Status:</strong> Currently under peer review</p>
            <p>Details will be updated upon acceptance</p>
          </article>
        </div>
      </details>
    </section>
  );
};

export default ResearchReference;
