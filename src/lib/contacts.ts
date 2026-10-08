type Contact = {
  name: string
  role: string
  initials: string
  emails: string[]
  whatsapp?: { number: string; label: string }
}

export const contacts: Contact[] = [
  {
    name: 'Juan Cristancho',
    role: 'Sales',
    initials: 'JC',
    emails: ['sales@btgcompany.net'],
    whatsapp: { number: '19544947790', label: '+1 (954) 494-7790' },
  },
  {
    name: 'Liliana Puerta',
    role: 'Office Manager',
    initials: 'LP',
    emails: ['spfway@tlimiami.com', 'spfway@bellsouth.net'],
    whatsapp: { number: '17864860492', label: '+1 (786) 486-0492' },
  },
  {
    name: 'Jessica Cristancho',
    role: 'Traffic Manager',
    initials: 'JC',
    emails: ['operations@btgcompany.net'],
    whatsapp: { number: '19544395171', label: '+1 (954) 439-5171' },
  },
  {
    name: 'Giancarlo Avendano',
    role: 'Operations Manager',
    initials: 'GA',
    emails: ['gc@tlimiami.com'],
    whatsapp: { number: '17866610046', label: '+1 (786) 661-0046' },
  },
]
