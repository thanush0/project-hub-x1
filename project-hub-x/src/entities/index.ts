/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: clienttestimonials
 * Interface for ClientTestimonials
 */
export interface ClientTestimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType text */
  clientRole?: string;
  /** @wixFieldType image */
  clientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  testimonialDate?: Date | string;
}


/**
 * Collection ID: customprojectrequests
 * Interface for CustomProjectRequests
 */
export interface CustomProjectRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType text */
  projectType?: string;
  /** @wixFieldType text */
  desiredFeatures?: string;
  /** @wixFieldType text */
  preferredTechStack?: string;
  /** @wixFieldType text */
  budgetRange?: string;
  /** @wixFieldType date */
  deadline?: Date | string;
  /** @wixFieldType image */
  projectMockup?: string;
  /** @wixFieldType text */
  requestStatus?: string;
  /** @wixFieldType number */
  quotationAmount?: number;
  /** @wixFieldType text */
  quotationCurrency?: string;
  /** @wixFieldType date */
  quotationDate?: Date | string;
}


/**
 * Collection ID: developerprofiles
 * Interface for DeveloperProfiles
 */
export interface DeveloperProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  displayName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  skills?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  experienceLevel?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType multi_reference */
  readymadeprojects?: ReadyMadeProjects[];
}


/**
 * Collection ID: faq
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isPublished?: boolean;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: howitworkssteps
 * Interface for HowItWorksSteps
 */
export interface HowItWorksSteps {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  illustration?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaUrl?: string;
}


/**
 * Collection ID: readymadeprojects
 * Interface for ReadyMadeProjects
 */
export interface ReadyMadeProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType multi_reference */
  assigneddevelopers?: DeveloperProfiles[];
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  features?: string;
  /** @wixFieldType text */
  techStack?: string;
  /** @wixFieldType image */
  screenshot1?: string;
  /** @wixFieldType image */
  screenshot2?: string;
  /** @wixFieldType url */
  demoVideoLink?: string;
  /** @wixFieldType text */
  deliverables?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}
