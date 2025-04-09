export const mainCategories = {
  comparison: {
    title: 'Comparison',
    subcategories: ['Vs OKC', 'Vs National']
  },
  overtime: { 
    title: 'Over Time',
    subcategories: ['Last Month', 'Last Year']
  }
};

export const hierarchyData = {
  economics: {
    title: 'Economics',
    species: {
      poverty: {
        title: 'Poverty Rate',
        items: ['Community Action Project', 'Tulsa Economic Dev Corp']
      },
      unemployment: {
        title: 'Unemployment',
        items: ['Workforce Tulsa', 'Goodwill Industries']
      }
    }
  },
  medicine: {
    title: 'Medicine',
    species: {
      infantMortality: {
        title: 'Infant Mortality',
        items: ['Tulsa Healthy Start', 'March of Dimes']
      },
      accessToCare: {
        title: 'Access to Care',
        items: ['Morton Health', 'Federally Qualified Health Centers']
      }
    }
  }
};

export const itemData = {
  economics: {
    _general: {
      comparison: {
        'Vs OKC': '+3.5%',
        'Vs National': '+2.1%'
      },
      overtime: {
        'Last Month': '-0.2%',
        'Last Year': '-0.8%'
      }
    },
    poverty: {
      _general: {
        comparison: {
          'Vs OKC': '+3.5%',
          'Vs National': '+2.1%'
        },
        overtime: {
          'Last Month': '-0.2%',
          'Last Year': '-0.8%'
        }
      },
      'Community Action Project': {
        comparison: {
          'Vs OKC': '+5.2%',
          'Vs National': '-1.7%'
        },
        overtime: {
          'Last Month': '+0.4%',
          'Last Year': '-2.3%'
        },
        attributes: ['Financial Literacy Programs', 'Housing Assistance']
      },
      'Tulsa Economic Dev Corp': {
        comparison: {
          'Vs OKC': '+1.8%',
          'Vs National': '+6.1%'
        },
        overtime: {
          'Last Month': '-0.9%',
          'Last Year': '+0.5%'
        },
        attributes: ['Small Business Loans', 'Entrepreneur Mentoring']
      }
    },
    unemployment: {
      _general: {
        comparison: {
          'Vs OKC': '-1.3%',
          'Vs National': '+2.5%'
        },
        overtime: {
          'Last Month': '+0.8%',
          'Last Year': '-1.7%'
        }
      },
      'Workforce Tulsa': {
        comparison: {
          'Vs OKC': '-3.5%',
          'Vs National': '+1.2%'
        },
        overtime: {
          'Last Month': '+1.3%',
          'Last Year': '-2.8%'
        },
        attributes: ['Job Training Programs', 'Resume Workshops']
      },
      'Goodwill Industries': {
        comparison: {
          'Vs OKC': '+0.9%',
          'Vs National': '+3.8%'
        },
        overtime: {
          'Last Month': '+0.3%',
          'Last Year': '-0.6%'
        },
        attributes: ['Vocational Rehabilitation', 'Retail Job Placement']
      }
    }
  },
  medicine: {
    _general: {
      comparison: {
        'Vs OKC': '+1.1%',
        'Vs National': '+3.2%'
      },
      overtime: {
        'Last Month': '-0.2%',
        'Last Year': '-0.5%'
      }
    },
    infantMortality: {
      _general: {
        comparison: {
          'Vs OKC': '+1.1%',
          'Vs National': '+3.2%'
        },
        overtime: {
          'Last Month': '-0.2%',
          'Last Year': '-0.5%'
        }
      },
      'Tulsa Healthy Start': {
        comparison: {
          'Vs OKC': '+2.7%',
          'Vs National': '-0.8%'
        },
        overtime: {
          'Last Month': '-1.6%',
          'Last Year': '+0.7%'
        },
        attributes: ['Prenatal Care Coordination', 'Home Visitation Programs']
      },
      'March of Dimes': {
        comparison: {
          'Vs OKC': '-0.5%',
          'Vs National': '+7.1%'
        },
        overtime: {
          'Last Month': '+1.2%',
          'Last Year': '-3.1%'
        },
        attributes: ['NICU Family Support', 'Maternal Health Research']
      }
    },
    accessToCare: {
      _general: {
        comparison: {
          'Vs OKC': '-3.4%',
          'Vs National': '-1.9%'
        },
        overtime: {
          'Last Month': '+2.1%',
          'Last Year': '-0.5%'
        }
      },
      'Morton Health': {
        comparison: {
          'Vs OKC': '-5.7%',
          'Vs National': '-3.2%'
        },
        overtime: {
          'Last Month': '+3.5%',
          'Last Year': '-2.2%'
        },
        attributes: ['Free Medical Clinics', 'Preventative Care Programs']
      },
      'Federally Qualified Health Centers': {
        comparison: {
          'Vs OKC': '-1.1%',
          'Vs National': '-0.6%'
        },
        overtime: {
          'Last Month': '+0.7%',
          'Last Year': '+1.3%'
        },
        attributes: ['Sliding Fee Scale Services', 'Integrated Behavioral Health']
      }
    }
  }
};

