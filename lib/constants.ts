export const ASSET_CATEGORIES = [
  { id: 'bank', label: 'Bank / Deposits' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'investments', label: 'Investments / IEPF' },
  { id: 'pf', label: 'EPF / PF' },
  { id: 'property', label: 'Property' },
  { id: 'benefits', label: 'Government Benefits' },
  { id: 'other', label: 'Other / Future Assets' },
];

export const DOCUMENT_REQUIREMENTS = {
  bank: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
    {
      id: 'address_proof',
      label: 'Address Proof',
      description: 'Utility bill or rental agreement',
      required: true,
    },
  ],
  insurance: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
    {
      id: 'policy_doc',
      label: 'Policy Document',
      description: 'If you have it',
      required: false,
    },
  ],
  investments: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
    {
      id: 'folio',
      label: 'Folio Number',
      description: 'Investment folio details',
      required: false,
    },
  ],
  pf: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
    {
      id: 'pf_number',
      label: 'PF Account Number',
      description: 'UAN or account number',
      required: false,
    },
  ],
  property: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
    {
      id: 'property_doc',
      label: 'Property Documents',
      description: 'Title deed or registration',
      required: false,
    },
  ],
  benefits: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
  ],
  other: [
    {
      id: 'id_proof',
      label: 'Identity Proof',
      description: 'Aadhar, PAN, or Passport',
      required: true,
    },
  ],
};
