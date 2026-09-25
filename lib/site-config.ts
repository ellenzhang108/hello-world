export const siteConfig={
  brand:'Beek & The Cat',
  coupleLine:'A wedding. A honeymoon send-off. A kitten shower. Obviously.',
  timezone:'America/New_York',
  events:[
    {id:'wedding',title:'The Ridiculous Wedding',date:'2027-06-12',time:'4:00 PM',location:'SAMPLE — The Very Fancy Garden, Washington, DC',dressCode:'Garden party, but make it suspiciously glamorous',description:'We get married. The cat remains unconvinced.'},
    {id:'sendoff',title:'Honeymoon Send-Off',date:'2027-06-13',time:'11:30 AM',location:'SAMPLE — The Sunny Courtyard, Washington, DC',dressCode:'Brunch colors + sunglasses',description:'Coffee, pastries, dramatic waving, and one final suitcase check.'},
    {id:'kitten',title:'Kitten Shower',date:'2027-06-13',time:'2:30 PM',location:'SAMPLE — The Cat’s Future Penthouse, Washington, DC',dressCode:'Anything that survives fur',description:'A tiny celebration for the household member who will run everything.'}
  ],
  photos:[
    {label:'PHOTO 1',caption:'The official “we clean up well” photo.'},
    {label:'PHOTO 2',caption:'A suspiciously calm pre-cat era.'},
    {label:'PHOTO 3',caption:'Proof we can coordinate at least one thing.'},
    {label:'PHOTO 4',caption:'Future family portrait, cat pending.'}
  ],
  gifts:[
    {title:'Cat Tower Empire Fund',description:'Help our tiny landlord expand vertically.',url:''},
    {title:'Honeymoon Snack Budget',description:'A noble cause with immediate returns.',url:''},
    {title:'Mystery Gift',description:'Your chance to introduce chaos responsibly.',url:''}
  ],
  faq:[
    {q:'Are these event details final?',a:'No. Dates and locations on this demo are marked SAMPLE until the real details are configured.'},
    {q:'Can I bring a plus-one?',a:'Use the guest-count field in the RSVP. Final guest policies can be added here once confirmed.'},
    {q:'Will the cat attend?',a:'The cat has not approved the contract rider.'},
    {q:'What about allergies or dietary needs?',a:'Add them in the RSVP form so the hosts can plan safely.'}
  ]
} as const;