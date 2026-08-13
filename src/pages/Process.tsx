import InnerPage from '../components/InnerPage'

export default function Process() {
  return <InnerPage
    pageCode="JOURNEY"
    title="From first photos"
    accent="to informed travel."
    intro="A transparent journey gives you decision points before flights, before the hairline is drawn and before the procedure begins."
    documentTitle="Hair Transplant Journey Antalya | Step-by-Step Planning"
    items={[
      { label: 'Remote assessment', title: 'Share clear photos and history', body: 'Begin with front, top, crown and donor-area photographs plus your age, previous procedures and the result you hope to achieve.', points: ['Natural daylight and dry hair', 'Relevant medical and medication history', 'No pressure to book before review'] },
      { label: 'Written planning', title: 'Review the proposed approach', body: 'The early plan should explain suitability, the method being considered and what still needs in-person confirmation.', points: ['Proposed responsibilities and method', 'Written inclusions and exclusions', 'Space for the plan to change after examination'] },
      { label: 'Travel decision', title: 'Confirm details before booking', body: 'Only arrange travel after dates, arrival instructions and the expected clinical timeline are clear.', points: ['Procedure and recovery timing', 'Transport and accommodation responsibilities', 'Aftercare contact route for the UK'] },
      { label: 'In-person confirmation', title: 'Examine, design and consent', body: 'The clinical team should verify the donor area, recipient plan and hairline with you before proceeding.', points: ['Final examination before treatment', 'Opportunity to ask questions', 'Clear consent and aftercare instructions'] },
    ]}
    closingTitle="A good journey leaves fewer surprises."
    closingText="Use the private WhatsApp line to clarify your assessment, travel sequence and the questions that should be answered in writing."
  />
}
