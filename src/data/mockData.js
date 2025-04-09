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
  // ... [rest of activity data]
}; 