// Mock authentication service for local development
// This replaces Wix Members authentication

interface MockMember {
  _id: string;
  loginEmail?: string;
  contactId?: string;
  nickname?: string;
  [key: string]: any;
}

// In-memory session storage
let currentMember: MockMember | null = null;

export const mockAuthService = {
  getCurrentMember: async (): Promise<MockMember | null> => {
    // Check localStorage for persisted session
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockMember');
      if (stored) {
        currentMember = JSON.parse(stored);
      }
    }
    return currentMember;
  },

  login: async (email: string, password: string): Promise<MockMember> => {
    // Simple mock login - in real app, you'd validate credentials
    const member: MockMember = {
      _id: `member_${Date.now()}`,
      loginEmail: email,
      contactId: `contact_${Date.now()}`,
      nickname: email.split('@')[0],
    };
    
    currentMember = member;
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockMember', JSON.stringify(member));
    }
    
    return member;
  },

  logout: async (): Promise<void> => {
    currentMember = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockMember');
    }
  },

  promptLogin: async (): Promise<void> => {
    // In a real implementation, this would redirect to login page
    console.log('Please login to continue');
  },

  applySessionToken: (token: string): void => {
    // Mock implementation - not used in local dev
    console.log('Mock: Session token applied', token);
  },
};
