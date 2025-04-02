import Http, { backendUrl } from "./Http"

export type Project = {
  id: string,
  user_id: string,
  name: string,
  created_at: Date,
  updated_at: Date
}

//TODO Integrate with backend
export default class ProjectService {
  
  private constructor() {}
  
  //TODO Move to ProjectContext
  public static Project() {
    return null;
  }

  public static async GetProjects(): Promise<Project[]> {
    const r = await Http.Get<Project[]>(`${backendUrl}/projects`);
    if (r.Success()) {
      const projects = r.Result()!;
      for (let i = 0; i < projects.length; i++) {
        projects[i].created_at = new Date(projects[i].created_at);
        projects[i].updated_at = new Date(projects[i].updated_at);
      }
      return projects;
    }
    return [];
  }

  public static async Create(name: string): Promise<Project|null> {
    const r = await Http.Post<Project|null>(`${backendUrl}/project`, {name});
    if (r.Success()) {
      return r.Result();
    }
    return null;
  }

  public static async Load(id: string): Promise<Project|null> {
    const r = await Http.Get<Project>(`${backendUrl}/project/${id}`);
    if (r.Success()) {
      const project = r.Result()!;
      project.created_at = new Date(project.created_at);
      project.updated_at = new Date(project.updated_at);
      return project;
    }
    return null;
  }

  public static FromStorage(): Project|null {
    const str = localStorage.getItem('loadedProject');
    return str === null ? null : JSON.parse(str);
  }

  public static SaveToStorage(project: Project|null): void {
    if (project === null) {
      localStorage.removeItem('loadedProject');
      return;
    }
    localStorage.setItem('loadedProject', JSON.stringify(project));
  }

  public static async GetUpdatedAt(id: string): Promise<Date|null> {
    const r = await Http.Get<string>(`${backendUrl}/project/updatedAt/${id}`);
    if (r.Success()) {
      return new Date(r.Result()!);
    }
    return null;
  }
}