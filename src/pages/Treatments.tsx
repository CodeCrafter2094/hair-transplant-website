import InnerPage from '../components/InnerPage'

export default function Treatments() {
  return <InnerPage
    pageCode="METHODS"
    title="The method follows"
    accent="your clinical plan."
    intro="FUE, DHI and Sapphire FUE describe parts of the process. Donor supply, area to cover and hairline strategy should lead the recommendation."
    documentTitle="FUE, DHI & Sapphire FUE Antalya | Hair Transplant Techniques"
    items={[
      { label: 'Extraction', title: 'FUE', body: 'Follicular units are extracted individually from the donor area and prepared for placement in the recipient area.', points: ['No linear donor scar', 'Donor management remains essential', 'Placement strategy still determines the visual result'], image: '/assets/techniques/fue.jpg' },
      { label: 'Implantation', title: 'DHI', body: 'Prepared grafts are implanted using a pen-shaped device that supports control over placement, angle and direction.', points: ['Often discussed for focused placement', 'Not automatically better for every case', 'Team experience matters more than the label'], image: '/assets/techniques/dhi.jpg' },
      { label: 'Channel preparation', title: 'Sapphire FUE', body: 'A variation of FUE that uses sapphire blades during recipient-site preparation. Suitability depends on the wider surgical plan.', points: ['Part of the recipient-site stage', 'Density must respect blood supply', 'Individual assessment remains necessary'], image: '/assets/techniques/sapphire-fue.jpg' },
    ]}
    closingTitle="Do not choose a technique from a brochure."
    closingText="Start with your donor capacity, current loss pattern and long-term plan; then discuss which method supports those constraints."
  />
}
