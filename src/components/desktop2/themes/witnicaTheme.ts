
export const witnicaTheme = {
  colors: {
    primary: '#0078D4',
    secondary: '#6B46C1',
    accent: '#8B5CF6',
    surface: 'rgba(255, 255, 255, 0.1)',
    surfaceHover: 'rgba(255, 255, 255, 0.2)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.2)',
    gradient: {
      primary: 'linear-gradient(135deg, #0078D4, #6B46C1)',
      secondary: 'linear-gradient(135deg, #6B46C1, #8B5CF6)',
      surface: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
    }
  },
  effects: {
    blur: 'blur(40px)',
    glassMorphism: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(40px) saturate(1.8)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    shadow: {
      small: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
      medium: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      large: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }
  },
  animations: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'all 0.2s ease-out'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};
