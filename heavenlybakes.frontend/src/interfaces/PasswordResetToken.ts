export default interface PasswordResetToken {
    tokenId : string;
    createdAt: string;
    expiresAt: string;
    tokenUsed: boolean;
}
