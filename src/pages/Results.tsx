import InnerPage from '../components/InnerPage'

export default function Results() {
  return <InnerPage
    pageCode="RESULTS"
    title="Evidence should clarify,"
    accent="not simply impress."
    intro="A useful result is documented, comparable and relevant to your own donor profile. Here is what to look for before you treat a photograph as proof."
    documentTitle="Hair Transplant Results | Turkey Hair Transplant Antalya"
    items={[
      { label: 'Comparison standard', title: 'Look for the same conditions', body: 'Lighting, distance, angle and hair styling can change how density appears. The most useful case records keep those variables as consistent as possible.', points: ['Same viewpoint and camera distance', 'Comparable lighting and hair length', 'No fibres or cosmetic concealers'] },
      { label: 'Time context', title: 'Ask when the result was photographed', body: 'A transplant develops over time. The follow-up month should be visible so you know whether you are seeing an early stage or a more mature outcome.', points: ['Visible follow-up period', 'Clear description of any second procedure', 'No implied guarantee from a single case'] },
      { label: 'Personal relevance', title: 'Compare cases that resemble yours', body: 'A dramatic result from a different hair-loss pattern or donor supply may tell you very little about your own options.', points: ['Similar loss pattern and area', 'Comparable donor characteristics', 'Realistic coverage goal'] },
    ]}
    closingTitle="Ask for evidence matched to your case."
    closingText="Share your current photos privately and request examples with a similar pattern, donor profile and treatment objective."
  />
}
