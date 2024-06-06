enum ModelsEnum {
  Admin = 'Admin',
  Company = 'Company',
  Client = 'Client',
  People = 'People',
}

enum Resource {
  people = 'people',
  company = 'company',
  client = 'client',
}

enum Roles {
  admin = 'admin',
}

enum ClientType {
  people = 'people',
  company = 'company',
}

export { Roles, ClientType, ModelsEnum, Resource };