export const organizationData = {
  'Community Action Project': {
    'Operating Costs': '$3.2M',
    'Org Size': '45',
    'Activity Change': '+12%'
  },
  'Tulsa Economic Dev Corp': {
    'Operating Costs': '$1.8M',
    'Org Size': '23',
    'Activity Change': '+8%'
  },
  'Workforce Tulsa': {
    'Operating Costs': '$2.5M',
    'Org Size': '37',
    'Activity Change': '+5%'
  },
  'Goodwill Industries': {
    'Operating Costs': '$4.7M',
    'Org Size': '120',
    'Activity Change': '+15%'
  },
  'Tulsa Healthy Start': {
    'Operating Costs': '$1.4M',
    'Org Size': '18',
    'Activity Change': '+10%'
  },
  'March of Dimes': {
    'Operating Costs': '$2.1M',
    'Org Size': '25',
    'Activity Change': '+7%'
  },
  'Morton Health': {
    'Operating Costs': '$5.3M',
    'Org Size': '63',
    'Activity Change': '+4%'
  },
  'Federally Qualified Health Centers': {
    'Operating Costs': '$8.7M',
    'Org Size': '85',
    'Activity Change': '+6%'
  }
};

export const activityData = {
  'Financial Literacy Programs': {
    data: [
      { period: 'Jan', value: 35 },
      { period: 'Feb', value: 42 },
      { period: 'Mar', value: 38 },
      { period: 'Apr', value: 45 },
      { period: 'May', value: 52 },
      { period: 'Jun', value: 58 }
    ],
    title: 'Participants (6 months)'
  },
  'Housing Assistance': {
    data: [
      { period: 'Jan', value: 22 },
      { period: 'Feb', value: 18 },
      { period: 'Mar', value: 25 },
      { period: 'Apr', value: 21 },
      { period: 'May', value: 28 },
      { period: 'Jun', value: 32 }
    ],
    title: 'Families Served (6 months)'
  },
  'Small Business Loans': {
    data: [
      { period: 'Jan', value: 15 },
      { period: 'Feb', value: 18 },
      { period: 'Mar', value: 22 },
      { period: 'Apr', value: 12 },
      { period: 'May', value: 16 },
      { period: 'Jun', value: 25 }
    ],
    title: 'Loans Issued (6 months)'
  },
  'Entrepreneur Mentoring': {
    data: [
      { period: 'Jan', value: 25 },
      { period: 'Feb', value: 32 },
      { period: 'Mar', value: 30 },
      { period: 'Apr', value: 35 },
      { period: 'May', value: 28 },
      { period: 'Jun', value: 42 }
    ],
    title: 'Sessions (6 months)'
  },
  'Job Training Programs': {
    data: [
      { period: 'Jan', value: 42 },
      { period: 'Feb', value: 45 },
      { period: 'Mar', value: 40 },
      { period: 'Apr', value: 38 },
      { period: 'May', value: 55 },
      { period: 'Jun', value: 60 }
    ],
    title: 'Trainees (6 months)'
  },
  'Resume Workshops': {
    data: [
      { period: 'Jan', value: 30 },
      { period: 'Feb', value: 35 },
      { period: 'Mar', value: 32 },
      { period: 'Apr', value: 28 },
      { period: 'May', value: 22 },
      { period: 'Jun', value: 30 }
    ],
    title: 'Attendees (6 months)'
  },
  'Vocational Rehabilitation': {
    data: [
      { period: 'Jan', value: 15 },
      { period: 'Feb', value: 18 },
      { period: 'Mar', value: 25 },
      { period: 'Apr', value: 32 },
      { period: 'May', value: 28 },
      { period: 'Jun', value: 24 }
    ],
    title: 'Clients (6 months)'
  },
  'Retail Job Placement': {
    data: [
      { period: 'Jan', value: 22 },
      { period: 'Feb', value: 25 },
      { period: 'Mar', value: 35 },
      { period: 'Apr', value: 32 },
      { period: 'May', value: 40 },
      { period: 'Jun', value: 36 }
    ],
    title: 'Placements (6 months)'
  },
  'Prenatal Care Coordination': {
    data: [
      { period: 'Jan', value: 28 },
      { period: 'Feb', value: 32 },
      { period: 'Mar', value: 35 },
      { period: 'Apr', value: 38 },
      { period: 'May', value: 34 },
      { period: 'Jun', value: 42 }
    ],
    title: 'Mothers Served (6 months)'
  },
  'Home Visitation Programs': {
    data: [
      { period: 'Jan', value: 45 },
      { period: 'Feb', value: 48 },
      { period: 'Mar', value: 42 },
      { period: 'Apr', value: 50 },
      { period: 'May', value: 55 },
      { period: 'Jun', value: 62 }
    ],
    title: 'Visits (6 months)'
  },
  'NICU Family Support': {
    data: [
      { period: 'Jan', value: 18 },
      { period: 'Feb', value: 22 },
      { period: 'Mar', value: 20 },
      { period: 'Apr', value: 15 },
      { period: 'May', value: 28 },
      { period: 'Jun', value: 35 }
    ],
    title: 'Families Served (6 months)'
  },
  'Maternal Health Research': {
    data: [
      { period: 'Jan', value: 8 },
      { period: 'Feb', value: 6 },
      { period: 'Mar', value: 12 },
      { period: 'Apr', value: 14 },
      { period: 'May', value: 12 },
      { period: 'Jun', value: 18 }
    ],
    title: 'Studies (6 months)'
  },
  'Free Medical Clinics': {
    data: [
      { period: 'Jan', value: 85 },
      { period: 'Feb', value: 92 },
      { period: 'Mar', value: 78 },
      { period: 'Apr', value: 85 },
      { period: 'May', value: 102 },
      { period: 'Jun', value: 110 }
    ],
    title: 'Patients (6 months)'
  },
  'Preventative Care Programs': {
    data: [
      { period: 'Jan', value: 62 },
      { period: 'Feb', value: 58 },
      { period: 'Mar', value: 65 },
      { period: 'Apr', value: 72 },
      { period: 'May', value: 68 },
      { period: 'Jun', value: 75 }
    ],
    title: 'Screenings (6 months)'
  },
  'Sliding Fee Scale Services': {
    data: [
      { period: 'Jan', value: 110 },
      { period: 'Feb', value: 105 },
      { period: 'Mar', value: 120 },
      { period: 'Apr', value: 125 },
      { period: 'May', value: 118 },
      { period: 'Jun', value: 140 }
    ],
    title: 'Patients (6 months)'
  },
  'Integrated Behavioral Health': {
    data: [
      { period: 'Jan', value: 35 },
      { period: 'Feb', value: 38 },
      { period: 'Mar', value: 45 },
      { period: 'Apr', value: 40 },
      { period: 'May', value: 35 },
      { period: 'Jun', value: 52 }
    ],
    title: 'Sessions (6 months)'
  }
}; 