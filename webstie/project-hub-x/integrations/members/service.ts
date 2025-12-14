import { Member } from "./types";
import { mockAuthService } from "./mock-auth";

export const getCurrentMember = async (): Promise<Member | null> => {
  try {
    const member = await mockAuthService.getCurrentMember();
    if (!member) {
      console.log('==== No member found');
    }
    return member;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const promptLogin = mockAuthService.promptLogin;
export const applySessionToken = mockAuthService.applySessionToken;
