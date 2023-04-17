export interface IMailProvider {
  enviarEmail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void>
}
