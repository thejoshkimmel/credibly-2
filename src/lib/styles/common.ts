// Common Tailwind classes for consistent styling with responsive units
export const styles = {
  // CSS Variables
  variables: {
    primary: 'var(--primary-color, #2563eb)', // blue-600
    secondary: 'var(--secondary-color, #4b5563)', // gray-600
    accent: 'var(--accent-color, #f59e0b)', // amber-500
  },

  // Layout
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'w-full py-8 sm:py-12 lg:py-16 space-y-4 sm:space-y-6 lg:space-y-8',
  main: 'pt-[calc(60px+1rem)]', // Account for fixed navbar
  
  // Navigation
  nav: {
    container: 'fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50',
    content: 'flex items-center justify-between h-[60px] px-4 sm:px-6 lg:px-8',
    logo: 'flex items-center space-x-2',
    links: 'hidden sm:flex items-center space-x-4 lg:space-x-6',
    mobile: 'sm:hidden flex items-center space-x-4',
  },

  // Page Layouts
  page: {
    container: 'grid gap-4 sm:gap-6 lg:gap-8',
    // Dashboard Layout
    dashboard: {
      container: `
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-4
        sm:gap-6
        lg:gap-8
        grid-auto-flow-dense
      `,
      header: 'col-span-1 lg:col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
      stats: 'col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
      chart: 'col-span-1 lg:col-span-8 bg-white rounded-lg shadow-sm p-4 sm:p-6',
      recent: 'col-span-1 lg:col-span-4 bg-white rounded-lg shadow-sm p-4 sm:p-6',
      activity: 'col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4',
    },
    // Profile Layout
    profile: {
      container: `
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-4
        sm:gap-6
        lg:gap-8
        grid-auto-flow-dense
      `,
      header: 'col-span-1 lg:col-span-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-lg shadow-sm p-4 sm:p-6',
      main: 'col-span-1 lg:col-span-8 grid gap-4 sm:gap-6 lg:gap-8',
      sidebar: 'col-span-1 lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8',
      activity: 'col-span-1 lg:col-span-8 bg-white rounded-lg shadow-sm p-4 sm:p-6',
      stats: 'col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4',
      settings: 'col-span-1 lg:col-span-4 bg-white rounded-lg shadow-sm p-4 sm:p-6',
    },
  },

  // Cards
  card: {
    base: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
    header: 'flex items-center justify-between mb-4',
    title: 'text-lg font-medium text-gray-900',
    content: 'space-y-4',
    footer: 'mt-4 pt-4 border-t border-gray-100',
  },
  
  // Hero
  hero: {
    container: 'w-full py-12 sm:py-16 lg:py-20',
    headline: 'text-[clamp(1.25rem,4vw,2rem)] font-bold tracking-tight text-gray-900',
    subheadline: 'mt-4 text-lg sm:text-xl text-gray-600',
  },

  // Rating Card
  ratingCard: {
    container: 'w-[min(100%,400px)] bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6',
    header: 'flex items-center justify-between mb-4',
    score: 'flex items-center space-x-2',
    star: 'w-5 h-5 text-[var(--accent)] fill-current',
    scoreText: 'text-lg font-medium text-gray-900',
    criteria: 'mt-4 space-y-3',
    criterion: 'flex items-center justify-between',
    criterionName: 'text-sm text-gray-600',
    criterionScore: 'text-sm font-medium text-gray-900',
    comment: 'mt-4 text-sm text-gray-600 line-clamp-3',
    footer: 'mt-4 flex items-center justify-between text-sm text-gray-500',
  },

  // Navbar
  navbar: {
    container: 'sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between',
    brand: 'text-xl font-bold text-gray-900',
    nav: 'flex items-center space-x-4 sm:space-x-6',
    link: 'text-gray-600 hover:text-gray-900 transition-colors duration-200',
    active: 'text-blue-600 font-medium',
  },
  
  // Modal
  modal: {
    overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
    container: 'fixed inset-0 z-50 overflow-y-auto',
    content: 'min-h-screen px-4 text-center',
    panel: 'relative inline-block w-full max-w-md p-6 my-8 text-left align-middle bg-white rounded-lg shadow-xl transform transition-all',
    header: 'flex items-center justify-between mb-4',
    title: 'text-lg font-medium text-gray-900',
    close: 'text-gray-400 hover:text-gray-500 focus:outline-none',
    body: 'mt-2',
    footer: 'mt-4 flex justify-end space-x-3',
  },
  
  // Shadows and elevation
  shadow: {
    sm: 'shadow-sm hover:shadow transition-shadow duration-200',
    md: 'shadow-md hover:shadow-lg transition-shadow duration-200',
    lg: 'shadow-lg hover:shadow-xl transition-shadow duration-200',
    modal: 'shadow-2xl',
  },
  
  // Z-index layers
  zIndex: {
    base: 'z-0',
    card: 'z-10',
    dropdown: 'z-20',
    modal: 'z-50',
    toast: 'z-100',
  },
  
  // Visibility
  visibility: {
    hidden: 'invisible opacity-0',
    visible: 'visible opacity-100',
    error: 'invisible peer-invalid:visible opacity-0 peer-invalid:opacity-100',
  },
  
  // Scrollable containers
  scrollable: {
    sm: 'max-h-32 overflow-y-auto',
    md: 'max-h-64 overflow-y-auto',
    lg: 'max-h-96 overflow-y-auto',
    xl: 'max-h-[32rem] overflow-y-auto',
  },
  
  // Disabled states
  disabled: {
    button: 'opacity-50 cursor-not-allowed pointer-events-none',
    input: 'opacity-50 cursor-not-allowed pointer-events-none',
    card: 'opacity-50 cursor-not-allowed pointer-events-none',
  },
  
  // Typography - Enhanced readability and consistency
  heading: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wide leading-tight',
    h2: 'text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 tracking-wide leading-tight',
    h3: 'text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 tracking-wide leading-tight',
    h4: 'text-base sm:text-lg lg:text-xl font-medium text-gray-900 tracking-wide leading-tight',
    section: 'text-xl sm:text-2xl font-semibold text-gray-900 tracking-wide leading-tight',
  },
  text: {
    body: 'text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide',
    small: 'text-sm sm:text-base text-gray-500 leading-normal tracking-wide',
    tiny: 'text-xs sm:text-sm text-gray-500 leading-normal tracking-wide',
    bio: 'text-sm sm:text-base text-gray-600 italic leading-relaxed tracking-wide',
    label: 'text-sm sm:text-base font-medium text-gray-700 tracking-wide',
    caption: 'text-xs sm:text-sm text-gray-500 uppercase tracking-wider',
  },
  profile: {
    name: 'text-lg sm:text-xl font-bold text-gray-900 tracking-wide leading-tight',
    title: 'text-sm sm:text-base font-medium text-gray-700 uppercase tracking-wider',
    bio: 'text-sm sm:text-base text-gray-600 italic leading-relaxed tracking-wide',
    stats: 'text-sm sm:text-base font-medium text-gray-700 tracking-wide',
  },
  
  // Form Layouts
  form: {
    container: 'space-y-6',
    group: 'flex flex-col sm:flex-row gap-4',
    field: 'flex flex-col space-y-2',
    label: 'text-sm font-medium text-gray-700',
    input: 'rounded-md border border-gray-300 px-3 py-2 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
    select: 'rounded-md border border-gray-300 px-3 py-2 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
    checkbox: 'flex items-center space-x-2',
    radio: 'flex items-center space-x-2',
    buttonGroup: 'flex flex-wrap gap-2',
  },
  
  // Buttons - Using em-based padding for better scaling
  button: {
    base: 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-200',
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    ghost: 'text-gray-700 hover:text-gray-900 focus:outline-none transition-all duration-200',
  },
  
  // Tables - Using responsive units
  table: {
    container: 'w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md',
    table: 'w-full min-w-full divide-y divide-gray-200',
    header: 'bg-gray-50',
    headerCell: 'px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider',
    body: 'bg-white divide-y divide-gray-200',
    row: 'hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/50',
    cell: 'px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-gray-900 tracking-wide',
  },
  
  // Lists - Using responsive units
  list: {
    container: 'w-full space-y-4 sm:space-y-6',
    item: 'w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 sm:p-6',
  },
  
  // Grid - Using responsive units
  grid: {
    container: 'grid gap-4 sm:gap-6 lg:gap-8',
    cols: {
      default: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      wide: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      narrow: 'grid-cols-1 sm:grid-cols-2',
    },
    spans: {
      full: 'col-span-full',
      half: 'col-span-1 md:col-span-2',
      third: 'col-span-1 lg:col-span-1',
      twoThirds: 'col-span-1 lg:col-span-2',
    },
  },
  
  // Flex - Using responsive units
  flex: {
    container: 'w-full flex',
    row: 'w-full flex flex-row',
    col: 'w-full flex flex-col',
    center: 'w-full flex items-center justify-center',
    between: 'w-full flex items-center justify-between',
    start: 'w-full flex items-center justify-start',
    end: 'w-full flex items-center justify-end',
  },
  
  // Spacing - Using responsive units
  spacing: {
    xs: 'space-y-1 sm:space-y-2',
    sm: 'space-y-2 sm:space-y-3',
    md: 'space-y-4 sm:space-y-6',
    lg: 'space-y-6 sm:space-y-8',
    xl: 'space-y-8 sm:space-y-12',
  },
  
  // Margins - Using responsive units
  margin: {
    xs: 'm-1 sm:m-2',
    sm: 'm-2 sm:m-3',
    md: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8',
    xl: 'm-8 sm:m-12',
  },
  
  // Padding - Using responsive units
  padding: {
    xs: 'p-1 sm:p-2',
    sm: 'p-2 sm:p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12',
  },
  
  // Image sizes - Using responsive units
  image: {
    avatar: {
      sm: 'w-8 h-8 sm:w-10 sm:h-10',
      md: 'w-12 h-12 sm:w-16 sm:h-16',
      lg: 'w-16 h-16 sm:w-20 sm:h-20',
      xl: 'w-20 h-20 sm:w-24 sm:h-24',
    },
    thumbnail: {
      sm: 'w-16 h-16 sm:w-20 sm:h-20',
      md: 'w-24 h-24 sm:w-32 sm:h-32',
      lg: 'w-32 h-32 sm:w-40 sm:h-40',
      xl: 'w-40 h-40 sm:w-48 sm:h-48',
    },
  },
  
  // Icon sizes - Using responsive units
  icon: {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-8 sm:h-8',
    xl: 'w-8 h-8 sm:w-10 sm:h-10',
  },

  // Tooltips - Enhanced with better positioning
  tooltip: {
    container: 'relative inline-block group',
    content: 'invisible group-hover:visible absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap',
    position: {
      top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
      bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
      left: '-left-2 top-1/2 -translate-y-1/2 -translate-x-full',
      right: '-right-2 top-1/2 -translate-y-1/2 translate-x-full',
    },
    arrow: 'absolute w-2 h-2 bg-gray-900 transform rotate-45',
    info: {
      icon: 'w-4 h-4 text-gray-400 hover:text-gray-500 transition-colors duration-200',
      container: 'relative inline-flex items-center',
    },
  },

  // Input type-specific styles
  input: {
    base: 'w-full px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 transition-all duration-200 tracking-wide',
    types: {
      email: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 [&:not(:placeholder-shown):not(:focus):invalid]:border-red-500 [&:not(:placeholder-shown):not(:focus):invalid]:ring-red-500',
      password: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden',
      text: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
      number: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      search: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-10',
    },
    states: {
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none bg-gray-50',
      error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
      success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
    },
  },

  // Profile Card
  profileCard: {
    container: 'w-full max-w-md bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6',
    header: 'flex items-center space-x-4',
    avatar: 'w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold',
    name: 'text-xl font-bold text-gray-900',
    email: 'text-sm text-gray-600',
    stats: 'mt-6 grid grid-cols-3 gap-4',
    stat: 'text-center',
    statValue: 'text-2xl font-bold text-[var(--primary)]',
    statLabel: 'text-sm text-gray-600',
    actions: 'mt-6 flex space-x-3',
  },

  // Profile Cards Grid
  profileGrid: {
    container: 'grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    card: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
    header: 'flex items-center space-x-4',
    avatar: 'w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-bold',
    info: 'flex-1 min-w-0', // Prevent text overflow
    name: 'text-base font-medium text-gray-900 truncate',
    title: 'text-sm text-gray-600 truncate',
    stats: 'mt-4 grid grid-cols-3 gap-2',
    stat: 'text-center',
    statValue: 'text-lg font-semibold text-[var(--primary)]',
    statLabel: 'text-xs text-gray-600',
  },

  // Metrics Dashboard
  metrics: {
    container: 'grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    card: 'bg-white rounded-lg shadow-sm p-4 sm:p-6',
    header: 'flex items-center justify-between mb-4',
    title: 'text-sm font-medium text-gray-600',
    value: 'text-2xl font-bold text-[var(--primary)]',
    trend: 'flex items-center text-sm',
    trendUp: 'text-green-600',
    trendDown: 'text-red-600',
    chart: 'mt-4 h-24',
  },

  // Feed Grids
  feed: {
    container: `
      grid
      grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
      gap-4
      sm:gap-6
      lg:gap-8
    `,
    card: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
    header: 'flex items-center justify-between mb-4',
    title: 'text-lg font-medium text-gray-900',
    content: 'space-y-4',
    footer: 'mt-4 pt-4 border-t border-gray-100',
  },

  // Rating Summaries Grid
  ratings: {
    container: `
      grid
      grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
      gap-4
      sm:gap-6
      lg:gap-8
    `,
    card: {
      base: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
      header: 'flex items-center justify-between mb-4',
      title: 'text-lg font-medium text-gray-900',
      content: 'space-y-4',
      footer: 'mt-4 pt-4 border-t border-gray-100',
    },
    stats: 'flex items-center justify-between',
    metric: 'flex flex-col items-center',
    value: 'text-2xl font-bold text-[var(--primary)]',
    label: 'text-sm text-gray-600',
  },

  // Profile Feed Grid
  profile: {
    container: `
      grid
      grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
      gap-4
      sm:gap-6
      lg:gap-8
    `,
    card: {
      base: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
      header: 'flex items-center justify-between mb-4',
      title: 'text-lg font-medium text-gray-900',
      content: 'space-y-4',
      footer: 'mt-4 pt-4 border-t border-gray-100',
    },
    stats: 'flex items-center justify-between',
    metric: 'flex flex-col items-center',
    value: 'text-2xl font-bold text-[var(--primary)]',
    label: 'text-sm text-gray-600',
  },

  // Button Groups
  buttonGroup: {
    container: 'flex flex-wrap gap-2',
    primary: 'flex items-center space-x-2',
    secondary: 'flex items-center space-x-2',
    icon: 'flex items-center space-x-2',
  },

  // Admin Panel Grid
  admin: {
    container: `
      grid
      grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
      gap-4
      sm:gap-6
      lg:gap-8
      grid-auto-flow-dense
    `,
    card: {
      base: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6',
      header: 'flex items-center justify-between mb-4',
      title: 'text-lg font-medium text-gray-900',
      content: 'space-y-4',
      footer: 'mt-4 pt-4 border-t border-gray-100',
    },
    // Card span utilities
    span: {
      full: 'col-span-full',
      half: 'col-span-1 sm:col-span-2',
      third: 'col-span-1 sm:col-span-2 lg:col-span-3',
      quarter: 'col-span-1 sm:col-span-2 lg:col-span-4',
    },
  },
} as const; 