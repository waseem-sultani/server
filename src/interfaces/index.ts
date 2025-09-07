export interface IUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IIsue {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  tags: string[];
}
