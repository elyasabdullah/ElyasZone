
export interface ServiceData {
  serviceId: string,
  description: string,
  contactInfo: string,
  type: string,
  dateCreated: string,
  author?: string,
}

export interface MyServiceData {
  description: string,
  _id: string,
  contactInfo: string,
  type: string,
  userId: string,
  dateCreated: string
}

export interface UpdateService {
  description: string,
  contactInfo: string,
  type: string,
  userId: string,
  dateCreated?: string
}
