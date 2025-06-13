// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRating = (
  score: number,
  comment: string,
  category: string,
  tags: string[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (score < 1 || score > 5) {
    errors.push('Rating score must be between 1 and 5');
  }

  if (!comment?.trim()) {
    errors.push('Rating comment is required');
  }

  if (!category) {
    errors.push('Valid rating category is required');
  }

  if (!tags?.length) {
    errors.push('At least one rating tag is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUser = (
  name: string,
  email: string,
  role: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!name?.trim()) {
    errors.push('Name is required');
  }

  if (!isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!['admin', 'user', 'moderator'].includes(role)) {
    errors.push('Invalid role');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 