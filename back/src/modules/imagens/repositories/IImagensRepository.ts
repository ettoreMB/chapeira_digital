export interface IImagensRepository {
  getImages(loja: string): Promise<any[]>
}
