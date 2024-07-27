/**
 *
 * @param doc - Document
 * @param ret - Return doc
 * @description delete ret.__v
 */
export function modelIdTransformer(doc: any, ret: any) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}
