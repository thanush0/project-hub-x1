/**
 * Admin Authentication Service
 * Simple token-based authentication for admin panel
 */

import { AdminUser, AdminSession } from './types';

// ============================================
// IN-MEMORY STORAGE
// ============================================

const adminUsers: Map<string, AdminUser> = new Map();
const activeSessions: Map<string, AdminSession> = new Map();

// ============================================
// DEFAULT ADMIN USER
// ============================================

const DEFAULT_ADMIN: AdminUser = {
  _id: 'admin_001',
  email: 'admin@projecthubx.com',
  passwordHash: 'admin123', // In production, use bcrypt
  role: 'admin',
  name: 'Admin User',
  _createdDate: new Date(),
};

// Initialize default admin
adminUsers.set(DEFAULT_ADMIN.email, DEFAULT_ADMIN);

// ============================================
// AUTH SERVICE
// ============================================

export const AdminAuthService = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<AdminSession | null> {
    const user = adminUsers.get(email);
    
    if (!user) {
      return null;
    }

    // In production, use bcrypt.compare(password, user.passwordHash)
    if (password !== user.passwordHash) {
      return null;
    }

    // Create session token
    const token = this.generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    const session: AdminSession = {
      token,
      userId: user._id,
      email: user.email,
      role: user.role,
      expiresAt,
    };

    activeSessions.set(token, session);

    // Update last login
    user.lastLogin = new Date();

    return session;
  },

  /**
   * Logout and invalidate token
   */
  logout(token: string): boolean {
    return activeSessions.delete(token);
  },

  /**
   * Verify token and get session
   */
  verifyToken(token: string): AdminSession | null {
    const session = activeSessions.get(token);
    
    if (!session) {
      return null;
    }

    // Check if expired
    if (new Date() > session.expiresAt) {
      activeSessions.delete(token);
      return null;
    }

    return session;
  },

  /**
   * Check if user has required role
   */
  hasRole(token: string, requiredRole: 'admin' | 'editor' | 'viewer'): boolean {
    const session = this.verifyToken(token);
    if (!session) return false;

    const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
    const userRoleLevel = roleHierarchy[session.role as keyof typeof roleHierarchy] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

    return userRoleLevel >= requiredRoleLevel;
  },

  /**
   * Generate random token
   */
  generateToken(): string {
    return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  },

  /**
   * Get current session from localStorage (client-side)
   */
  getCurrentSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    
    const sessionData = localStorage.getItem('admin_session');
    if (!sessionData) return null;

    try {
      const session: AdminSession = JSON.parse(sessionData);
      
      // Convert expiresAt string back to Date object
      session.expiresAt = new Date(session.expiresAt);
      
      // Check if expired
      if (new Date() > session.expiresAt) {
        this.clearSession();
        return null;
      }

      // Restore to activeSessions cache for verifyToken
      activeSessions.set(session.token, session);

      return session;
    } catch (error) {
      // Invalid session data, clear it
      this.clearSession();
      return null;
    }
  },

  /**
   * Save session to localStorage (client-side)
   */
  saveSession(session: AdminSession): void {
    if (typeof window === 'undefined') return;
    
    // Store the entire session object
    localStorage.setItem('admin_session', JSON.stringify(session));
    
    // Also add to in-memory cache
    activeSessions.set(session.token, session);
  },

  /**
   * Clear session from localStorage (client-side)
   */
  clearSession(): void {
    if (typeof window === 'undefined') return;
    
    const sessionData = localStorage.getItem('admin_session');
    if (sessionData) {
      try {
        const session: AdminSession = JSON.parse(sessionData);
        activeSessions.delete(session.token);
      } catch (error) {
        // Ignore parse errors during cleanup
      }
    }
    
    localStorage.removeItem('admin_session');
  },
};
